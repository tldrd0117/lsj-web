<template>
    <absolute-layout
        >
        <ripple-div 
            class='ripple-button'
            @click="onClick"
            >
            <button 
                class='button'
                ref="button"
                >
            +
            </button>
        </ripple-div>
        
        <transition name="fade">
        <fixed-bg-layout
            v-if="isListShow"
            @clickBG='onClick'
            >
            <stack-layout
                :style='itemStyle'
                :key='itemKey'
                class="list">
                <ripple-div 
                    class="item"
                    v-for="(item, index) in items"
                    @click="onItemClick(index)"
                    :key="index">
                    {{item}}
                </ripple-div>
            </stack-layout>
        </fixed-bg-layout>
        </transition>
    </absolute-layout>
</template>
<script>
import FixedBgLayout from '~/layout/FixedBgLayout'
import RippleDiv from '~/common/RippleDiv'
export default {
    props:{
        items: Array,
    },
    components:{
        FixedBgLayout,
        RippleDiv
    },
    data(){
        return {
            isListShow: false,
            listRight: 0
        }
    },
    computed:{
        itemStyle(){
            console.log('key style', this.listRight)
            return {
                right: this.listRight+'px'
            }
        },
        itemKey(){
            console.log('key change', this.listRight)
            return this.listRight
        }
    },
    methods: {
        onClick(){
            this.isListShow = !this.isListShow;
        },
        onItemClick(index){
            this.isListShow = !this.isListShow;
            this.$emit('itemClick', index);
        }
    },
    mounted(){
        const rect = this.$refs.button.getBoundingClientRect();
        this.listRight= window.innerWidth - rect.right;
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    @import 'common.scss';
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .ripple-button{
        right: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        .button{
            width: 100%;
            height: 100%;
            font-size: 24px;
            border: 1px solid #777;
            background-color: #fff;
            @include box-shadow-1;

        }
    }
    
    .list{
        top: 8px;
        position: fixed;
        z-index: 5;
        width: 100px;
        display: flex;
        flex-direction: column;
        height: auto;
        padding: 8px 0px;
        background-color: #fff;

        @include box-shadow-2;
        .item{
            display: block;
            font-size: 16px;
            height: 40px;
            font-family: HogookStd;
            text-align: left;
            padding-left: 16px;
            line-height: 40px;
            &:hover{
                color: #82c8a0;
            }
        }
    }
</style>

