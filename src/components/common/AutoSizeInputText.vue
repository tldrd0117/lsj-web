<template>
    <div>
        <fixed-bg-layout
            @clickBG='click'
            />
        <span>{{text}}</span>
        <input
            class='input'
            type="text"
            :value='value'
            v-model="text"
            @input="$emit('input', text)"
            />
        <div class='bg'/>
        
    </div>
</template>
<script>
import FixedBgLayout from '~/layout/FixedBgLayout'
export default {
    props:{
        value: String
    },
    components:{
        FixedBgLayout
    },
    data(){
        return {
            text: ''
        }
    }
}
</script>
<style lang="scss" scoped>
    .input{
        position: absolute;
        width: 1000px;
        height: -3px;
        pointer-events: none;
        background-color: transparent;
        color: transparent;
        overflow: hidden;
        border: none;
        left: 0px;
        top: 0px;
    }
    .bg{
        
    }
</style>


