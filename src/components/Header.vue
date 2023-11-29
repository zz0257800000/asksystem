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
        <RouterLink to="/frontQuestPage">前台</RouterLink>

        <RouterLink to="/">合成獸全面進化!!!</RouterLink>
        <RouterLink to="/questHome">後台</RouterLink>

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
    a {
        text-decoration: none;
        color: rgb(255, 0, 0);
    }
}
</style>
