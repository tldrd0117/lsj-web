<template>
    <absolute-layout 
        ref="layout">
        <slot></slot>
    </absolute-layout>
</template>
<script>
import AbsoluteLayout from './AbsoluteLayout'
import { tap, startWith, map, catchError, switchMap, 
        takeUntil, share, first, withLatestFrom,
        scan, takeWhile, pairwise, delay, skipUntil, mergeMap, skipWhile, sample, filter  } from 'rxjs/operators';
import { parseTranslate3d, isMobile } from '@/utils/Utils'
import { fromEvent, empty, NEVER, timer, iif, race } from 'rxjs';
export default {
    props:{
        keys: Array
    },
    components:{
        AbsoluteLayout
    },
    data(){
        return {
            SUPPORT_TOUCH: isMobile() === 'mobile',
            START: isMobile() ? 'touchstart' : 'mousedown',
            MOVE: isMobile() ? 'touchmove' : 'mousemove',
            END: isMobile() ? 'touchend' : 'mouseup',
            LEAVE: isMobile() ? 'touchleave' : 'mouseleave',
            start$: null,
            move$: null,
            end$: null,
            leave$: null,
            isDown: false,
        }
    },
    watch:{
        keys(val){
                setTimeout(() =>{
                this.sortOrderByArray();
            },0)
        }
    },
    methods:{
        toPos: function(obs$){ 
            return obs$.pipe(
                map(e => 
                    //  e.changedTouches? e.changedTouches[0].pageX : e.pageX
                    (isMobile() ? e.changedTouches[0].pageX : e.pageX)
                ),
                // tap(event=>console.log(event))
            )
        },
        selectComp: function(obs$){
            const leftSpace = this.$refs.layout.$el.getBoundingClientRect().left;
            return obs$.pipe(
                map( pageX => 
                    {
                        return{
                            start: pageX,
                            comp: Array.from(this.$refs.layout.$el.children).find((item, index, arr) => {
                                let x = parseTranslate3d(item).x + leftSpace - this.$refs.layout.$el.scrollLeft;
                                let nextX = x + item.offsetWidth;
                                console.dir(this.$refs.layout.$el)
                                console.log(pageX, x, nextX, leftSpace, this.$refs.layout.$el.scrollLeft)
                                return pageX > x && pageX < nextX;
                            })
                        }
                    }
                ),
                filter( obj => obj.comp && obj.comp.style ),
                map( obj => ({
                        ...obj,
                        offset: obj.start - parseTranslate3d(obj.comp).x,
                    }
                ))
                
            )
        },
        collapseComp: function(obs$){
            return obs$.pipe(
                map( (obj) => 
                    ({
                        ...obj,
                        collapse: Array.from(this.$refs.layout.$el.children).find((item, index, arr) => {
                            if(!obj.comp) return false;
                            if(obj.comp.index === item.index){
                                return false;
                            }
                            
                            let x = parseTranslate3d(item).x - this.$refs.layout.$el.scrollLeft;
                            let nextX = x + item.offsetWidth;

                            //down comp
                            let compX = parseTranslate3d(obj.comp).x - this.$refs.layout.$el.scrollLeft;
                            let compNextX = compX + obj.comp.offsetWidth;

                            // console.log(x,nextX, compX, compNextX)

                            let harf = obj.comp.offsetWidth / 2 + 3;
                            return (compNextX > x + harf && nextX > compX && compNextX < nextX && compX < x && obj.face > 0)
                                    || (compNextX > x && nextX > compX + harf  && compNextX > nextX && compX > x && obj.face < 0)

                        })
                    })
                ),
                // tap(e=>console.log(e.collapse))
            )
        },
        collapseLeftAndRight: function (obs$) {
            const layout = this.$refs.layout.$el
            return obs$.pipe(
                map( (obj) => 
                    { 
                        let dir = ''
                        let move = 0
                        let isCollapse = false
                        const scrollLeft = layout.scrollLeft
                        const scrollWidth = layout.scrollWidth
                        const width = layout.getBoundingClientRect().width
                        const compLeft = obj.comp.getBoundingClientRect().left
                        const compRight = obj.comp.getBoundingClientRect().right
                        if(scrollLeft > 0 && compLeft < 0){
                            dir = 'left'
                            isCollapse = true
                            move = -compLeft*2
                            console.log(compLeft)
                        }
                        // if(scrollWidth - scrollLeft > compRight && compRight > width ){
                        //     dir = 'right'
                        //     isCollapse = true
                        //     move = compRight - width
                        // }
                        return{
                            ...obj,
                            isCollapse,
                            dir,
                            move
                        }
                        
                    }
                ),
                // tap(e=>console.log(e.collapse))
            )
        },
        sortOrderByArray(){
            let items = Array.from(this.$refs.layout.$el.children);
            const length = items.length;
            items.map((item) =>{
                if(!item.style.transform)
                    item.style['transform'] = `translate3d(${(length - 1)  * 100}px, 0, 0)`;
                return item;
            }).sort((a,b) => {
                return parseTranslate3d(a).x - parseTranslate3d(b).x;
            }).forEach((item, index) => {
                item.style['transform'] = `translate3d(${index * 100}px, 0, 0)`;
                item.index = index;

            });
        },
        sortOrderByCoord(){
            //append 식으로 old new 비교
            Array.from(this.$refs.layout.$el.children).sort((a,b) => {
                return parseTranslate3d(a).x - parseTranslate3d(b).x;
            }).forEach((item, index) => {
                item.style['transform'] = `translate3d(${index * 100}px, 0, 0)`;
                item.index = index;
            });

        }
    },
    beforeMount(){
    },
    mounted(){
        Array.from(this.$refs.layout.$el.children).forEach((item, index) => {
            item.style['transform'] = `translate3d(${index * 100}px, 0, 0)`;
            item.index = index;
        });
        this.start$ = fromEvent(this.$refs.layout.$el, this.START).pipe(tap(e=>this.isDown = true));
        this.move$ = fromEvent(this.$refs.layout.$el, this.MOVE).pipe(  map(e=>this.isDown? e : empty()))
        this.end$ = fromEvent(this.$refs.layout.$el, this.END).pipe(tap(e=>this.isDown = false))
        this.leave$ = fromEvent(this.$refs.layout.$el, this.LEAVE).pipe(tap(e=>this.isDown = false))
        // const longStream = this.start$.pipe(
        //     tap(e=>console.log(e)),
        //     switchMap((e) => timer(700).pipe(
        //         takeUntil(this.end$)
        //     ),
        //     e=>e),
        //     tap(e=>console.log(e))
        // )
        const isLeave = this.start$.pipe(
            this.toPos,
        )

        const drag$ = this.start$.pipe(
            this.toPos,
            this.selectComp,
            switchMap((e) => timer(700).pipe(
                takeUntil(this.end$),
                takeUntil(fromEvent(e.comp, this.LEAVE))
            ), e => {
                console.log(e)
                if(e.comp) e.comp.style['zIndex'] = 1;
                return e
            }),
            switchMap(obj => 
                this.move$.pipe(this.toPos).pipe(
                    pairwise(),
                    map( ([prev, move]) => ({
                        start: obj.start,
                        move,
                        drag: move - obj.start,
                        face: move - prev,
                        pos: move - obj.offset,
                        comp: obj.comp,
                        scrollPos: move - obj.offset - this.$refs.layout.$el.scrollLeft,
                        unitX: Math.round((move - obj.offset) / 100) * 100
                    })),
                    takeUntil(this.end$)
                )
            ),
            share()
        )

        const drop$ = drag$.pipe(
            switchMap(obj => 
                this.end$.pipe(
                    map(event => obj),
                    first()
                )
            ),
            tap(function(obj){
                obj.comp.style['zIndex'] = 0;
            })
        )
        const leave$ = drag$.pipe(
            switchMap(obj => 
                this.leave$.pipe(
                    map(event => obj),
                    first()
                )
            ),
            tap(function(obj){
                obj.comp.style['zIndex'] = 0;
            })
        )
        let autoScrollId = 0;
        let moveDistance = 0;
        leave$.subscribe(obj => {
            // obj.comp.style['transform'] =  `translate3d(${obj.unitX}px, 0, 0)`;
            this.sortOrderByArray();
            if(autoScrollId > 0) {
                clearInterval(autoScrollId)
                autoScrollId = 0
                moveDistance = 0;
            }
        })

        drop$.subscribe(obj => {
            // obj.comp.style['transform'] =  `translate3d(${obj.unitX}px, 0, 0)`;
            this.sortOrderByArray();
            if(autoScrollId > 0) {
                clearInterval(autoScrollId)
                autoScrollId = 0
                moveDistance = 0;
            }   
        })

        drag$.subscribe(obj => {
            // if(obj.scrollPos >= 0){
            //     clearInterval(autoScrollId)
            //     obj.comp.style['transform'] = `translate3d(${obj.pos - moveDistance}px, 0, 0)`;
            // }
        })

        drag$.subscribe(obj => {
            console.log(obj.scrollPos, obj.pos, autoScrollId, moveDistance)
            console.log(obj.scrollPos <= 0 && autoScrollId === 0)
            if(obj.scrollPos <= 0 && autoScrollId === 0){
                autoScrollId = setInterval(() => {
                    console.log(this.$refs.layout.$el.scrollLeft)
                    if( this.$refs.layout.$el.scrollLeft>0){
                        this.$refs.layout.$el.scrollLeft -= 10
                        //collapse 조정이 필요함
                        moveDistance += 10
                        obj.comp.style['transform'] = `translate3d(${obj.pos - moveDistance}px, 0, 0)`;
                    }
                },100)
            } else if(obj.scrollPos > 0) {
                clearInterval(autoScrollId)
                autoScrollId = 0;
                moveDistance = 0;
                obj.comp.style['transform'] = `translate3d(${obj.pos - moveDistance}px, 0, 0)`;
            } else {
                obj.comp.style['transform'] = `translate3d(${obj.pos - moveDistance}px, 0, 0)`;
            }
            // else if(obj.scrollPos > 0  && autoScrollId > 0) {
            //     clearInterval(autoScrollId)
            //     autoScrollId = 0
            //     moveDistance = 0;
            // }

        })

        drag$.pipe(this.collapseComp).subscribe(obj => {
            if(!obj.collapse) return;
            console.log(obj.collapse)
            // console.log(obj);//+ (obj.face > 0 ? 0: 100)
            obj.collapse.style['transform'] = 
                `translate3d(${obj.unitX + (obj.face > 0 ? -100: 100) }px, 0, 0)`;
            // let temp = obj.comp.index;
            // obj.comp.index = obj.collapse.index;
            // obj.collapse.index = temp;
        })

    }
}
</script>

