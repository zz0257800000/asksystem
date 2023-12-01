<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import indexState from "../Store/indexState";
export default {
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(indexState, ["location", "locationInfo"])
    },
    methods: {
        ...mapActions(indexState, ["getLocation", "setLocation"])
    }
};
</script>
<template>
    <nav class="topNav">
        <RouterLink class="f1a" to="/frontQuestPage">前台</RouterLink>

        <RouterLink class="a" to="/">合成獸全面進化!!!</RouterLink>
        <RouterLink class="f2a" to="/questHome">後台</RouterLink>

    </nav>

    <!-- <p>{{ this.location }}</p> -->
</template>
<style lang="scss" scoped>
.topNav {
    height: 100%;
    background-color: #000000;
    font-size: 28pt;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .f1a {
        text-decoration: none;
        color: rgb(255, 255, 255);
    }
    .f2a {
        text-decoration: none;
        color: rgb(255, 0, 0);
    }
    .a {
        text-decoration: none;
        color: rgb(0, 119, 255);
    }
}
</style>
