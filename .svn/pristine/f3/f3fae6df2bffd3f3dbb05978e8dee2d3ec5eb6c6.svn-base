<template>
    <div id="villageDetails">
        <MyHeader :title="'乡村介绍详情'"/>
        <div>
            <div class="details-top">
                <p class="details-title">{{title}}</p>
                <div class="details-user">
                    <div>
                        <div class="details-user-name">
                            <div>{{name}}</div>
                            <div class="details-user-time">{{time}}</div>
                        </div>
                    </div>
                    <div><span>{{stage}}</span>次浏览</div>
                </div>
            </div>
            <div class="line"></div>
            <div v-html="content" class="content">{{content}}</div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getDetails } from "../../apis";
    export default {
        name:'villageDetails',
        data(){
            return{
                news_id:"",
                title:"",
                name:"",
                time:"",
                stage:"",
                content:''
            }
        },
        methods: {
            getDetails(){
                getDetails({
                    url:"/information/getOne",
                    data:{
                        news_id:this.news_id
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        this.title=msg.data[0].title;
                        this.name=msg.data[0].CreateName;
                        this.time=msg.data[0].create_date;
                        this.stage=msg.data[0].read_count;
                        this.content=msg.data[0].content
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
        },
        components: {
            MyHeader
        },
        created() {
            this.news_id=this.$route.query.id;
            this.getDetails()
        },
    }
</script>

<style scoped lang="stylus">
#villageDetails {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .details-top{
        margin: 0.3rem 0.6rem 0.4rem 0.6rem;
        .details-title{
            font-family: PingFang SC;
            font-size: 0.64rem;
            color: #000;
            font-weight: bold;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
    .details-user{
        margin-top: 0.6rem;
        .details-user-name{
            display: inline-block;
            margin-left: 0.5rem;
            >div:first-child{
                font-size: 0.6rem;
                color: #000;
                margin-bottom: 0.3rem;
            }
            .details-user-time{
                font-size: 0.4rem;
                color: #999;
            }
        }
        >div:first-child,
        >div:last-child{
            display: inline-block;
        }
        >div:last-child{
            float: right;
            color: #999;
            font-size: 0.4rem;
            >span{
                color: #d33333;
            }
        }
    }
    .line{
        width: 85%;
        height: 1px;
        margin: auto;
        background: #f5f5f5;
        padding: 0 0.6rem;
    }
    .content{
        padding 0.5rem 0.6rem 0 0.6rem;
        text-indent:2em;
    }
}
</style>