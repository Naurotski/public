export default [
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/blog/Blog')
  },
  {
    path: '/blog/text',
    name: 'BlogText',
    component: () => import('../views/blog/BlogText')
  },
  {
    path: '/blog/libido',
    name: 'BlogLibido',
    component: () => import('../views/blog/BlogLibido')
  },
  {
    path: '/blog/seven',
    name: 'BlogSeven',
    component: () => import('../views/blog/BlogSeven')
  },
  {
    path: '/blog/neurographics',
    name: 'BlogNeurographics',
    component: () => import('../views/blog/BlogNeurographics')
  },
  {
    path: '/blog/psychosomatics',
    name: 'BlogPsychosomatics',
    component: () => import('../views/blog/BlogPsychosomatics')
  },
  {
    path: '/blog/lungs',
    name: 'BlogLungs',
    component: () => import('../views/blog/BlogLungs')
  }
]
