<template>
    <div class="modal"
        @click.prevent.stop="onClick"
        >
        <div class="head">
            {{head}}
        </div>
        <div class="body">
            {{body}}
        </div>
        <div
            class="bottom">
            <stack-layout
                class='layout'
                viewType='horizontal'
                >
                <button 
                    @click="onClose"
                    class="button">확인</button>
            </stack-layout>
        </div>
    </div>
</template>
<script>
import FixedBgLayout from '~/layout/FixedBgLayout'
import { mapState, mapMutations } from 'vuex';
export default {
    components:{
        FixedBgLayout
    },
    computed:{
        ...mapState('modal', ['show', 'head', 'body'])
    },
    methods: {
        ...mapMutations('modal', ['setModal']),
        onClick(){
            //no action
        },
        onClose(){
            this.setModal({
                show: false
            })
        }
        
    },
    mounted(){
        console.log(this.body)
    }
}
</script>
<style lang="scss" scoped>
    @import 'centered.scss';
    @import 'shadow.scss';
    .modal{
        width: 250px;
        height: auto;
        position: relative;
        background-color: #fff;
        z-index: 105;
        overflow: auto;
        display: block;
        left: 0px;
        top: 0px;
        max-height: 100%;
        border-radius: 16px;
        @include box-shadow-3;
        .head{
            margin-left: 16px;
            margin-top: 16px;
            color: rgba(0,0,0,0.87);
            font-size: 20px;
            font-weight: bold;
        }
        .body{
            margin-left: 16px;
            margin-right: 16px;
            color: rgba(0,0,0,0.60);
            margin-top: 16px;
            font-size: 16px;
            word-break: keep-all;
            word-wrap: break-word;
            /* white-space: pre-wrap; */
        }
        .bottom{
            margin-top: 16px;
            height: 45px;
            .layout{
                width: auto;
                height: auto;
                position: absolute;
                right: 0px;
                .button{
                    background-color: transparent;
                    padding: 14px;
                    width: auto;
                    height: auto;
                    font-weight: 600;
                    color: #5C1349;
                }
            }
        }
    }   
    .modal-root{
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        position: fixed;
    }
</style>


