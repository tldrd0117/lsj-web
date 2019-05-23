<template>
	<div id="app"
		:class='{
				"modal-open": show	
			}'
		>
		<div class='scrollContents'
			>
			<nav-bar
				class='nav'
				@menuclick='menuclick'
				/>
			<div class="view">
				<keep-alive>
					
					<router-view 
						v-if='curView && curView.key'
						:key='curView.key'
						class='comp'
						/>
				</keep-alive>
			</div>
		</div>
        <div id='modalContents'
			>
            <!-- 모달 루트를 만들고 컨트롤은 모달 스토어를 통해 string을 이름기점으로 삼아서 -->
            <modal-root/>
        </div>
  	</div>
</template>
<script>
import NavBar from '~/nav/NavBar'
import StackLayout from '~/layout/StackLayout'
import Home from '@/views/Home'
import Blog from '@/views/Blog'
import Board from '@/views/Board'
import ModalRoot from '~/common/ModalRoot'
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
	components:{
		NavBar,
		StackLayout,
		Home,
		Blog,
		Board,
		ModalRoot
	},
	computed: {
		...mapState('menu', ['curView', 'menuMap']),
		...mapGetters('menu', ['menuNames', 'menuPaths']),
		...mapState('modal', ['show'])
	},
	methods: {
		...mapActions('menu',['newView']),
		...mapActions('auth', ['autoLogin']),
		filterName(name){
			if(name.startsWith('blog')){
				return 'blog'
			} else if(name.startsWith('board')){
				return 'board'
			}
			return name

		},
		menuclick(index){
			const target = this.menuMap[index];
			const key = '' + Date.now();
			this.$router.push({
				name: target.name,
				params: {
					key
				}
			})
		},
		onScroll(e){
			console.log(e)
		},
		onScrollContentsClick(e){
			console.log('onScrollContentsClick');
		}
	},
	created(){
		this.autoLogin();
	}
}
</script>

<style lang="scss" scoped>
	@import 'size.scss';
	@import 'shadow.scss';
	.view{
		top: 0px;
		position: relative;
		width: 100%;
		min-height: calc(100% - (#{$nav-size + $tab-size}) );
    	background-color: #f2f2f5;
	}
	.nav{
		position: relative;
		z-index: 30;
	}
    .scrollContents{
	    overflow: auto;
        width: 100%;
        height: 100%;
        position: absolute;
    }
	.modal-open{
		overflow: hidden;
	}
	.modalContents{
		overflow: auto;
        width: 100%;
        height: 100%;
        position: absolute;
	}
</style>

<style lang="scss">
@import 'common.scss';
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
	color: #2c3e50;
	left: 0px;
	top: 0px;
	position: relative;
	width: 100%;
	height: 100%;
}

input {
	box-sizing: border-box;
}

* {
	outline: none;
	  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

</style>
