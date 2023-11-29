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
      path: "/questHome/showDetailPage",
      name: "questHome/showDetailPage",
      component: () => import('../components/quest/showDetailPage.vue'),
    },
    {
      path: "/frontQuestPage",
      name: "frontQuestPage",
      component: () => import('../components/quest/frontQuestPage.vue'),
    },

  ],
});

export default router;
