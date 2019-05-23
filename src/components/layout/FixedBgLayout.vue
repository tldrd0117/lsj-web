<template>
    <div 
        class="bg"
        :style="styleBG"
        @mousewheel.self.prevent="onScroll"
        @touchmove.self.prevent="onScroll"
        @click.prevent="onClick">
        
        <slot/>
    </div>
</template>
<script>
export default {
    name:'FixedBgLayout',
    props:{
        backgroundColor:{
            type: String,
            default: 'transparent'
        }
    },
    computed: {
        styleBG(){
            return {
                backgroundColor: this.backgroundColor
            }
        }
    },
    methods: {
        onClick(e){
            console.log(e);
            this.$emit('clickBG')
        },
        onScroll(e){
            console.log(e);
        }
    }
}
</script>

<style lang='scss'>
    body{
        color:blue;
    }
</style>

<style lang="scss" scoped>
    .bg{
        position: fixed !important;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

