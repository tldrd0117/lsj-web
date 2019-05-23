<template>
    <div class="grid-wrapper">
        <!-- header -->
        <div v-for='(val, index) in value'
            :key='`header-${index}`'
            class='grid-cell'
            >
            {{val}}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        value: Array
    },
    data(){
        return{
        }
    }
}
</script>

<style lang="scss" scoped>
    .grid-wrapper{
        display: grid;
        grid-template-columns: 1fr 2fr repeat(4, 1fr);
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

