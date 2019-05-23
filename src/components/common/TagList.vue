<template>
    <div>
        <tag-button
            v-for="(tag, index) in tagList"
            :key="index"
            :text='tag'
            :height='24'
            :index='index'
            :isEditMode='isEditMode'
            @tagUpdate='tagUpdate(index, $event)'
            class='tag-button'
            />
    </div>
</template>
<script>
import TagButton from './TagButton'
export default {
    components:{
        TagButton
    },
    props:{
        value: {
            type: String,
            default: ''
        },
        selectedIndex: {
            type: Number,
            default: 0
        },
        isEditMode: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tagList(){
            if(!this.value) return ''
            const isEndSpace = this.value.endsWith(' ');
            const arr = this.value.split(' ').filter(item => {
                return item && item.length > 0
            })
            if(isEndSpace){
                arr.push('')
            }
            return arr
        }
    },
    methods: {
        tagUpdate(index, text){
            const value = this.value.split(' ');
            value[index] = text;
            this.$emit('input', value.filter(v=>v).join(' '));
        }
    }
}
</script>
<style lang="scss" scoped>
    .tag-button{
        margin-right: 4px;
        margin-bottom: 4px; 
    }
</style>


