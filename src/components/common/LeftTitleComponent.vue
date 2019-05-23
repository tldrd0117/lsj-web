<template>
    <stack-layout 
        class="left-title-comp"
        viewType='horizontal' 
        >
        <div :style='titleStyle'>
            <span class="title">
                {{ title }}
            </span>
        </div>
        <div class="compWrapper"
            :style="compStyle" 
            >
            <slot/>
        </div>
    </stack-layout>    
</template>
<script>
export default {
    name: 'LeftTitleTextField',
    props:{
        title: String,
        margin: {
            type: Number,
            default: 50
        }
    },
    computed: {
        titleStyle(){
            return{
                width: this.margin + "px",
                height: '40px',
                float: 'left',
                lineHeight: '40px'
            }
        },
        compStyle(){
            return {
                left: "0px",
                width: `calc(100% - ${this.margin}px)`,
                top: '0px',
                height: '100%'

            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "centered.scss";
    .title{
        left: 0px;
        top: 0px;
        color: rgba(0, 0, 0, 0.3);
    }
</style>


