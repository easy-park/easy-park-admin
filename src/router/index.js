import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const dynamicRoutes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    redirect: '/parkinglot',
    children: [
      {
        path: '/staff',
        component: () => import('@/views/Staff.vue'),
        meta: { title: '员工管理', icon: 'user', roles: [ 'admin' ] }
      },
      {
        path: '/parkinglot',
        component: () => import('@/views/ParkingLot.vue'),
        meta: { title: '停车场管理', icon: 'car', roles: [ 'admin', 'manager' ] }
      },
      {
        path: '/clerk',
        component: () => import('@/views/Clerk.vue'),
        meta: { title: '停车员管理', icon: 'team', roles: [ 'admin', 'manager' ] }
      },
      {
        path: '/order',
        component: () => import('@/views/Order.vue'),
        meta: { title: '订单管理', icon: 'profile', roles: [ 'admin', 'manager' ] }
      },
      {
        path: '/dashboard',
        component: () => import('@/views/ParkingLotDashboard.vue'),
        meta: { title: '停车场 Dashboard', icon: 'dashboard', roles: [ 'admin', 'manager' ] }
      }
    ]
  },
  {
    path: '*', redirect: '/login', hidden: true
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('@/views/user/UserLayout.vue'),
      children: [
        {
          path: '/login',
          component: () => import('@/views/user/Login.vue')
        }
      ]
    }
  ]
})

export {
  router,
  dynamicRoutes
}
