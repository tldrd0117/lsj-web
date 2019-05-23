<template>
    <div  >
        <drop-down 
            class='drop-down'
            placeHolder='분류'
        />
        <div class="grid-list">
            <grid-header
                :value='["분류", "제목", "작성자", "작성일", "조회수", "좋아요"]'
                class="grid-item grid-header"
                />
            <grid-body-item
                class="grid-item"
                v-for='(item, index) in postData'
                :key='index'
                :value='item'
                @click='onView({
                    selectedPost: item,
                    key: getCurViewKey
                })'
                />
        </div>
    </div>        
</template>
<script>
import GridHeader from './GridHeader'
import GridBodyItem from './GridBodyItem'
import DropDown from '~/common/DropDown'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
    components:{
        GridHeader,
        GridBodyItem,
        DropDown
    },
    computed: {
        ...mapState({
            postData(state){
                const postData = state.post.postData.find(item => 
                    item.key === this.getCurViewKey
                )
                if(postData!= null) return postData.data
                return null
            }
        }),
        ...mapGetters('menu',['getCurViewKey']),

    },
    methods:{
        ...mapMutations('nav', ['setShow']),
        ...mapActions('post', ['onView'])
    }
}
</script>

<style lang="scss" scoped>
    @import 'shadow.scss';
    .grid-list{
        display: block;
        margin: 8px 25px;
        overflow-x: auto;
        width: calc(100% - 50px);
        background-color: white;
        border-radius: 10px;
        @include box-shadow-1;
    }
    .drop-down{
        display: inline-block;
        margin-top: 16px;
        margin-left: 25px;
    }
    .grid-item{
        min-width: 550px;
        padding-left: 25px;
        line-height: 56px;
        height: 56px;
        text-align: left;
        border-top: 1px solid #d9d9d9;
        &:first-child{
            border-top: 0px solid #d9d9d9;
        }
        @media (max-width: 700px) {
            
        }
    }
    .grid-header{
        padding-left: 25px;
        font-weight: bold;
        color: #000;
        
    }
</style>

