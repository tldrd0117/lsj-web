<template>
    <button
        @click="$emit('click', $event)"
        class="button"
        :style="buttonStyle"
        >
    </button>
</template>
<script>
export default {
    props:{
        url: String,
        imageSize:{
            type: Number,
            default: 24
        }
    },
    computed: {
        buttonStyle(){
            return {
                backgroundImage: `url('${this.url}')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: `${this.imageSize}px ${this.imageSize}px`,
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .button{
        cursor: pointer;
        border: none;
        padding:8px;
        box-sizing: border-box;
        background-color: transparent;

    }
</style>

