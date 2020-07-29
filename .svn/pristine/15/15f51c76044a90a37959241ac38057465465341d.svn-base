<template>
    <div id="SocietyDet">
        <MyHeader :title="'社会组织详情'"/>
        <div v-if="news">
            <div class="details-top">
                <p class="details-title">{{news.title}}</p>
                <div class="details-user">
                    <div>
                        <div class="details-user-name">
                            <div>负责人：{{news.CreateName}}</div>
                            <div class="details-user-time">上传时间：{{news.create_date}}</div>
                        </div>
                    </div>
                    <div>当前人数<span>{{news.read_count}}</span></div>
                </div>
            </div>
            <div class="line"></div>
            <div v-html="content" class="content">{{content}}</div>
            <div class="btn" @click="goSign(news)">加入组织</div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { Button } from 'vant';
    import { getSocial } from "../../apis";
    export default {
        name:'SocietyDet',
        data(){
            return{
                news_id:"",
                news:[],
                content:''
            }
        },
        methods: {
            getSocial(){
                getSocial({
                    url:"/information/getOne",
                    data:{
                        news_id:this.news_id
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        this.news=msg.data[0];
                        this.content=msg.data[0].content
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
            goSign(news){
                this.$router.push({path:'/SocietySign.html',query:{ id:news.news_id}});
            }
        },
        components: {
            MyHeader,
            Button
        },
        created() {
            this.news_id=this.$route.query.id;
            this.getSocial()
        },
    }
</script>

<style scoped lang="stylus">
#SocietyDet {
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
                font-size: 0.5rem;
                color: #999999;
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
    }
    .btn {
        width func(258)
        height func(44)
        background-color: #6CB127
        color #fff
        font-size func(16)
        display flex
        align-items center
        justify-content center
        margin func(74) auto func(148) auto
    }
}
</style>