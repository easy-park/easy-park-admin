import Vue from 'vue'
import Vuex from 'vuex'
import { login, loadManagerProfile } from '@/api/manage/login'
import { dynamicRoutes, router } from '@/router'

Vue.use(Vuex)

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    const { roles: routeRoles } = route.meta
    for (let i = 0, len = roles.length; i < len; i++) {
      const flag = routeRoles.includes(roles[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAccessibleRoutes (routes, roles) {
  const accessedRouters = routes.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAccessibleRoutes(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const STORE = {
  USER: 'USER',
  DYNAMIC_ROUTES: 'DYNAMIC_ROUTES'
}

const ACTIONS = {
  LOGIN: 'LOGIN',
  GENERATE_ROUTES: 'GENERATE_ROUTES'
}

const MUTATIONS = {
  SET_URSER: 'SET_URSER',
  SET_DYNAMIC_ROUTES: 'SET_DYNAMIC_ROUTES'
}

const store = new Vuex.Store({
  state: {
    [STORE.USER]: {},
    [STORE.DYNAMIC_ROUTES]: []
  },
  mutations: {
    [MUTATIONS.SET_URSER] (state, payload) {
      state[STORE.USER] = payload
    },
    [MUTATIONS.SET_DYNAMIC_ROUTES] (state, payload) {
      state[STORE.DYNAMIC_ROUTES] = payload
    }
  },
  actions: {
    [ACTIONS.LOGIN] ({ commit, dispatch }, payload) {
      return login(payload).then(() => {
        return loadManagerProfile()
      }).then(res => {
        commit(MUTATIONS.SET_URSER, res.data)
        return dispatch(ACTIONS.GENERATE_ROUTES, res.data)
      })
    },
    [ACTIONS.GENERATE_ROUTES] ({ commit }, payload) {
      const { roles } = payload
      return new Promise((resolve) => {
        const accessibleRoutes = filterAccessibleRoutes(dynamicRoutes, roles)
        commit(MUTATIONS.SET_DYNAMIC_ROUTES, accessibleRoutes)
        router.addRoutes(accessibleRoutes)
        resolve()
      })
    }
  }
})

export {
  store,
  STORE,
  ACTIONS,
  MUTATIONS
}
