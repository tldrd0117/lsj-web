<template>
    <absolute-layout>
      <codemirror 
            class='codemirror-comp'
            ref="myCm"
            v-model="valueComputed" 
            :options="cmOptions"
            @ready="onCmReady"
            @focus="onCmFocus"
            >
      </codemirror>
      <markdown-view 
        class="preview" 
        :code='value'/>
      <div class="guide-btn guide-markdown-pos">마크다운</div>
      <div class="guide-btn guide-preview-pos">프리뷰</div>
    </absolute-layout>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import MarkdownView from '~/common/MarkdownView'
// language js
import 'codemirror/mode/markdown/markdown.js'
// theme css
import 'codemirror/theme/material.css'
import 'codemirror/lib/codemirror.css'
// more codemirror resources
// import 'codemirror/some-resource...'

export default {
    props:{
        value: {
            type:String,
            default:''
        }
    },
    components: {
        codemirror,
        MarkdownView
    },
    data () {
        return {
            code: '',
            cmOptions: {
                // codemirror options
                tabSize: 4,
                mode: 'text/markdown',
                theme: 'monokai-sublime',
                lineNumbers: true,
                line: true,
                // more codemirror options
            }
        }
    },
    computed: {
        codemirror() {
            return this.$refs.myCm.codemirror
        },
        valueComputed: {
            get(){
                return this.value
            },
            set(newCode){
                this.code = newCode;
                this.$emit('input', newCode);
            }
        }
    },
    methods: {
        onCmReady(cm) {
            // console.log('the editor is readied!', cm)
        },
        onCmFocus(cm) {
            // console.log('the editor is focus!', cm)
        },
    },
    mounted() {
        console.log(this.value)
        console.log('this is current codemirror object', this.codemirror)
        // you can use this.codemirror to do something...
    }
}
</script>
<style lang="scss" scoped>
    .codemirror-comp{
        width: 50%;
        height: 100%;
        border-right: 1px solid #d9d9d9;
    }
    .preview{
        width: 50%;
        height: 100%;
        right: 0px;
        overflow: auto;
    }
    .guide-btn{
        width: auto;
        height: 20px;
        color: #39739d;
        background-color: #E1ECF4;
        border-color: #E1ECF4;
        border-radius: 3px;
        line-height: 20px;
        padding: 2px 8px;
    }
    
    .guide-markdown-pos{
        right: calc(50% + 10px);
        top: 10px;
    }
    .guide-preview-pos{
        right: 10px;
        top: 10px;
    }
    @media (max-width: 700px) {
        
        .codemirror-comp{
            width: 100%;
            height: 50%;
            border-bottom: 1px solid #d9d9d9;
        }
        .preview{
            width: 100%;
            height: 50%;
            bottom: 0px;
        }
        .guide-markdown-pos{
            right: 10px;
            top: 10px;

        }
        .guide-preview-pos{
            right: 10px;
            top: calc(50% + 10px);
        }
    }
   
</style>
<style lang="scss">
    .CodeMirror{
        width: 100%;
        height: 100%;
        left: 0px;
    }
</style>
