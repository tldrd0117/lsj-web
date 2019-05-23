<template>
    <absolute-layout class="layout">
        <button
            @click="$emit('click')"
            >
            <slot/>
        </button>
        <div class='border'></div>
    </absolute-layout>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
    @import 'centered.scss';
    .layout{
        button{
            @include centered-h;
            height: 40px;
            width: 100%;
            font-family: HogookStd;
            transition: 0.3s;
            background-color: #fff;
            &:hover{
                background-color: #7E57C2;
                color: #fff;
                // border-radius: 40px;
            }
        }
        &:hover .border{
            bottom: 0px;
            height: 3px;
            width: 100%;
        }
    }
    
</style>


