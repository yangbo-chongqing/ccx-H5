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
                        title:"党建要闻",
                        titleImg:baseImgUrl+"djdt1.png",
                        pageRouter:"/PartyBuildDynamics.html"
                    },
                    {
                        title:"党务相册",
                        titleImg:baseImgUrl+"djdt2.png",
                        pageRouter:"/PartyBuildPhoto.html"
                    },
                    {
                        title:"党务公开",
                        titleImg:baseImgUrl+"djdt3.png",
                        pageRouter:"/PartyAffairs.html"
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
    #Tools {
        width 100%
        height func(106)
        display flex
        align-items center
        justify-content center
        box-sizing border-box
        padding: 0 func(15)
        > div {
            flex 1
            height 100%
            display flex
            flex-direction column
            align-items center
            justify-content center
            > img {
                width func(44)
                height func(44)
                margin-bottom func(12)
            }
            > p {
                width 100%
                color #444
                text-align center
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
            }
        }
    }
</style>
