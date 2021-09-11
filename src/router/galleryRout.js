export default [
  {
    path: '/galleryList',
    name: 'galleryList',
    component: () => import('../views/Gallery/GalleryList')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery/Gallery')
  },
  {
    path: '/galleryCustomers/:title',
    name: 'galleryCustomers',
    props: true,
    component: () => import('../views/Gallery/GalleryCustomers')
  },
  {
    path: '/gallery/:rubric',
    name: 'GalleryRubrics',
    props: true,
    meta: {
      notScroll: true
    },
    component: () => import('../views/Gallery/GalleryRubrics')
  },
  {
    path: '/painting/:id',
    name: 'Painting',
    props: true,
    component: () => import('../views/Gallery/Painting')
  },
  {
    path: '/thankYouForPaying/:id',
    name: 'ThankYouForPaying',
    props: true,
    component: () => import('../views/Gallery/ThankYouForPaying')
  }
]
