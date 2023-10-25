<script >
import {RouterLink,RouterView}from 'vue-router'
export default{
  components:{
    RouterLink
  }
}
</script>

<template>
    <nav class="topNav">
 <RouterLink to="/">首頁</RouterLink>
    <RouterLink class="routerItem" to="/VtextAndVModel">上課練習</RouterLink>
    <RouterLink class="routerItem" to="/Vfor">資料</RouterLink>
    <RouterLink class="routerItem" to="/HomeWork">作業</RouterLink>
   
</nav>
</template>

<style lang="scss" scoped>

.topNav{
    width: 100%;
    height: 100%;
    border-color: aqua;
    font-size: 24pt;
    color: white;
    display: flex;
    justify-content: space-around;

}
a{
    text-decoration: none;
    transition: 0.3ms;
    &:hover{
        color: aqua;
        background-color: rgb(149, 149, 149);
    }
}
</style>
