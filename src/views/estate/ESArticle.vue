<template>
        <div id="ESArticle">
            <MyHeader title="文章详情"/>
            <Lines />
            <h4 v-text="article.title"/>
            <p>
                时间：
                <span v-text="article.create_date.slice(0,10)"></span>
            </p>
            <p>
                地址：{{article.areaName}}
            </p>
            <div class="info" v-html="article.content"/>
        </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import Lines from "../../components/public/Lines";
    import { getNews } from "../../apis";
    export default {
        name: "ESArticle",
        data() {
            return {
                article:{}
            }
        },
        methods: {},
        components: {
            MyHeader,
            Lines
        },
        created() {
            const news_id = this.decodeBase64(this.$route.query).news_id;
            getNews({data:{news_id}}).then(msg => {
                if(~~msg.code === 0 && ~~msg.status === 200){
                    msg = msg.data[0]
                    this.article = msg;
                }
            })
        },
        mounted() {
        },
        filters: {},
        computed: {},
        watch: {}
    }

</script>

<style scoped lang="stylus">
#ESArticle {
    width 100%
    min-height 100vh
    box-sizing border-box
    padding: func(44) func(15) func(15) func(15)
    > h4 {
        width 100%
        font-weight 400
        margin-bottom func(20)
        margin-top func(8)
    }
    > p {
        margin-bottom: func(12)
        >span {
            color #6CB127
        }
    }
    > .info {
        width 100%
        box-sizing border-box
        border-top func(1) solid #f8f8f8
        padding-top func(15)
        >>> img {
            max-width 100%!important
        }
        >>> div,
        >>> span {
            font-size func(14)
        }
    }
}
</style>
