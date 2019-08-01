import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const dynamicRoutes = [
  {
    path: '/home',
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
        meta: { title: '停车场管理', icon: 'car' }
      },
      {
        path: '/clerk',
        component: () => import('@/views/Clerk.vue'),
        meta: { title: '停车员管理', icon: 'team' }
      },
      {
        path: '/order',
        component: () => import('@/views/Order.vue'),
        meta: { title: '订单管理', icon: 'profile' }
      },
      {
        path: '/dashboard',
        component: () => import('@/views/ParkingLotDashboard.vue'),
        meta: { title: '停车场 Dashboard', icon: 'dashboard' }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/user/UserLayout.vue'),
      redirect: '/login',
      children: [
        {
          path: '/login',
          component: () => import('@/views/user/Login.vue')
        }
      ]
    },
    {
      path: '/404',
      component: () => import('@/views/exception/ExceptionPage')
    },
    {
      path: '*', redirect: '/404', hidden: true
    }
  ]
})

export {
  router,
  dynamicRoutes
}
