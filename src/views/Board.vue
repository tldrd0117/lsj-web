<template>
    <div class="board">
        <router-view
            class="fragment"
        />
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: 'board',
    components: {
    },
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters('menu', ['getCurViewKey'])
    },
    methods:{
        ...mapActions('post/board', ['getBoardList', 'onActivate']),
        ...mapMutations('nav', ['setShow']),
    },
    async activated(){
        const id = this.$route.params.id
        await this.onActivate({ id })
    },
    deactivated(){
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
    .board{
        width: 100%;
        min-height: 100%;

        .fragment{
            width: 100%;
            min-height: 100%;
        }
    }
</style>

