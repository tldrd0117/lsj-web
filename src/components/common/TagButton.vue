<template>
    <div 
        :style="tagButtonStyle"
        class="tag-button"
        >
        <div
            @click.prevent.stop='onClick'
            class='text' v-if='!isEdit' >{{text}}</div>
        <div
            v-if='isEdit'
            :style='editStyle'
            class='edit'
            >{{editText}}
        </div>
        <div class='close'
            v-if="isEditMode"
            @click.prevent.stop="onClose"
            />
        <input 
            ref='input' 
            type="text"
            @focus="onFocus"
            @blur='onBlur'
            @input='onInput'
            @keydown='onKeyDown'
            class="input"/>
        <div
            class="cursor" 
            ref='cursor'
            v-if="isShowCursor"
            />
        <div
            :style='selectStyle'
            v-if="isSelect"
            class='select'/>
    </div>
</template>
<script>
import { getTextWidth } from '@/utils/Utils';
export default {
    props:{
        text: String,
        height: {
            type: Number,
            default: 20
        },
        index: Number,
        bgColor: {
            type: String,
            default: '#f2f2f5'
        },
        color: {
            type: String,
            default: '#2c3e50'
        },
        isEditMode: {
            type: Boolean,
            default: false
        }

    },
    data(){
        return {
            isEdit: false,
            editText: '',
            isShowCursor: false,
            isSelect: false,
            selectLeft: '0',
            selectWidth: '0'
        }
    },
    computed:{
        tagButtonStyle(){
            return{
                height: this.height + 'px',
                width: 'auto',
                lineHeight: this.height + 'px',
                borderRadius: this.height + 'px',
                backgroundColor: this.bgColor,
                color: this.color
            }
        },
        editStyle(){
            return {
                height: this.height + 'px',
                lineHeight: this.height + 'px',
            }
        },
        selectStyle(){
            return {
                height: this.height + 'px',
                left: this.selectLeft + 'px',
                width: this.selectWidth + 'px'
            }
        }
    },
    methods:{
        onClick(){
            if(!this.isEditMode){
                return;
            }
            this.startEdit();
            process.nextTick(()=>{
                this.$refs.input.focus()
                this.editText = this.text;
                process.nextTick(() => {
                    this.moveCursor();
                })
            })
        },
        onFocus(){
            console.log('focus')
        },
        onBlur(){
            console.log('blur')
            this.endEdit()
            this.$emit('tagUpdate', this.editText);
        },
        onInput(){
        },
        onKeyDown(){
            console.log('keyDown')
            process.nextTick(()=>{
                const { input } = this.$refs;
                this.editText = input.value;
                this.moveCursor();
                if(input.value.endsWith(' ')){
                    this.editText = this.editText.replace(' ','');
                    input.value = input.value.replace(' ','');
                    input.blur();
                }
            });
        },
        onClose(){
            this.$emit('tagUpdate', '');
        },
        startEdit(){
            this.isShowCursor = true;
            this.isEdit = true;
            // this.$refs.input.selectionEnd = this.$refs.input.value.length;
        },
        endEdit(){
            this.isShowCursor = false;
            this.isEdit = false;
            this.isSelect = false;
        },
        moveCursor(){
            const { input, cursor } = this.$refs;
            const font = `normal 14px D2Coding, 'D2 coding', monosapce`;
            const value = input.value.substring(0, input.selectionEnd);
            const size = getTextWidth(value, font);
            console.log(input.value, 'size: '+size)
            cursor.style.left = (size + 8) + 'px'
            if(input.selectionEnd !== input.selectionStart){
                const leftValue = input.value.substring(0, input.selectionStart);
                const widthValue = input.value.substring(input.selectionStart, input.selectionEnd);
                this.selectLeft = getTextWidth(leftValue, font) + 8;
                this.selectWidth = getTextWidth(widthValue, font);
                this.isSelect = true;
            } else {
                this.isSelect = false;
            }

        }
    },
    mounted(){
        if(this.text.length <= 0){
            this.onClick();
        } else {
            this.editText = this.text;
            this.$refs.input.value = this.text;
        }
    }
}
</script>
<style lang="scss" scoped>
    @import 'centered.scss';
    .tag-button{
        display: inline-block;
        padding-left: 8px;
        padding-right: 8px;
        position: relative;
        overflow: hidden;
    }
    .close{
        float: left;
        position: relative;
        display: inline-flex;
        width: 12px;
        margin-left: 8px;
        height: 100%;
        align-content: center;
    }
    .close:after {
        content: '';
        height: 12px;
        border-left: 1px solid #000;
        position: absolute;
        transform: rotate(45deg);
        left: 6px;
        top: 6px;
    }
    .close:before {
        content: '';
        height: 12px;
        border-left: 1px solid #000;
        position: absolute;
        transform: rotate(-45deg);
        left: 6px;
        top: 6px;
    }
    .text{
        float: left;
        display: inline-block;
        padding: 0;
        margin: 0;
    }
    .input{
        position: absolute;
        width: 1000px;
        height: -3px;
        pointer-events: none;
        background-color: transparent;
        color: transparent;
        overflow: hidden;
        border: none;
        left: 0px;
        top: 0px;
        &::selection{
            background-color: transparent;
        }
    }
    .edit{
        float: left;
        border: 1px solid #d9d9d9;
        position: relative;
        width: auto;
        background-color: #fff;
    }
    .cursor{
        left: 8px;
        top: 0px;
        position: absolute;
        width: 1px;
        height: 14px;
        background-color: #000;
        @include centered-h;
    }
    .select{
        top: 0px;
        position: absolute;
        background-color: rgba(65,105,225, 0.3);
    }
</style>


