<template>
    <div class="size"
        >
        <div class="bg"
        v-if="isOpen"
        @click="onBgClick"
        />
        <div class="comp"
            :style="zIndexStyle"
            @click="onClick">
            <div 
                :class='{
                    "drop-down-box": true,
                    "drop-down-box-open": isOpen
                }'
                >
                {{selectedText}}
                <span class='arrow'
                    :style="arrowStyle"
                    ></span>
            </div>
            <div class="drop-down-menu" v-if="isOpen">    
                <div v-for="(item, index) in menus"
                    class='drop-down-menu-item'
                    @click='onItemClick(item)'
                    :key="index">
                    {{item}}
                </div>
            </div>
            <span 
                class='placeholder'
                ref='placeholder'
                >
                {{placeHolder}}
            </span>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        placeHolder: String
    },
    data(){
        return {
            isOpen: false,
            selectedText: '',
            menus:['test1', 'test2', 'test3', 'test4'],
            menuShow: false
        }
    },
    computed:{
        arrowStyle(){
            return {
                transform: `rotate(${this.isOpen? 180 : 0}deg)`
            }
        },
        zIndexStyle(){
            return {
                zIndex: this.isOpen? 101 : 0
            }
        }
    },
    methods:{
        onClick(){
            console.log('click')
            if(this.isOpen){
                this.close();
            } else {
                this.open();
            }
            
        },
        onBgClick(){
            console.log('bgclick')
            this.close();
        },
        onItemClick(item){
            console.log('itemclick')
            this.selectedText = item;
        },
        open(){
            if(this.selectedText.length > 0){
                this.isOpen = true;
                return;
            }
            this.isOpen = true;
            const el = this.$refs.placeholder;
            const curTop = parseInt(el.style.top)
            el.velocity({
                fontSize: [10,14],
                top: [0, curTop],
                tween: [1,0.3]
            }, {
                easing: 'ease-out',
                queue: false,
                duration: 300,
                progress: function(elements, percentComplete, remaining, tweenValue, activeCall) {
                    el.style.color = `rgba(${126*tweenValue},${87*tweenValue},${194*tweenValue},${tweenValue})`
                },
                complete: (elements) => {
                }
            })
        },
        close(){
            if(this.selectedText.length > 0){
                this.isOpen = false;
                return;
            }
            this.isOpen = false;
            const el = this.$refs.placeholder;
            const height = el.parentElement.offsetHeight;
            const size = (height - 14) / 2 + 2;
            el.velocity({
                fontSize: [14,10],
                top: [size, 0],
                tween: [0.3,1.0]
            }, {
                easing: 'ease-out',
                queue: false,
                duration: 300,
                progress: function(elements, percentComplete, remaining, tweenValue, activeCall) {
                    el.style.color = `rgba(0,0,0,${tweenValue})`
                    
                },
                complete: (elements) => {
                }
            })
        },
        setCenterPlaceHolder(){
            const el = this.$refs.placeholder;
            const height = el.parentElement.offsetHeight;
            const size = (height - 14) / 2 + 2;
            el.style.top = size + 'px'; 
        }
    },
    mounted(){
        this.setCenterPlaceHolder();
    }
}
</script>
<style lang="scss" scoped>
    @import 'shadow.scss';
    .size{
        width: 100px;
        height: 40px;
        box-sizing: border-box;
    }
    .drop-down-box{
        width: 100%;
        height: calc(100% - 5px);
        margin-top: 5px;
        position: absolute;
        border: 1px solid #d9d9d9;
        padding-left: 10px;
        border-radius: 4px;
        box-sizing: border-box;
        align-items: center;
        display: flex;
        background-color: #fff;
        transition: all 0.3s;
    }
    .drop-down-box-open{
        border: 2px solid rgb(126, 87, 194);
    }
    .arrow{
        background-image: url('../../assets/drop-down-arrow.png');
        background-repeat: no-repeat;
        background-size: 8px 4px;
        margin-right: 8px;
        width: 8px;
        height: 4px;
        right: 0px;
        position: absolute;
    }
    .drop-down-menu{
        width: 100%;
        top: 100%;
        height: auto;
        position: absolute;
        z-index: 10;
        background-color: #fff;
        @include box-shadow-1;
        border-radius: 4px;
    }
    .drop-down-menu-item{
        display: flex;
        align-items: center;
        height: 40px;
        padding-left: 16px;
        box-sizing: border-box;

    }
    .placeholder{
        padding-left: 2px;
        padding-right: 2px;
        background-color: #fff;
        position: absolute;
        left: 10px;
        color: rgba(0,0,0,0.3);
    }
    .bg{
        left: 0px;
        top: 0px;
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-color: transparent;
    }
    .comp{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>


