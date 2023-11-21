import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/askHome',
      name: 'askHome',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/askHome.vue')
    },
    {
      path: '/Vfor',
      name: 'Vfor',
      component: () => import('../views/Vfor.vue')
    },
    
   
    
    
    {
      path: '/askDetail',
      name: 'askDetail',
      component: () => import('../components/askDetail.vue')
    }, 
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/askAllPage/signUp.vue')
    }, 
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/askAllPage/signUp.vue')
    }, 
    {
      path: "/askAllPage/doQuestPage/:questionnaireId",
      name: "askAllPage/doQuestPage",
      component: () => import('../views/askAllPage/doQuestPage.vue'),
    },
    {
      path: "/askAllPage/editQuestionnairePage/:index",
      name: "askAllPage/editQuestionnairePage",
      component: () => import('../views/askAllPage/editQuestionnairePage.vue'),
    },
   
   
    
  ]
})

export default router
