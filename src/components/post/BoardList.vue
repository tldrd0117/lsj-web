<template>
    <div
        class='postRoot'
        >
            <div class="post">
                <board-item v-for='(item, index) in postData'
                    :key="index"
                    :post='item'
                    @click="onView({
                        selectedPost: item
                    })"
                />
            </div>
    </div>
</template>
<script>
import BoardItem from '~/post/BoardItem'
import IconButton from '~/common/IconButton'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
    props: {
        viewType: {
            type: String,
            default: 'grid2'
        }
    },
    components:{
        BoardItem,
        IconButton,
    },
    data(){
        return {
        }
    },
    computed: {
        ...mapGetters('post',['postData']),
    },
    methods:{
        ...mapMutations('nav', ['setShow']),
        ...mapActions('post', ['onView']),
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    .post{
        display: grid;
        width: 100%;
        max-width: 600px;
        padding: 0;
        margin: 0;
        position: relative;
    }
    @media (max-width: 700px){
        // .post{
        //     max-width: 500px;
        //     grid-template-columns: 1fr;
        // }
    }
    .postRoot{
        padding: 25px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        @media (max-width: 700px) {
            padding: 8px;
        }
        background-color: #fff;

    }
    
</style>


