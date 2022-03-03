import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import AddPosts from '../views/AddPosts.vue'
import PostPage from '../views/PostPage.vue'
import PostsPage from '../views/PostsPage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/add',
    name: 'addPost',
    component: AddPosts
  },
  {
    path: '/post/:id',
    name: 'posts',
    component: PostPage
  },
  {
    path: '/posts/:category/:id',
    name: 'postsByCategory',
    component: PostsPage
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
