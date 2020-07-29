<template>
    <div id="Tools">
        <div v-for="(item , index) in toolsList" :key="index" @click="go(item.pageRouter)">
            <img :src="item.titleImg" />
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tools",
        data() {
            return {
                toolsList:[
                    {
                        title:"人物评选",
                        titleImg:baseImgUrl+"Frame-1-1-1.png",
                        pageRouter:"/Character.html"
                    },
                    {
                        title:"社区文化",
                        titleImg:baseImgUrl+"Frame2-2-1.png",
                        pageRouter:"/Community.html"
                    },
                    {
                        title:"幸福分享",
                        titleImg:baseImgUrl+"Frame2-2-2.png",
                        pageRouter:"/Happiness.html"
                    },
                    {
                        title:"志愿者服务",
                        titleImg:baseImgUrl+"zhiyuanhuodong.png",
                        pageRouter:"/volunteer.html"
                    }
                ]
            }
        },
        methods: {
            go(src){
                this.$router.push(src);
            }
        },
        components: {},
        created() {

        },
    }
</script>

<style scoped lang="stylus">
    #Tools
        width 100%
        display flex
        box-sizing border-box
        flex-wrap wrap
        div
            width 25%
            height func(100)
            display flex
            flex-direction column
            align-items center
            justify-content  center
            box-sizing border-box
            &:nth-of-type(4n)
                border-right: 0
            &:nth-of-type(n + 5)
                border-bottom 0
            img
                width func(44)
                height func(44)
                margin-bottom func(10)
            p
                margin:0
</style>