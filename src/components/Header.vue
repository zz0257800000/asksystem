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
        <RouterLink to="/questHome">合成獸</RouterLink>
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
