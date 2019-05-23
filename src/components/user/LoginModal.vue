<template>
    <div class='modal-frame'
        @click.prevent.stop="onClick"
        >
        <stack-layout class="modal"
            >
            <div class='head'>
                <span class="url">lsj.surge.sh@@@hello</span>
                <span class='circle red'
                    @click="onClose"
                    ></span>
                <span class='circle yellow'></span>
                <span class='circle green'></span>
            </div>
            <pre class="title">
 ___                                  
/\_ \                   __            
\//\ \     ___      __ /\_\    ___    
  \ \ \   / __`\  /'_ `\/\ \ /' _ `\  
   \_\ \_/\ \L\ \/\ \L\ \ \ \/\ \/\ \ 
   /\____\ \____/\ \____ \ \_\ \_\ \_\
   \/____/\/___/  \/___L\ \/_/\/_/\/_/
                    /\____/           
                    \_/__/            
            </pre>
            <div class="item">
                <text-field placeHolder="ID" v-model='id' type='text'/>
            </div>
            <div class="hint-item" >
                <div class='hint'>{{ getIdErrorMsg }}</div> 
            </div>
            <div class="item">
                <text-field placeHolder="PWD" v-model='pwd' type='password'/>
            </div>
            <div class="hint-item" >
                <div class='hint'>{{ getPwdErrorMsg }}</div> 
            </div>
            <div
            
                class="bottom">
                <div class="focus" v-if="isInsertMode">-- INSERT --</div>
                <stack-layout
                    class='layout'
                    viewType='horizontal'
                    >
                    <button 
                        @click="checkLogin"
                        class="button">#If you completed all</button>
                </stack-layout>
            </div>
        </stack-layout>
    </div>
</template>
<script>
import FixedBgLayout from '~/layout/FixedBgLayout'
import TextField from '~/common/TextField'
import ErrorCheck from '@/utils/ErrorCheck'

import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    props:{
    },
    data(){
        return {
            isInsertMode: false,
            id: '',
            pwd: '',
            idError: null,
            pwdError: null,
        }
    },
    components:{
        FixedBgLayout,
        TextField
    },
    computed: {
        ...mapState('modal', ['show']),
        getIdErrorMsg(){
            if(!this.idError) return '';
            return this.idError.map(item=>'- '+item.errorMsg).join('\n') || '';
        },
        getPwdErrorMsg(){
            if(!this.pwdError) return '';
            return this.pwdError.map(item=>'- '+item.errorMsg).join('\n') || '';
        }
    },
    methods: {
        ...mapActions('auth', ['login']),
        ...mapMutations('modal', ['setModal']),
        onClose(){
            this.setModal({
                show: false
            })
        },
        checkLogin(){
            this.idError = ErrorCheck.checkAllUserid(this.id);
            this.pwdError = ErrorCheck.checkAllPassword(this.pwd);
            if(this.idError.length > 0 || this.pwdError.length > 0 ){
                return;
            }
            const noError = [this.idError, this.pwdError].every(item => {
                return item.length === 0
            })
            if(!noError){
                return;
            }
            this.login({
                userid: this.id,
                password: this.pwd
            })
        },
        onClick(){

        },
        onScroll(){

        }
    },
    directives: {
        focus: {
            inserted(el){
                el.focus();
            }
        }
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
    @import 'centered.scss';
    @import 'shadow.scss';
    .modal-frame{
        max-height: 100%;
        max-width: calc(100% - 25px);
        width: 400px;
        height: auto;
        position: relative;
        overflow: auto;
    }
    .modal{
        width: 100%;
        position: relative;
        background-color: #fff;//#2b3d50;
        z-index: 105;
        @include box-shadow-3;
        .head{
            height: 24px;
            background-color: #f2f2f5;
            @include box-shadow-1;
            .circle{
                width: 14px;
                height: 14px;
                border-radius: 7px;
                position: absolute;
                &.red{
                    left: 5px;
                    top: 5px;
                    background-color: #e74c3c;
                }
                &.yellow{
                    left: 25px;
                    top: 5px;
                    background-color: #F0D264;
                }
                &.green{
                    left: 45px;
                    top: 5px;
                    background-color: #80C49D;
                }
                
            }
            .url{
                position: absolute;
                width: 100%;
                line-height: 24px;
                text-align: center;
            }
        }
        .title{
            width: calc(100% - 32px);
            margin-left: 16px;
            margin-top: 16px;
            color: #000;//#6db0e0;
            text-align: center;
            font-size: 10pt;
            font-family: "Courier New", Monospace;
            font-weight: normal;
            white-space: pre;
            &:hover{
                font-weight: bold;
            }
        }
        @media (max-width: 400px) {
            .title{
                font-size: 8pt;
            }
        }
        .item{
            margin-top: 12px;
            display: flex;
            justify-content: left;
            padding: 0px 25px;
        }
        .hint-item{
            margin-top: 16px;
            padding: 0px 25px;
            .hint{
                padding: 0px 25px;
                color: #6db0e0;
                font-size: 14px;
                white-space: pre;
            }
        }
        
        .attr{
            white-space: pre;
            font-size: 20px;
            font-family: "Courier New", Monospace;
            color: #f19740;
        }
        .input{
            font-family: "Courier New", Monospace;
            font-size: 20px;
            color: #000;
            width: calc(100% - 50px);
            height: 44px;
            border: 1px solid #dfe1e5;
            border-radius: 22px;
            padding: 0px 25px;
            background-color: transparent;
            &::placeholder{
                color: #f19740;
                font-weight: normal;
            }
            &:focus, &:hover{
                @include box-shadow-1;
            }
        }
        .body{
            margin-left: 16px;
            margin-right: 16px;
            color: rgba(0,0,0,0.60);
            margin-top: 16px;
            font-size: 16px;
            word-break: keep-all;
            word-wrap: break-word;
        }
        .bottom{
            margin-top: 16px;
            height: 45px;
            .focus{
                position: absolute;
                left: 16px;
                bottom: 16px;
                color: #fff;
                font-family: monospace;
                font-weight: bold;
            }
            .layout{
                width: auto;
                height: auto;
                position: absolute;
                right: 0px;
                .button{
                    font-family: Perfograma;
                    background-color: transparent;
                    padding: 14px;
                    width: auto;
                    height: auto;
                    font-weight: 600;
                    color: #c969bb;
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


