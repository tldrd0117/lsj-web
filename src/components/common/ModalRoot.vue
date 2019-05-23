<template>
    <fixed-bg-layout
        v-if='show'
        @clickBG='onClose'
        background-color='rgba(0,0,0,0.3)'
        >
        <component
            :is='name'
            :key='name'
        />
    </fixed-bg-layout>
</template>
<script>
import FixedBgLayout from '~/layout/FixedBgLayout';
import { mapState, mapMutations } from 'vuex';
import Modal from './Modal';
import LoginModal from '~/user/LoginModal';
import SignUpModal from '~/user/SignUpModal';
export default {
    components:{
        FixedBgLayout,
        LoginModal,
        SignUpModal,
        Modal
    },
    computed:{
        ...mapState('modal', ['show', 'head', 'body', 'name'])
    },
    methods: {
        ...mapMutations('modal', ['setModal']),
        onClose(){
            this.setModal({
                show: false
            });
        }
    }
}
</script>
<style lang="sass" scoped>

</style>


