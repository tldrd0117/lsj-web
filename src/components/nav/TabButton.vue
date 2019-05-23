<template>
    <absolute-layout class="tab-button-root">
        <ripple-div
            :durationFull='700'
            class="button-item"
            >
            <button
                :class='buttonClass'
                @click="$emit('click')"
                class="tab-button">
                <slot/>
            </button>
        </ripple-div>
        <div
            v-if="isSelected" 
            class='tab-button-selected-bar'/>
        <div class='close'
            @click="$emit('close')">
        </div>

    </absolute-layout>
</template>
<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import RippleDiv from '~/common/RippleDiv'
export default {
    props:{
        tabKey: [Number, String]
    },
    components:{
        RippleDiv
    },
    computed:{
        ...mapState('menu', ['curView']),
        buttonClass(){
            return {
                'tab-button': true,
                'tab-button-selected': this.isSelected
            }
        },
        isSelected(){
            if(this.curView && this.curView.key){
                return this.curView.key === this.tabKey
            }
            return false;

        }
    }
}
</script>
<style lang="scss" scoped>
    @import 'centered.scss';
    @import 'size.scss';
    .tab-button-root{
        height: 56px;
        width: $tab-width;
    }
    .button-item{
        height: 100%;
    }
    .tab-button{
        height: 100%;
        text-align: left;
        padding-left: 14px;
        width: $tab-width;
        font-family: Perfograma;
        box-sizing: border-box;
        background-color: #fff;
        cursor: pointer;
        &:hover{
            background-color: #f2f2f5;
        }
    }
    .tab-button-selected{
        background-color: #fff;
    }
    .tab-button-selected-bar{
        width: 100%;
        height: 4px;
        position: absolute;
        bottom: 0px;
        background-color: #7E57C2;
    }
    .close {
        background: transparent;
        width: 12px;
        height: 12px;
        position: absolute;
        right: 5px;
        @include centered-h;
    }
    .close:after {
        content: '';
        height: 12px;
        border-left: 1px solid #000;
        position: absolute;
        transform: rotate(45deg);
        left: 6px;
    }

    .close:before {
        content: '';
        height: 12px;
        border-left: 1px solid #000;
        position: absolute;
        transform: rotate(-45deg);
        left: 6px;
    }
</style>

