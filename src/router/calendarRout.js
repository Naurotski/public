import store from '@/store'
export default [
  {
    path: '/calendars',
    name: 'CalendarList',
    component: () => import('../views/Calendar/CalendarList')
  },
  {
    path: '/calendar/preview/:titleCalendar',
    props: true,
    name: 'CalendarPreview',
    component: () => import('../views/Calendar/CalendarPreview'),
    beforeEnter(to, from, next) {
      if (store.getters.user.payments && store.getters.user.payments[to.params.titleCalendar])
        next(`/calendar/${to.params.titleCalendar}`)
      else next()
    }
  },
  {
    path: '/calendar/:titleCalendar',
    props: true,
    name: 'CalendarTitle',
    meta: {
      requiresAuth: true,
      requiresPayment: true
    },
    component: () => import('../views/Calendar/CalendarTitle')
  },
  {
    path: '/calendar/result/:titleCalendar',
    props: true,
    name: 'CalendarResult',
    meta: {
      requiresAuth: true,
      requiresPayment: true
    },
    component: () => import('../views/Calendar/CalendarResult')
  }
]
