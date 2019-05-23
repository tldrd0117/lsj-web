<template>
    <div 
        class='preview'
        v-html="compiledMarkdown"
        />
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js/lib';
import 'highlight.js/styles/dracula.css';

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && hljs.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? hljs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language} code">${highlighted}</code></pre>`;
};

renderer.image = (href, title, text) => {
    // console.dir(href.split(' '))
    // const [ url, size ] = href.split(' '),
        // [x, y] = size.split('x')
    console.log(text)
    const alt = text.match(/.*\s/g)
    let size = text.match(/&quot;.*&quot;/g);
    if(size){
        size = size[0].replace(/\&quot\;/gi, "'")
    }
    
    return `<img src=${href} ${size? `style=${size}`: ''} alt=${alt? alt : ''}/>`
}

marked.setOptions({
    renderer,
    // highlight: function(code) {
        // return hljs.highlightAuto(code).value;
    // },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

export default {
    props: {
        code: String
    },
    computed: {
        compiledMarkdown(){
            return marked(this.code || '')
        }
    }
}
</script>
<style lang="scss">
    .code{
        font: normal 10pt Consolas, D2Coding, Monaco, monospace;
    }
    table{
        border: 1px solid #d9d9d9;
        border-collapse: collapse;
    }
    td,th{
        border: 1px solid #d9d9d9;
        min-height: 40px;
        padding: 10px;
    }
</style>


