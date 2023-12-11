import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('../views/HomeView.vue')
    },

    {
      path: "/questHome",
      name: "questHome",
      component: () => import('../components/quest/questHome.vue'),
    },

    {
      path: "/questHome/createQuestPage",
      name: "questHome/createQuestPage",
      component: () => import('../components/quest/createQuestPage.vue'),
    },


    {
      path: "/questHome/doQuestPage/:wantId",
      name: "questHome/doQuestPage",
      component: () => import('../components/quest/doQuestPage.vue'),
    },
    {
      path: "/questHome/answerPage/:answerId",
      name: "questHome/answerPage",
      component: () => import('../components/quest/answerPage.vue'),
    },
  
   
    {
      path: "/frontQuestPage",
      name: "frontQuestPage",
      component: () => import('../components/quest/frontQuestPage.vue'),
    },
    {
      path: "/EditQuestionnaire/:wantId",
      name: "EditQuestionnaire",
      component: () => import('../components/quest/EditQuestionnaire.vue'),
    },
    {
      path: "/questHome/EditQuestionnaire/:wantId",
      name: "EditQuestionnaire",
      component: () => import('../components/quest/EditQuestionnaire.vue'),
      
    },
    {
      path: "/showDetailPage/:showDetailPageid",
      name: "showDetailPage",
      component: () => import("../components/quest/showDetailPage copy.vue"),
    },

  ],
});

export default router;
