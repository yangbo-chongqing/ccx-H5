<template>
    <div class="ArticleList" @click="goDetails(article.news_id)">
        <div class="time">
            <p>01月</p>
            <span>12</span>
        </div>
        <i></i>
        <div class="one">
            {{ article.title }}
        </div>
    </div>
</template>

<script>

    export default {
        name: "ArticleList",
        props:{
            article:{
                type: Object,
                required: true
            }
        },
        methods: {
            //跳转详情页
            goDetails(news_id){
                this.switchPage({pageRouter:"/esArticle.html" ,params:{news_id}})
            }
        },
        components: {},
        created() {},
        mounted() {},
        filters: {},
        computed: {},
        watch: {}
    }

</script>

<style scoped lang="stylus">
.ArticleList {
    width:100%
    height func(73)
    box-sizing border-box
    padding 0 func(15)
    display flex
    border-bottom func(1) solid #e5e5ea
    align-items center
    position relative
    >.time {
        width func(60)
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        > p {
            color #8A8A8A
        }
        > span {
            color #6CB127
        }
    }
    > .one {
        width 80%
        padding-left: 1em;
    }
    > i {
        width func(2)
        height func(37)
        background-color: #f8f8f8
        position absolute
        top 50%
        left func(75)
        transform translateY(-50%)
    }
}
</style>
