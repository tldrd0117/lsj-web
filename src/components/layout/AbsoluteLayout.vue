<template>
    <div class="internal-absolute-layout">
        <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .internal-absolute-layout > *{
        position: absolute;
        display: block;
    }
</style>


