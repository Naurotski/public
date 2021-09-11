import store from '@/store'
export default [
  {
    path: '/studios',
    name: 'StudiosList',
    component: () => import('../views/studios/StudiosList')
  },
  {
    path: '/studios/home/:titleStudios',
    props: true,
    name: 'StudioHome',
    meta: {
      requiresAuth: true,
      requiresPayment: true
    },
    component: () => import('../views/studios/StudioHome')
  },
  {
    path: '/studio/:titleStudios/:id',
    props: true,
    name: 'StudioTitle',
    meta: {
      requiresAuth: true,
      requiresPayment: true
    },
    component: () => import('../views/studios/StudioTitle')
  },
  {
    path: '/studios/finalText/:titleStudios',
    props: true,
    name: 'StudioFinalText',
    meta: {
      requiresAuth: true,
      requiresPayment: true
    },
    component: () => import('../views/studios/StudioFinalText')
  },
  {
    path: '/studios/result/:titleStudios',
    props: true,
    name: 'StudioResult',
    meta: {
      requiresAuth: true,
      requiresPayment: true
    },
    component: () => import('../views/studios/StudioResult')
  },
  {
    path: '/studios/preview/:titleStudios',
    props: true,
    name: 'StudioPreview',
    component: () => import('../views/studios/StudioPreview'),
    beforeEnter(to, from, next) {
      if (store.getters.user.payments && store.getters.user.payments[to.params.titleStudios])
        next(`/studios/home/${to.params.titleStudios}`)
      else next()
    }
  },
  {
    path: '/studios/group/:titleStudios',
    props: true,
    name: 'StudioGroupTitle',
    meta: {
      requiresAuth: true,
      notScroll: true,
      requiresPayment: true
    },
    component: () => import('../views/studios/StudioGroupTitle')
  },
  {
    path: '/studios/group/:titleStudios/:id',
    props: true,
    name: 'StudioGroup',
    meta: {
      requiresAuth: true,
      notScroll: true,
      requiresPayment: true
    },
    component: () => import('../components/studios/StudioGroup')
  }
]
