<template>
    <div class="post-reply-in">
        <div class="background"
            v-if="open"
            @click="onReplyOpenClick"
            /> 
        <div class="reply-open-button" 
            v-if="!open">
            <ripple-button 
                @click="onReplyOpenClick"
                class='reply-button'>
                댓글보기
            </ripple-button>
            
        </div>
        <div class="reply-open" v-if="open">
            <div class="replys" >
                <div v-for=" (item, index) in replyData"
                    class='reply-item'
                    :key='index'
                    >
                    <profile-button
                        :emailHashProp='item.emailHash'
                        class="profile"
                        size='32'
                        />
                    <div class='right-box'>
                        <div class='name'>{{item.name}}</div>
                        <div class='reply'>{{item.reply}}</div>
                    </div>
                </div>
            </div>
            <div class='reply-edit' >
                <profile-button
                    class="profile"
                    size='32'
                    />
                <div class='auto-size'>
                    <textarea 
                        class='textarea'
                        placeholder="댓글"
                        v-model="text"
                        v-autoSize
                        />
                    <p 
                        class="sub-text">{{ textLength }}</p>
                </div>
                <ripple-button
                    @click='onReplyAdd({
                        reply: text
                    })'
                    class="button">완료</ripple-button>
            </div>
        </div>
    </div>
</template>
<script>
import ProfileButton from '~/common/ProfileButton'
import RippleButton from '~/common/RippleButton'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
//티커 처럼 한개씩 띄워주고 댓글쓰기를 누르면 창이 오픈 된다
export default {
    components:{
        ProfileButton,
        RippleButton
    },
    data(){
        return {
            text: '',
            open: false,
            replyHeight: ''
        }
    },
    computed:{
        ...mapGetters('post', ['replyData', 'selectedPost']),
        textLength(){
            return `글자 수: ${this.text.length}`
        },
        postId(){
            
        }
    },
    methods:{
        resizeTextArea(e){
            // const el = e.target;
            // el.style.height = "1px";
            // el.style.height = (el.scrollHeight)+"px";
        },
        onReplyOpenClick(){
            this.open = !this.open;
            if(this.open){
            }
        },
        complete(){

        },
        none(e){
            console.log(e)
        },
        ...mapActions('post', ['onReplyOpen', 'onReplyAdd']),
    },
    directives: {
        autoSize: {
            inserted(el){
                el.style.height = "1px";
                el.style.height = (el.scrollHeight)+"px";
            },
            update(el){
                console.log('height')
                el.style.height = "1px";
                el.style.height = (el.scrollHeight)+"px";
            }
        }
    },
    created(){
        this.onReplyOpen()
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    .background{
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        position: fixed;
    }
    .post-reply-in{
        z-index: 1;
        position: absolute;
        .reply-open-button{
            position: fixed;
            border-top: 1px solid rgba(0,0,0,0.2);
            bottom: 0px;
            width: 100%;
            height: 44px;
            background-color: #fff;
            .reply-button{
                position: absolute;
                left: 16px;
                margin-top: 6px;
                color: #c969bb;
                border: 2px solid #c969bb;
                padding: 4px 8px;
                border-radius: 8px;
                &:hover{
                    background-color: #c969bb;
                    color: #fff;
                }
            }
        }
        .reply-open{
            position: fixed;
            bottom: 0px;
            width: 100%;
            background-color: #fff;
            .profile{
                position: absolute;
                left: 12px;
                top: 12px;
            }
            .replys{
                position: relative;
                height: auto;
                max-height: 250px;
                width: 100%;
                border-top: 1px solid rgba(0,0,0,0.2);
                @include box-shadow-5;
                overflow: auto;
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
                display: grid;
                .reply-item{
                    position: relative;
                    height: auto;
                    
                    .right-box{
                        display: inline-block;
                        position: relative;
                        margin-top: 16px;
                        margin-bottom: 16px;
                        left: 56px;
                        width: calc(100% - 72px);

                        .name{
                            position: relative;
                        }
                        .reply{
                            position: relative;
                        }
                    }
                }
            }
            .reply-edit{
                z-index: 1;
                position: relative;
                border-top: 1px solid rgba(0,0,0,0.2);
                background-color: #fff;
                .auto-size{
                    height: auto;
                    margin-left: 56px;
                    min-height: 56px;
                    box-sizing: border-box;
                    .textarea{
                        resize: none;
                        position: relative;
                        border: none;
                        margin-top: 16px;
                        margin-bottom: 16px;
                        padding: 0px;
                        height: auto;
                        min-height: 18px;
                        width: calc(100% - 72px);
                        font-size: 18px;
                    }
                    .subtext{
                        margin: 0px;
                    }


                }
                .button{
                    position: absolute;
                    border: 2px solid #c969bb;
                    border-radius: 8px;
                    color: #c969bb;
                    padding: 4px 8px;
                    right: 16px;
                    bottom: 8px;
                    &:hover{
                        background-color: #c969bb;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>


