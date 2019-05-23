<template>
    <div class="card"
        >
        <ripple-div class="item"
            @click="$emit('click', $event)"
            >
            <div class='center-flex'>
                <h3 class='title'>{{post.title}}</h3>
                <h4 class='author'>{{post.author}} | {{post.create_time}}</h4>
                <h4 class='date'></h4>
                <tag-list 
                    :isEditMode='false'
                    :value='post.tags'
                    class='tags' />
            </div>
        </ripple-div>
        <ripple-div class="preview">
            <img class='preview-image' v-if='isImage' :style='imageStyle'/>
            <markdown-view 
                v-if='isMarkdown' 
                :code='code' 
                class="preview-markdown"/>
        </ripple-div>

        
    </div>
</template>
<script>
import RippleDiv from '~/common/RippleDiv'
import TagList from '~/common/TagList'
import MarkdownView from '~/common/MarkdownView'

export default {
    props:{
        post: Object,
    },
    components:{
        RippleDiv,
        TagList,
        MarkdownView
    },
    data(){
        return {
            isImage: false,
            isMarkdown: false,
            imageSrc: '',
            code: ''
        }
    },
    computed:{
        imageStyle(){
            return {
                backgroundImage: `url('${this.imageSrc}')`
            }
        }
    },
    methods:{
        preview(){
            const {body} = this.post
            let image = null
            let code = null
            image = body.trim().match(/(?:!\[(.*?)\]\((.*?)\))/g)
            if(image){
                this.imageSrc = /(?:\()\(*(.*)(?:\))/g.exec(image)[1];
                this.isImage = true;
            }
            else{
                this.isMarkdown = true;
                this.code = body;
            }
        }
    },
    mounted(){
        this.preview();
    },
    activated(){
        this.preview();
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    .card{
        top: 0px;
        min-height: 150px;
        height: auto;
        width: 100%;
        margin-bottom: 24px;
        border-bottom: 1px solid rgba(0,0,0,0.1);

        // border-bottom: 1px solid #d9d9d9;
        @media (max-width: 700px) {
            min-height: 100px;
            margin-bottom: 16px;
        }
        
        .preview{
            background-color: #fff;
            width: 150px;
            height: 120px;
            float: left;
            position: relative;
            display: inline-block;
            @include box-shadow-1;
            border-radius: 4px;
            margin: 0px 0px;
            @media (max-width: 700px) {
                width: 100px;
                height: 80px;
            }
            
            .preview-image{
                width: 100%;
                height: 100%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            .preview-markdown{
                padding: 16px;
                width: 100%;
                height: 100%;
                zoom: 50%;
                // background-color: rgba(126,87,194,0.1);
                box-sizing: border-box;
            }
        }
        
        .item{
            top: 0px;
            float: left;
            padding: 16px 0px;
            margin-left: 24px;
            margin-right: 24px;
            height: auto;
            width: calc(100% - 198px);
            position: relative;
            display: inline-block;
            min-height: 150px;
            box-sizing: border-box;
            @media (max-width: 700px) {
                min-height: 100px;
                padding: 8px 0px;
                margin-left: 16px;
                margin-right: 16px;
                width: calc(100% - 148px);
            }
            .center-flex{
                display: flex;
                justify-content: center;
                height: 100%;
                flex-direction: column;
                .title{
                    display: block;
                    left: 0px;
                    top: 0px;
                    position: relative;
                    color: #000;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    margin: 0;
                }
                .author{
                    margin: 12px 0px 0px 0px;
                    display: block;
                    left: 0px;
                    top: 0px;
                    position: relative;
                    bottom: 16px;
                    color: rgba(0,0,0,0.5);
                }
                .date{
                    display: block;
                    left: 0px;
                    color: rgba(0,0,0,0.5);
                    position: relative;
                    top: 0px;
                    margin: 0;
                }
                .tags{
                    margin: 8px 0px 0px 0px;
                    height: auto;
                    display: block;
                    left: 0px;
                    top: 0px;
                    position: relative;
                }
            }
            

        }
    }
    
</style>


