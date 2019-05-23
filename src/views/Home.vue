<template>
    <div class="home">
        <button @click='onClick'>만들다 보니 여기까지</button>
        <p v-if="show">HEELO</p>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'home',
    components: {
    },
    data(){
        return {
            show: false
        }
    },
    methods:{
        onClick(){
            this.show = true;
        }
    }
}
</script>
<style lang="scss" scoped>
    .home{
        background-color: #fff;
        min-height: 100%;
        width: 100%;
        position: absolute;
    }
</style>

