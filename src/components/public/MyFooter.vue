<template>
    <footer>
        <div :class="{active:pageIndex === index}"
             v-for="(item , index) in tabbar"
             :key="index"
             @click="goPage(item)"
        >
            <div>
                <i class="iconfont" v-html="item.icon" />
            </div>
            <p>{{ item.title }}</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "MyFooter",
        props:{
            pageIndex:{
                type:Number,
                required:true
            }
        },
        data(){
            return {
                tabbar: [
                    {
                        title:"首页",
                        icon:"&#xe60c;",
                        pageRouter:"/"
                    },
                    {
                        title:"服务",
                        icon:"&#xe605;",
                        pageRouter:"/server.html"
                    },
                    {
                        title:"景区",
                        icon:"&#xe62c;",
                        pageRouter:"/scenic.html"
                    },
                    {
                        title:"个人中心",
                        icon:"&#xe624;",
                        pageRouter:"/profile.html"
                    }
                ]
            }
        },
        methods: {
            //页面跳转
            goPage({pageRouter}){
                this.switchPage({pageRouter})
            }
        },
        components: {},
        created() {
        },
    }
</script>

<style scoped lang="stylus">
    footer{
        min-width 320px
        width 15rem
        height func(49);
        position fixed;
        bottom -0.05rem;
        left 50%;
        transform translateX(-50%)
        display flex
        align-items center
        justify-content center
        background-color: #fff
        box-shadow func(-5) func(-5) func(8) rgba(0,0,0,.03);
        z-index 999
        > div {
            flex 1;
            height:100%
            box-sizing border-box
            display flex
            flex-direction column
            align-items center
            justify-content center
            &.active {
                color #6CB127
            }
            > div {
                width 100%
                display flex
                height 50%
                justify-content center
                align-items center
                > .iconfont {
                    font-size func(24)
                }
            }
            >p {
                width 100%;
                height 50%;
                display flex
                align-items center
                justify-content center
            }
        }
    }
</style>
