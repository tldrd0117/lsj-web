<template>
    <div
        class='ripple-root'
        ref='rippleRoot'
        @mousedown='onActionDown'
        @mouseup='onActionUp'
        @mouseleave="onActionLeave"
        @touchstart='onActionDown'
        @touchend='onActionUp'
        @touchleave='onActionLeave'
        @click.stop.prevent="onClick">
        <slot/>
        <div
            ref='rippleDiv'
            class="ripple"/>
    </div>
</template>
<script>
import Velocity from 'velocity-animate';
import { isMobile } from '@/utils/Utils'
export default {
    props:{
        durationFull: {
            type: Number,
            default: 400
        }
    },
    data(){
        return {
            isClick: false
        }
    },
    computed: {
    },
    methods: {
        animate(e, duration){
            const el = this.$refs.rippleDiv;
            const root = this.$refs.rippleRoot;

            const rect = root.getBoundingClientRect();
            let startX, startY;
            if(isMobile()){
                startX = e.changedTouches[0].pageX
                startY = e.changedTouches[0].pageY
                console.log(e)
            } else {
                startX = e.pageX;
                startY = e.pageY;
            }
            let targetX = startX - rect.left;
            let targetY = startY - rect.top - e.view.scrollY;

            const width = el.parentElement.offsetWidth;
            const height = el.parentElement.offsetHeight;
            const standard = Math.max(width, height) * 2;
            const harf = standard / 2;
            return el.velocity({
                width: [standard,0],
                height: [standard, 0],
                left: [targetX - harf, targetX ],
                top: [targetY - harf, targetY ],
                opacity: [0.1,0.1]
            }, {
                easing: 'ease-out',
                queue: false,
                duration,
                complete: (el) => {

                }
            })
        },
        onActionDown(e){
            this.animate(e, this.durationFull);
        },
        onActionUp(e){
            const el = this.$refs.rippleDiv;
            if( !el || typeof el.velocity === 'undefined'){
                return;
            }
            el.velocity("stop", true)
            .velocity({opacity: 0},{
                duration: 150,
                complete: (el) => {
                    if(this.isClick){
                        this.$emit('click', e);
                        this.isClick = false;
                    }
                }
            });

            // .velocity("reverse");
        },
        onActionLeave(e){
            const el = this.$refs.rippleDiv;
            if(!el || typeof el.velocity === 'undefined'){
                return;
            }
            el.velocity("stop")
            .velocity({opacity: 0},{
                duration: 150,
                complete: (el) => {
                }
            });
        },
        onClick(e){
            this.isClick = true;
        }
    }
}
</script>
<style lang="scss">
    .ripple{
        position: absolute;
        border-radius: 50%;
        background-color: #000;
        opacity: 0;
        pointer-events: none;

    }
    .ripple-root{
        overflow: hidden;
        left: 0px;
        top: 0px;
    }
</style>


