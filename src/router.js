import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import * as firebase from 'firebase/app'

import studiosRout from './router/studiosRout'
import galleryRout from './router/galleryRout'
import calendarRout from './router/calendarRout'
import blogRout from './router/blogRout'
import miniGameRout from './router/miniGameRout'
import artTherapyNeurographic from './router/artTherapy-neurographic'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    ...studiosRout,
    ...galleryRout,
    ...calendarRout,
    ...blogRout,
    ...miniGameRout,
    ...artTherapyNeurographic,
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home')
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: () => import('./views/AboutUs')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Auth/Login')
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('./components/Auth/Registration')
    },
    {
      path: '/userProfile',
      name: 'UserProfile',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/UserProfile')
    },
    {
      path: '/engineeringWorks/:id',
      name: 'EngineeringWorks',
      props: true,
      component: () => import('./components/shared/EngineeringWorks')
    },
    {
      path: '/testPage',
      name: 'TestPage',
      meta: {
        requiresAuth: true,
        userAdmin: true
      },
      component: () => import('./views/Settings/TestPage')
    },
    {
      path: '/especiallyForFacebook',
      name: 'EspeciallyForFacebook',
      component: () => import('./views/EspeciallyForFacebook')
    },
    {
      path: '*',
      name: 'ErrorCmp',
      component: () => import('./components/shared/ErrorCmp')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    }
    if (savedPosition) {
      return savedPosition
    } else if (!to.matched.some(record => record.meta.notScroll)) {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) next('/login?loginError=true')
    next()
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.userAdmin)) {
    if (store.getters.admin) {
      next()
    } else {
      firebase.auth().onAuthStateChanged(user => {
        store.dispatch('getIdToken', user).then(() => {
          if (store.getters.admin) {
            next()
          } else {
            next('/*')
          }
        })
      })
    }
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresPayment)) {
    if (
      store.getters.user.payments &&
      (store.getters.user.payments[to.params.titleStudios] ||
        store.getters.user.payments[to.params.titleCalendar])
    ) {
      next()
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.dispatch('autoDataUser', { uid: user.uid }).then(() => {
            if (
              store.getters.user.payments &&
              (store.getters.user.payments[to.params.titleStudios] ||
                store.getters.user.payments[to.params.titleCalendar])
            ) {
              next()
            } else {
              next('/?paymentError=true')
            }
          })
        }
      })
    }
  } else {
    next()
  }
})

export default router
