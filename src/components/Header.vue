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
        <RouterLink to="/questHome">合成獸全面進化!!!!</RouterLink>
    </nav>

    <!-- <p>{{ this.location }}</p> -->
</template>
<style lang="scss" scoped>
.topNav {
    height: 100%;
    background-color: rgb(0, 0, 0);
    font-size: 36pt;
     display: flex;
    justify-content: space-around;
    align-items: center;
    a {
        text-decoration: none;
        color: rgb(228, 0, 0);
    }
}
</style>
