<template>
    <div id="AgriculturalDetails">
        <MyHeader :title="'新闻详情'"/>
        <div class="top">
            <h6>{{ news.title }}</h6>
            <div>
                <div class="left">
                    <div>
                        <p>姓名：{{ news.user_name }}</p>
                        <p>联系电话：{{ news.user_tel }}</p>
                        <p>地址：{{news.address}}</p>
                    </div>
                </div>
                <i class="right iconfont" @click="call()">&#xe6a9;</i>
            </div>
        </div>
        <div class="bottom" v-html="news.content"/>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import {Dialog} from "vant";
    import {getNews} from "@/apis";
    export default {
        name: "AgriculturalDetails",
        data() {
            return {
                news:{}
            }
        },
        methods: {
            getNews(){
                getNews({
                    url:"/information/getOne",
                    data:{
                        news_id:this.$route.query.id
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        msg = msg.data[0];
                        this.news = msg;
                    }else {
                        //获取失败
                        this.GToast({message:"获取新闻失败"});
                    }
                })
            },
            //拨打电话
            call(phone){
                Dialog.confirm({
                    title: '拨打电话',
                    message: '确认拨打电话？',
                    confirmButtonText: '确定',
                    confirmButtonColor: '#6CB127',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#8A8A8A'
                }).then(() => {
                    // 确定
                    phone = "tel:" + phone;
                    window.open(phone);
                }).catch(() => {
                    // 取消
                });
            }
        },
        components: {
            MyHeader,
            Dialog
        },
        created() {
            // const newsId = this.decodeBase64(this.$route.query)
            this.getNews()
        },
    }
</script>

<style scoped lang="stylus">
#AgriculturalDetails {
    width 100%
    box-sizing border-box
    padding-top func(44)
    > .top {
        width 100%
        max-height func(128.5)
        box-sizing border-box
        padding func(8) func(15) 0 func(15)
        > h6{
            width: 100%
            max-height func(40)
            font-size func(14)
            font-weight 400
            color #444
            line-height func(20)
            nLine()
        }
        > div {
            width 100%
            height func(80.5)
            box-sizing border-box
            display flex
            align-items center
            justify-content space-between
            border-bottom func(1) solid #f5f5f5
            > .left {
                display flex
                align-items center
                height:100%
                > img {
                    width: func(44)
                    height func(44)
                    border-radius 50%
                    margin-right: func(12)
                }
                > div{
                    display flex
                    flex-direction column
                    justify-content center
                    > h6 {
                        font-size func(14)
                    }
                    > p {
                        font-size func(12)
                        color #999
                    }
                }
            }

            > .right {
                font-size func(14)
                color #6CB127
                > span {
                    color #D33333
                }
            }
        }
    }
    > .bottom {
        width 100%
        box-sizing border-box
        padding func(12.5) func(15)
        img {
            max-width 100% !important
        }
        >>>span,
        >>>p,
        >>>div,
        >>>h1,
        >>>h2,
        >>>h3,
        >>>h4,
        >>>h5,
        >>>h6
        {
            font-size func(16) !important
            color #444
        }
    }
}
</style>
