<template>
    <div class='progress-root'>
        <div class="progress-bg" v-if="show">
            <div class="progress progress-anim1"  >

            </div>
            <div class="progress progress-anim2" >

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LinearProgress',
    props:{
        show: {
            type: Boolean,
            default: false
        },
    },
}
</script>
<style lang="scss" scoped>
    .progress-root{
        position: absolute;
        height: 0px;
    }
    .progress{
        width: 0%;
        height: 100%;
        right: 100%;
        position: absolute;
        background-color: #0149b1;
        border-radius: 5px;
    }
    .progress-anim1{
        animation-duration: 2s;
        animation-name: progress1;
        animation-iteration-count: infinite;
    }
    .progress-anim2{
        animation-duration: 2s;
        animation-name: progress2;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
    }
    @keyframes progress1 {
        0%{
            right: 100%;
            width: 10%;
        }
        60%{
            right: -60%;
            width: 60%;
        }

        100%{
            right: -60%;
            width: 60%;
        }
    }
    @keyframes progress2 {
        0%{
            right: 100%;
            width: 60%;
        }
        50%{
            right: 100%;
            width: 60%;
        }
        100%{
            right: -10%;
            width: 10%;
        }
    }

    .progress-bg{
        width: 100%;
        height: 5px;
        position: relative;
        background-color: #ffffff;
    }
</style>


