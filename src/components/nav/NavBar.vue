<template>
    <stack-layout
        class='nav-layout'
        >
        <top-nav-bar
            class="topNavBar"
            @click="$emit('menuclick', $event)"
        />
        <tab-nav-bar
            class="tabNavBar"
        />  

        <linear-progress
            class='linear'
            :show='progressShow'
            />
            
    </stack-layout>
</template>
<script>
import TopNavBar from './TopNavBar'
import TabNavBar from './TabNavBar'
import LinearProgress from '~/common/LinearProgress'
import { mapState } from 'vuex'
export default {
    components: {
        TopNavBar,
        TabNavBar,
        LinearProgress
    },
    computed: {
        ...mapState('nav', ['progressShow'])
    }
}
</script>
<style lang="scss" scoped>
    @import 'size.scss';
    @import 'shadow.scss';
    .topNavBar{
        height: $nav-size;
    }
    .tabNavBar{
        @include box-shadow-1;
        z-index: 31;
    
    }
    .linear{
        @include box-shadow-1;

    }
    .nav-layout{
        background-color: #fff;
    }

</style>


