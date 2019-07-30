import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      redirect: 'staff',
      children: [
        {
          path: 'staff',
          component: () => import('@/views/Staff.vue')
        },
        {
          path: 'clerk',
          component: () => import('@/views/Clerk.vue')
        },
        {
          path: 'parkinglot',
          component: () => import('@/views/ParkingLot.vue')
        }
      ]
    }
  ]
})
