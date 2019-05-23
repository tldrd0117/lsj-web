<template>
    <div class="blog" v-if="!isLoading">
        <router-view
            class="fragment"
        />
    </div>
</template>
<script>
//post list 및 post write 및 post view 구성
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import store from '../store'
export default {
    name: 'blog',
    props: {
        uniqueKey:{
            type: [String, Number]
        }
    },
    data(){
        return {
            isLoading: false
        }
    },
    computed: {
        ...mapState('menu', ['curView']),
        ...mapGetters('menu', ['getCurViewKey']),
        ...mapGetters('post',['selectedPost', 'postData'])
    },
    methods: {
        ...mapActions(`post`, ['onActivate']),
        ...mapMutations('nav', ['setShow']),
    },
    created(){
    },
    mounted(){
    },  
    async activated () {
        this.isLoading = true;
        const id = this.selectedPost.id
        await this.onActivate({id: id})
        this.isLoading = false;
    },
    deactivated () {
        this.setShow({
            backShow: false,
            removeShow: false,
            editShow: false,
            editCompleteShow: false
        })
    }
}
</script>
<style lang="scss" scoped>
    .buttons{
        right: 0px;
        position: absolute;
    }
    .blog{
        background-color: #ffffff;
        width: 100%;
        min-height: 100%;

        .fragment{
            width: 100%;
            min-height: 100%;
        }
    }
</style>