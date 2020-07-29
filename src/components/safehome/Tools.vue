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
                        title:"自我保护",
                        titleImg:baseImgUrl+"protect.png",
                        pageRouter:"/Selfprotection.html"
                    },
                    {
                        title:"灾情上报",
                        titleImg:baseImgUrl+"ic_danger.png",
                        pageRouter:"/Disaster.html"
                    },
                    {
                        title:"警情通报",
                        titleImg:baseImgUrl+"ic_alarm.png",
                        pageRouter:"/PoliceSentiment.html"
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
