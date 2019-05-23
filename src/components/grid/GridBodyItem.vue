<template>
    <div 
        class="grid-wrapper" 
        @click="$emit('click')">
        <div class='grid-cell a' >
                개발
        </div>
        <div class='grid-cell b' >
            {{value.title}}
        </div>
        <div class='grid-cell c' >
            {{value.author}}
        </div>
        <div class='grid-cell d' >
            {{value.create_time}}
        </div>
        <div class='grid-cell e' >
            {{value.view}}
        </div>
        <div class='grid-cell f' >
            {{value.likenum}}
        </div>
    </div>
</template>
<script>
import RippleDiv from '~/common/RippleDiv'
export default {
    props:{
        value: Object
    },
    components:{
        RippleDiv
    }
}
</script>

<style lang="scss" scoped>
    .grid-wrapper{
        position: relative;
        display: grid;
        grid-template-columns: 1fr 2fr repeat(4, 1fr);
        &:hover{
            background-color: #f2f2f5;
        }
    }
    .grid-cell{
        padding-left: 25px;
        line-height: 56px;
        height: 56px;
        text-align: left;
    }

    @media (max-width: 700px) {
        
    }
    
</style>
