<template>
    <left-title-component :title='title'>
        <input 
            type="text" 
            class="input"
            :value="value"
            @input='$emit("input", $event.target.value)'
            />
    </left-title-component>
</template>
<script>
import LeftTitleComponent from './LeftTitleComponent'
export default {
    inheritAttrs: false,
    name: 'LeftTitleTextField',
    props:{
        title: String,
        value: String
    },
    components: {
        LeftTitleComponent
    }
}
</script>
<style lang="scss" scoped>
    .input{
        width: 100%;
        height: 100%;
        border: none;
    }
</style>


