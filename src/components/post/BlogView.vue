<template>
    <absolute-layout class="post-view" v-if='selectedPost'>
        <stack-layout class='content-view'>
            <stack-layout class="top" >
                <h1 class="title">{{selectedPost.title}}</h1>
                <h3 class="author">{{selectedPost.author}}</h3>

                <h4 class="date">{{selectedPost.create_time}}</h4>
                <tag-list
                    class="tags"
                    :isEditMode='false'
                    v-model="selectedPost.tags"
                    />
            </stack-layout>
            <markdown-view 
                class="body"
                :code='selectedPost.body'/>
        </stack-layout>
        <post-reply class='post-reply'/>
    </absolute-layout>
</template>
<script>
import IconButton from '~/common/IconButton'
import TagButton from '~/common/TagButton'
import MarkdownView from '~/common/MarkdownView'
import TagList from '~/common/TagList'
import PostReply from '~/post/PostReply'

import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
    components:{
        IconButton,
        TagButton,
        MarkdownView,
        TagList,
        PostReply
    },
    computed: {
        ...mapGetters('post',['selectedPost']),
    },
    methods:{
        ...mapGetters('menu',['getCurViewKey']),
        ...mapMutations('nav', ['setShow', 'setOnRemove']),
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    .icon-button{
        margin: 8px;
        width: 40px;
        height: 40px;
        z-index: 1;
    }
    .write-button{
        width: 40px;
        height: 40px;
        right: 16px;
        top: 8px;
        z-index: 1;
        background-color: #fff;
        @include box-shadow-1;
    }
    .remove-button{
        width: 40px;
        height: 40px;
        right: 72px;
        top: 8px;
        z-index: 1;
        background-color: #fff;
        @include box-shadow-1;
        
    }
    .content-view{
        width: 100%;
        min-height: 100%;
        background-color: #fff;
        text-align: left;
        
        .top{
            border-bottom: 1px solid #d9d9d9;
            height: auto;
            margin: 80px;
            width: calc(100% - 160px);
            display: block;
            box-sizing: border-box;
            .title{
                font-size: 40px;
                width: 100%;
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
                margin: 40px;
                width: calc(100% - 80px);
                box-sizing: border-box;
            }

            .body{
                padding: 0px 40px 0px 40px;
            }
        }
    }
    .post-reply{
        width: 100%;
        bottom: 0px;
    }
</style>


