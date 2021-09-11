export default [
  {
    path: '/artTherapyList',
    name: 'artTherapyList',
    props: true,
    component: () => import('../views/artTherapy/ArtTherapyList')
  },
  {
    path: '/artTherapyDescription/:artTherapyTitle',
    name: 'ArtTherapyDescription',
    props: true,
    component: () => import('../views/artTherapy/ArtTherapyDescription')
  },
  {
    path: '/neurographicsList',
    name: 'NeurographicsList',
    component: () => import('../views/neurographics/NeurographicsList')
  },
  {
    path: '/separateVideosList',
    name: 'SeparateVideosList',
    component: () => import('../views/neurographics/SeparateVideosList')
  }
]
