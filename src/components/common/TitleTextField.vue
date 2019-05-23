<template>
    <input 
        type="text" 
        class="input"
        :value="value"
        :style='inputStyle'
        @input='$emit("input", $event.target.value)'
        />
</template>
<script>
export default {
    props: {
        value: String,
        fontSize: [String, Number]
    },
    computed:{
        inputStyle(){
            return {
                fontSize: this.fontSize
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .input{
        font-weight: bold;
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>



