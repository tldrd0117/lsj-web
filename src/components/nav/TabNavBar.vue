<template>
    <div class="tabNav">
        <icon-button 
            v-if="editShow"
            class='write-button'
            :url='require("@/assets/write.png")'
            @click="$store.dispatch('post/onEdit',{
                key: getCurViewKey,
                selectedPost: findSelectedPost
            })"
            />
        <icon-button 
            v-if="editCompleteShow"
            class='write-button'
            :url='require("@/assets/check.png")'
            @click="$store.dispatch('post/onEditComplete', {
                key: getCurViewKey
            })"
            />
        <icon-button
            v-if="backShow"
            class='back-button'
            @click="$store.dispatch('post/onList', {
                key: getCurViewKey,
                reload: true
            })"
            :url='require("@/assets/arrow-32.png")'
            />
        <icon-button 
            v-if="removeShow"
            class='remove-button'
            :url='require("@/assets/trash.png")'
            @click="$store.dispatch('post/onRemove', {
                key: getCurViewKey,
            })"
            />
        <drag-and-drop-layout 
            :keys='menuViewKeys'
            :style='tabSize'
            class="layout">
            <tab-button
                v-for='item in menuViews'
                @click="onTabClick(item.key)"
                @close="onTabClose(item.key)"
                :key="item.key"
                :tabKey='item.key'
                >
                {{item.name}}
            </tab-button>
        </drag-and-drop-layout>
        <div :style='gradientStyle'></div>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import TabButton from './TabButton'
import DragAndDropLayout from '~/layout/DragAndDropLayout'
import IconButton from '~/common/IconButton'
export default {
    components: {
        TabButton,
        IconButton,
        DragAndDropLayout
    },
    computed: {
        ...mapState('menu', ['menuViews']),
        ...mapState('nav', ['backShow', 'removeShow', 'editShow', 'editCompleteShow']),
        ...mapGetters('menu', ['menuViewKeys', 'menuNameFromKey', 'getCurViewKey']),
        ...mapGetters('post', ['findSelectedPost']),
        isNameBlogView(){
            return this.$router.currentRoute.name === 'blog-view'
        },
        tabSize(){
            let count = 0;
            if(this.backShow) ++count;
            if(this.removeShow) ++count;
            if(this.editShow) ++count;
            if(this.editCompleteShow) ++count;
            return{
                left: this.backShow ? '56px' : '0px',
                width: `calc(100% - ${(56 * count) + 16}px)`,
                transition: 'left 0.3s'
            }
        },
        gradientStyle(){
            let count = 0;
            if(this.removeShow) ++count;
            if(this.editShow) ++count;
            if(this.editCompleteShow) ++count;
            return {
                position: 'absolute',
                right: `${56* count + 16}px`,
                width: '56px',
                height: '100%',
                zIndex: '4',
                pointerEvents: 'none',
                backgroundImage: 'linear-gradient(to right, transparent , white)'
            }
        }
    },
    methods: {
        ...mapActions('menu', ['selectView', 'closeView']),
        onTabClick(key){
            // this.selectView(key)
            this.$router.replace({
                name: this.menuNameFromKey(key),
                params: {
                    key
                }
            })
        },
        onTabClose(key){
            console.log('close', key)
            this.closeView(key);
        }
    },
    mounted(){
        console.log(this.$router.currentRoute.name)
    }
}
</script>
<style lang="scss" scoped>
    @import 'size.scss';
    @import 'shadow.scss';
    .tabNav{
        width: 100%;

        height: $tab-size;
    }
    .layout {
        position: absolute;
        width: calc(100%);
        overflow: auto;
        height: 100%;
        -ms-overflow-style: none; // IE에서 스크롤바 감춤
        &::-webkit-scrollbar { 
            display: none !important; // 윈도우 크롬 등
        }
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    .write-button{
        position: absolute;
        width: 40px;
        height: 40px;
        right: 16px;
        top: 8px;
        z-index: 1;
        background-color: #fff;
        @include box-shadow-1-inset;
    }
    .back-button{
        position: absolute;
        width: 40px;
        height: 40px;
        z-index: 1;
        margin: 8px;
    }
    .remove-button{
        position: absolute;
        width: 40px;
        height: 40px;
        right: 72px;
        top: 8px;
        z-index: 1;
        background-color: #fff;
        @include box-shadow-1-inset;
        
    }
</style>


