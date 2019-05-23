<template>
    <div class="ripple-wrapper">
        <ripple-div
            @click="$emit('click', $event)"
            >
            <button
                class='button'
                v-bind='$attrs'
                >
                <slot/>
            </button>
        </ripple-div>
    </div>
</template>
<script>
import RippleDiv from '~/common/RippleDiv'
export default {
    components:{
        RippleDiv
    }
}
</script>
<style lang="scss">
    .ripple-wrapper{
        width: auto;
        overflow: hidden;
    }
    .button{
        background-color: transparent;
        color: inherit;
    }
</style>

