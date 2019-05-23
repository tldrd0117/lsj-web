<template>
    <absolute-layout>
        <div class="logo microlight" 
            @click="getMessage">LSJ</div>
        <stack-layout 
            class='rightMenu'
            viewType='horizontal'>
            <text-field 
                v-if="false"
                class="text-field"
                placeHolder='검색'
                :inputStyle='tfInputStyle'
                />
            <nav-button
                class="nav-button"
                v-for='(item, index) in unfoldingMenus'
                :key='index'
                @click='$emit("click", index)'
                >
                {{item}}
            </nav-button>
            <nav-drop-box
                :key='isLogin'
                class="nav-drop-box"
                @itemClick='$emit("click", $event)'
                :items='menus'>
            </nav-drop-box>
            <three-d-button
                v-if="!isLogin"
                @click="toggleLoginShow"
                >로그인
            </three-d-button>
            <three-d-button
                v-if="!isLogin"
                color='green'
                @click="toggleSignUpShow"
                >회원가입
            </three-d-button>
            <profile-button
                v-if="isLogin"
                size='32'
                @click="onProfileClick"
                class="profile-button"
            />
        </stack-layout>
    </absolute-layout>
</template>
<script>
import TextField from '~/common/TextField';
import NavButton from './NavButton';
import NavDropBox from './NavDropBox'
import DropDown from '~/common/DropDown';
import ThreeDButton from '~/common/ThreeDButton';
import LoginModal from '~/user/LoginModal';
import SignUpModal from '~/user/SignUpModal';
import ProfileButton from '~/common/ProfileButton';
import axios from 'axios';
import moment from 'moment-timezone';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    components:{
        TextField,
        NavButton,
        NavDropBox,
        DropDown,
        ThreeDButton,
        LoginModal,
        SignUpModal,
        ProfileButton
    },
    data(){
        return {
            menus: ['홈', '블로그', '게시판'],
            tfInputStyle: {
                border: '1px solid #777',
                borderRadius: '3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            }
        }
    },
    computed: {
        unfoldingMenus(){
            return this.menus.map(item => '+ '+ item )
        },
        ...mapState('auth', ['isLogin']),
        ...mapState('modal', ['show','name']),
    },
    methods: {
        ...mapMutations('modal', ['setModal']),
        ...mapActions('auth', ['logout']),
        toggleLoginShow(){
            this.setModal({
                show: !this.show,
                name: 'loginModal'
            })
        },
        toggleSignUpShow(){
            this.setModal({
                show: !this.show,
                name: 'signUpModal'
            })
        },
        onProfileClick(){
            this.logout();
        },
        getMessage(){
            axios.get('https://lsj-app.herokuapp.com/visit')
            .then(res=>{
                axios.get('https://lsj-app.herokuapp.com/message')
                .then(res2=>{
                    console.log(res, res2);
                    this.$store.commit('modal/setModal', {
                        show: true,
                        head: '알림',
                        body: JSON.stringify({
                            ...{
                                visit: res.data.map(item => {
                                    item.create_time = moment(item.create_time).fromNow()
                                        return item
                                    })
                                },
                            ...{
                                message: res2.data.map(item => {
                                    item.create_time = moment(item.create_time).fromNow()
                                        return item
                                    })
                                }
                            }, null, 2),
                        name: 'modal'
                    }, { root: true })
                })
            })
            
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="scss">
.microlight {
    font-family : monospace;
    white-space : pre;
    color            : #000;   
    text-shadow: 0px 0px 9px rgba(5, 44, 54,0.7), 0px 0px 2px rgba(5, 44, 54,0.4);
}    
</style>

<style lang="scss" scoped>
    @import 'size.scss';
    @import 'centered.scss';
    @import 'common.scss';
    .dropDown{
        left: 100px;
    }
    .rightMenu{
        right: 0px;
        top: 0px;
        height: 100%;
        .nav-button{
            float: left;
            width: 60px;
            margin-right: 16px;
            height: $nav-size;
        }
        .nav-drop-box{
            display: none;
        }
        @media (max-width: 700px) {
            .nav-button{
                display: none;
            }
            .nav-drop-box{
                float: left;
                display: inline-block;
                margin-top: 8px;
                width: 40px;
                height: 40px;
                margin-right: 16px;
            }
        }
        
        .text-field{
            display: inline-block;
            margin-top: ($nav-size - $text-field-size) / 2;
            width: 130px;
            margin-right: 16px;
            height: $text-field-size;
        }
        .profile-button{
            margin: 8px 16px 8px 8px;

        }
    }
    .logo{
        margin-left: 16px;
        font-size: 18px;
        height: $nav-size;
        line-height: $nav-size;
        font-family: DOSMyungjo;
    }
    
</style>


