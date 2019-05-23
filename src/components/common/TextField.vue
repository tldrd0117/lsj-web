<template>
    <div
        class='text-field'
        >

        <input 
            :class="{
                input: true,
                ['input-fold']: isFold
            }"
            :style="inputStyle"
            @focus="onFocus"
            @blur="onBlur"
            @input='onInput'
            v-model="inputValue"
            v-bind="$attrs"
            />
        <span 
            class='placeholder'
            ref='placeholder'
            >
            {{placeHolder}}
        </span>

    </div>
</template>
<script>
export default {
    props:{
        placeHolder: String,
        inputStyle: Object
    },
    data(){
        return {
            inputValue: '',
            isFold: false
        }
    },
    methods:{
        onInput(e){
            this.$emit('input', this.inputValue)
        },
        onFocus(){
            if(this.isFold){
                return;
            }
            this.isFold = true;
            const el = this.$refs.placeholder;
            const curTop = parseInt(el.style.top)
            el.velocity({
                fontSize: [10,14],
                top: [0, curTop],
                tween: [1,0.5]
            }, {
                easing: 'ease-out',
                queue: false,
                duration: 200,
                progress: function(elements, percentComplete, remaining, tweenValue, activeCall) {
                    el.style.color = `rgba(241,151,64,${tweenValue})`
                },
                complete: (elements) => {
                }
            })

        },
        onBlur(){
            if(this.inputValue.length > 0){
                return;
            }
            this.isFold = false;
            const el = this.$refs.placeholder;
            const height = el.parentElement.offsetHeight;
            const size = (height - 14) / 2;
            el.velocity({
                fontSize: [14,10],
                top: [size, 0],
                tween: [0.5,1.0]
            }, {
                easing: 'ease-out',
                queue: false,
                duration: 200,
                progress: function(elements, percentComplete, remaining, tweenValue, activeCall) {
                    el.style.color = `rgba(241,151,64,${tweenValue})`
                },
                complete: (elements) => {
                }
            })

        },
        setCenterPlaceHolder(){
            const el = this.$refs.placeholder;
            const height = el.parentElement.offsetHeight;
            const size = (height - 14) / 2;
            el.style.top = size + 'px'; 
        }
    },
    mounted(){
        this.setCenterPlaceHolder()
    }
}
</script>
<style lang="scss" scoped>
    @import 'size.scss';
    @import 'shadow.scss';
    .text-field{
        float: left;
        position: relative;
        width: 100%;
        height: 44px;
        .input{
            width: 100%;
            height: calc(100% - 5px);
            margin-top: 5px;
            position: absolute;
            padding-left: 25px;
            border-radius: 22px;
            border: 1px solid #dfe1e5;
            &.input-fold{
                border: 1px solid rgb(241,151,64);
            }
            &:focus, &:hover{
                @include box-shadow-1;
            }
        }
        .placeholder{
            padding-left: 2px;
            padding-right: 2px;
            background-color: #fff;
            position: absolute;
            left: 25px;
            font-weight: bold;
            color: rgba(241,151,64,0.5);
        }

    }
    
</style>


