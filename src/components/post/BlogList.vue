<template>
    <div
        class='postRoot'
        >
            <div class="post">
                <blog-item v-for='(item, index) in postData'
                    :key="index + timeKey"
                    :post='item'
                    @click="onView({selectedPost: item})"
                />
            </div>
    </div>
</template>
<script>
import BlogItem from '~/post/BlogItem'
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
        BlogItem,
        IconButton,
    },
    data(){
        return {
            timeKey: ''
        }
    },
    computed: {
        ...mapGetters('post', ['postData']),
        ...mapGetters('menu',['getCurViewKey']),
    },
    methods:{
        ...mapMutations('nav', ['setShow']),
        ...mapActions('post', ['onView']),
        onItemClick(){
            // onView({
                        // selectedPost: item,
                    // }
        }
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
    }
    .postRoot{
        padding: 25px;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        background-color: #fff;
        @media (max-width: 700px) {
            padding: 8px;
        }
    }
    
</style>


