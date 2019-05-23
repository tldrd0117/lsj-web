<template>
    <div
        class="tag-text-field" 
        @click='onClick'
        >
        <tag-list
            :value='value'
            :isEditMode='isEditMode'
            @input='$emit("input", $event)'
            class="tag-list"
            ref='tagList'
            />
    </div>
</template>
<script>
import TagButton from '~/common/TagButton';
import TagList from '~/common/TagList';
export default {
    props:{
        value: {
            type: String,
            default: ''
        },
        isEditMode: {
            type: Boolean,
            default: false
        }
    },
    components:{
        TagButton,
        TagList
    },
    data(){
        return {
            length: '',
            intervalId: ''
        }
    },
    methods:{
        onClick(e){
            console.log('click1'+this.value+'?')
            if(this.value.endsWith(' ')){
                this.$emit("input", this.value)
                console.log('click2')
            }
            else{
            console.log('click3')
                this.$emit("input", this.value+' ')
            }
            console.log(this.value)
        }
    },
    beforeDestroy(){
    }
}
</script>
<style lang="scss" scoped>
    @import 'size.scss';
    @import 'centered.scss';
    .input{
        width: 1000px;
        height: -3px;
        pointer-events: none;
        background-color: transparent;
        color: transparent;
        overflow: hidden;
        border: none;
        left: 0px;
        top: 0px;
    }
    .tag-list{
        left: 0px;
        top: 0px;
        position: absolute;
        @include centered-h;
    }
    .tag-text-field{
        left: 0px;
        top: 0px;
        height: $text-field-size;
        overflow: hidden;
    }
    .tag-button{
        margin-right: 4px;
    }
    .cursor{
        left: 0px;
        top: 0px;
        position: absolute;
        width: 1px;
        height: 14px;
        background-color: #000;
        display: none;
        @include centered-h;
    }

</style>


