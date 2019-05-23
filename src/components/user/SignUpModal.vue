<template>
    <div class='modal-frame'
        @click.prevent.stop="onClick"
        >
        <stack-layout class="modal"
            >
            <div class='head'>
                <span class='circle red'
                    @click="onClose"
                    ></span>
                <span class='circle yellow'></span>
                <span class='circle green'></span>
                <span class="url">lsj.surge.sh@@@hello</span>
            </div>
            <pre class="title">
       __                                       
  ____/\_\     __     ___       __  __  _____   
 /',__\/\ \  /'_ `\ /' _ `\    /\ \/\ \/\ '__`\ 
/\__, `\ \ \/\ \L\ \/\ \/\ \   \ \ \_\ \ \ \L\ \
\/\____/\ \_\ \____ \ \_\ \_\   \ \____/\ \ ,__/
 \/___/  \/_/\/___L\ \/_/\/_/    \/___/  \ \ \/ 
               /\____/                    \ \_\ 
               \_/__/                      \/_/     
            </pre>
            <div class="item">
                <text-field placeHolder='ID' v-model="id"/>
                <!-- <input class='input' type="text" v-focus v-model="id"/> -->
            </div>
            <div class="hint-item">
                <div class='hint'>{{ getIdErrorMsg }}</div> 
            </div>
            <div class="item">
                <text-field placeHolder='PWD' v-model="pwd" type='password'/>
            </div>
            <div class="hint-item">
                <div class='hint'>{{ getPwdErrorMsg }}</div>
            </div>
            <div class="item">
                <text-field placeHolder='NAME' v-model="name"/>
            </div>
            <div class="hint-item">
                <div class='hint'>{{ getNameErrorMsg }}</div>
            </div>
            <div class="item">
                <text-field placeHolder='EMAIL' v-model="email" type='email'/>
            </div>
            <div class="hint-item">
                <div class='hint'>{{ getEmailErrorMsg }}</div>
            </div>
            <div
                class="bottom">
                <div class="focus" v-if="isInsertMode">-- INSERT --</div>
                <stack-layout
                    class='layout'
                    viewType='horizontal'
                    >
                    <button 
                        @click="onSignUp"
                        class="button">#회원가입</button>
                </stack-layout>
            </div>
        </stack-layout>
    </div>
</template>
<script>
import FixedBgLayout from '~/layout/FixedBgLayout'
import TextField from '~/common/TextField';
import ErrorCheck from '@/utils/ErrorCheck'
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    data(){
        return {
            isInsertMode: false,
            id: '',
            pwd: '',
            name: '',
            email: '',
            idError: null,
            pwdError: null,
            nameError: null,
            emailError: null

        }
    },
    components:{
        FixedBgLayout,
        TextField
    },
    computed:{
        ...mapState('modal', ['show']),
        getIdErrorMsg(){
            if(!this.idError) return '- 4~14자리'
            return this.idError.map(item=>'- '+item.errorMsg).join('\n') || '- 4~14자리';
        },
        getPwdErrorMsg(){
            if(!this.pwdError) return '- 4~14자리'
            return this.pwdError.map(item=>'- '+item.errorMsg).join('\n') || '- 4~14자리';
        },
        getNameErrorMsg(){
            if(!this.nameError) return '- 4~14자리'
            return this.nameError.map(item=>'- '+item.errorMsg).join('\n') || '- 4~14자리';
        },
        getEmailErrorMsg(){
            if(!this.emailError) return ''
            return this.emailError.map(item=>'- '+item.errorMsg).join('\n') || '';
        }
    },
    methods: {
        ...mapMutations('modal', ['setModal']),
        ...mapActions('user', ['signUp']),
        onSignUp(){
            this.idError = ErrorCheck.checkAllUserid(this.id);
            this.pwdError = ErrorCheck.checkAllPassword(this.pwd);
            this.nameError = ErrorCheck.checkAllName(this.name);
            this.emailError = ErrorCheck.checkAllEmail(this.email);
            const noError = [this.idError, this.pwdError, this.nameError, this.emailError]
            .every(item => {
                return item.length === 0
            })
            if(!noError){
                return;
            }
            this.signUp({
                userid: this.id,
                password: this.pwd,
                name: this.name,
                email: this.email
            });
        },
        onClose(){
            this.setModal({
                show: false
            })
        },
        onClick(){

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
        max-width: 400px;
        width: 100%;
        height: auto;
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
                left: 70px;
                top: 5px;
            }
        }
        .title{
            color: #333;//#6db0e0;
            font-size: 8pt;
            text-align: center;
            font-family: "Courier New", Monospace;
            white-space: pre;
            &:hover{
                font-weight: bold;
            }
        }
        @media (max-width: 400px) {
            .title{
                font-size: 6pt;
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
            margin-left: 16px;
            font-size: 20px;
            font-family: "Courier New", Monospace;
            color: #f19740;
        }
        .input{
            margin-left: 10px;
            font-family: "Courier New", Monospace;
            font-size: 20px;
            width: 180px;
            color: #2ce975;
            border-width: 0px;
            border-bottom: 1px solid #fff;
            background-color: transparent;
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


