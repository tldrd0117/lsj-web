<template>
    <div :class="layoutClass" ref='layout'
        v-bind="$attrs">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        viewType: {
            type: String,
            default: 'vertical'
        },
        margin: {
            type: String,
            default: '0px'
        }
    },
    computed: {
        layoutClass(){
            return 'layout-' + this.viewType;
        }
    },
    mounted(){
        if(this.margin === '0px'){
            return
        }
    },
    updated(){
        // Array.from(this.$refs.layout.children).forEach((item) => {
            // item.style.marginTop=this.margin
        // })
    }
}
</script>
<style lang="scss" scoped>
    .layout-vertical > *{
        position: relative;
        display: block;
        left: 0px;
        top: 0px;
    }
    .layout-horizontal > *{
        position: relative;
        display: inline-block;
        left: 0px;
        top: 0px;
    }
    .layout-horizontal{
        overflow: auto;
        white-space: nowrap;
    }
    .layout-grid > *{
        position: relative;
        display: inline-block;
        left: 0px;
        top: 0px;
        margin-left: 25px;
        margin-top: 25px;
    }

    .layout-grid2 > *{
        position: relative;
        display: inline-block;
        left: 0px;
        top: 0px;
        width: calc(50% - 16.6666666px);
        margin-left: 25px;
        margin-top: 25px;
    }


    .layout-grid2 > *:nth-child(2n-1){
        margin-left: 0px;
    }


    .layout-grid3 > *{
        position: relative;
        display: inline-block;
        left: 0px;
        top: 0px;
        width: calc(33.33333% - 16.6666666px);
        margin-left: 25px;
        margin-top: 25px;
    }
    .layout-grid3 > *:nth-child(3n-2){
        margin-left: 0px;
    }
</style>


