import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
//   {
//   path: '/',
//     name: 'Layout',
//     component: Layout,
//     redirect: "/welcome",
//     children: [
//   {
//     path: '/welcome',
//     name: 'Welcome',
//     component: () => import("@/views/content/Welcome"),
//   },
// ]},
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:
      [
        {
          path: '/welcome',
          name: 'Welcome',
          component: () => import('../views/content/Welcome.vue')
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import('../views/content/Users.vue'),
        },
        {
          path: '/book',
          name: 'Book',
          component: () => import('../views/content/Book.vue'),
        },
        {
          path: '/news',
          name: 'News',
          component: () => import('../views/content/News.vue'),
        },
        {
          path: '/map',
          name: 'Map',
          component: () => import('../views/content/Map.vue'),
        }
      ]
  },
]

const router = createRouter({ history: createWebHashHistory(),routes})
export default router
