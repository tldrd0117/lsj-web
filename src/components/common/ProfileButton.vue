<template>
    <div :style='profileStyle'>
        <img 
            class="img"
            @click="$emit('click', $event)"
            :src='getImageUrl'
            />
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Identicon from 'identicon.js';

export default {
    name:'ProfileButton',
    props:{
        emailHashProp: {
            type: String,
        },
        size: {
            type: [String, Number],
            default: 56
        }
    },
    computed:{
        ...mapState('auth', ['emailHash']),
        getImageUrl(){
            // return 'http://www.gravatar.com/avatar/';
            if(this.emailHashProp){
                return `http://www.gravatar.com/avatar/${this.emailHashProp}?s=${this.size}`
            }
            return `http://www.gravatar.com/avatar/${this.emailHash}?s=${this.size}`;
        },
        profileStyle(){
            return {
                width: this.size + 'px',
                height: this.size + 'px'
            }
        },
        buttonStyle(){
            return {
                fontSize: (this.size / 2) + 'px',
                lineHeight: this.size + 'px'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
</style>

