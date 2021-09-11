export default [
  {
    path: '/miniGames',
    name: 'MiniGamesList',
    component: () => import('../views/miniGames/MiniGamesList')
  },
  {
    path: '/miniGameTitle/:titleGame',
    props: true,
    name: 'MiniGame',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/miniGames/MiniGameTitle')
  },
  {
    path: '/miniGames/GameWithPictures',
    name: 'GameWithPictures',
    component: () => import('../views/miniGames/GameWithPictures')
  }
]
