<template>
    <absolute-layout class="post-write">
        <stack-layout class='content-view'>
            <stack-layout class="top">
                <title-text-field class='title' fontSize='40px' v-model="selectedPost.title"/>
                <h3 class="author">{{selectedPost.author}}</h3>

                <h4 class="date">{{selectedPost.create_time}}</h4>
                <tag-text-field 
                    class="tag-text-field"
                    :isEditMode='true'
                    v-model="selectedPost.tags"
                    />
            </stack-layout>
            <markdown-code-mirror
                class="code-mirror"
                v-model="selectedPost.body"
                />
        </stack-layout>
        <!-- <stack-layout class="content-layout">
            <left-title-text-field
                class="text-field"
                title='제목'
                v-model="selectedPost.title"
                />
            <left-title-component 
                class="text-field"
                title='태그'
                >
                <tag-text-field 
                    class="tag-text-field"
                    :isEditMode='true'
                    v-model="selectedPost.tags"
                    />
            </left-title-component>
            <left-title-component 
                class="content"
                title='내용'>
                <markdown-code-mirror
                    class="code-mirror"
                    v-model="selectedPost.body"
                    />
            </left-title-component>
        </stack-layout> -->
    </absolute-layout>
</template>
<script>
import MarkdownCodeMirror from '~/common/MarkdownCodeMirror'
import LeftTitleTextField from '~/common/LeftTitleTextField'
import LeftTitleComponent from '~/common/LeftTitleComponent'
import TagTextField from '~/common/TagTextField'
import IconButton from '~/common/IconButton'
import TextField from '~/common/TextField'
import TitleTextField from '~/common/TitleTextField'
import LinearProgress from '~/common/LinearProgress'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    components:{
        IconButton,
        TextField,
        MarkdownCodeMirror,
        LeftTitleTextField,
        LeftTitleComponent,
        TagTextField,
        LinearProgress,
        TitleTextField
    },
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters('post',['selectedPost']),
        inputStyle(){
            return {
                borderLeft: '0',
                borderRight: '0',
                borderTop: '0',
                borderBottom: '1px solid #000'
            }
        },
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    .post-write{
        width: 100%;
        height: 100%;
        .tag-text-field{
            left: 0px;
            width: 100%;
        }
        .code-mirror{
            box-sizing: border-box;
            border-bottom: 2px solid #d9d9d9;
            min-height: 400px;
            margin-bottom: 40px;
            
            width: calc(100% - 160px);
            margin-left: 80px;
            position: relative;
        }
         @media (max-width: 700px){
            .code-mirror{
                margin-bottom: 40px;
                width: calc(100% - 80px);
                margin-left: 40px;
                border-top: 1px solid #d9d9d9;
                overflow: hidden;
                position: relative;
            }
         }
    }
    .content-view{
        width: 100%;
        min-height: 100%;
        background-color: #fff;
        text-align: left;
        
        .top{
            border-bottom: 1px solid #d9d9d9;
            height: auto;
            margin: 80px 80px 0px 80px;
            width: calc(100% - 160px);
            display: block;
            box-sizing: border-box;
            .title{
                font-size: 40px;
                width: 100%;
                margin: 26.8px 0px;
            }
            .author, .tags, .date{
                color: rgba(0,0,0,0.5);
                margin: 8px 0px;
                width: 100%;
            }
            .tags{
                position: relative;
                height: auto;
            }
        }

        .body{
            padding: 0px 80px 0px 80px;
        }
        @media (max-width: 700px){
            .top{
                margin: 40px 40px 0px 40px;
                width: calc(100% - 80px);
                box-sizing: border-box;
            }

            .body{
                padding: 0px 40px 0px 40px;
            }
        }
    }
</style>


