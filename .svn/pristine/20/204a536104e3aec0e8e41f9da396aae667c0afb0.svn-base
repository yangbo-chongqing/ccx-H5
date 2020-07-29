<template>
    <div id="projectDetails">
        <MyHeader :title="'扶贫项目详情'"/>
        <div>
            <div class="details-top">
                <p class="details-title">{{news.project_name}}</p>
                <div class="details-user">
                    <div>
                        <div class="textbox">
                            <div class="onetext">起止时间: <span>{{news.project_as }}~{{ news.project_af }}</span></div>
                            <div class="twotext">类型: <span>{{news.typeName }}</span></div>
                            <div class="tretext">进度: 
                            <div class="trebox"> 
                                <div :style="'width:'+news.project_progress + '%'"></div>
                            </div>
                            {{ news.project_progress }}%
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- <span>{{news.stage}}</span>次浏览 -->
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div v-html="content" class="content">{{content}}</div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getInfo } from "../../apis";
    export default {
        name:'projectDetails',
        data(){
            return{
                project_id:"",
                news:[],
                content:''
            }
        },
        methods: {
            getInfo(){
                getInfo({
                    url:"/country/projectHelpPoor/getOne",
                    data:{
                        project_id:this.project_id
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        this.news=msg.data[0];
                        this.content=msg.data[0].project_content;
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
            this.project_id=this.$route.query.id;
            this.getInfo()
        },
    }
</script>

<style scoped lang="stylus">
#projectDetails {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .details-top{
        margin: 0rem 0.6rem 0.4rem 0.6rem;
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
            margin-top 0.5rem;
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
    .textbox{
            margin-top: 0.5rem;
            .onetext{
                font-size: 0.6rem;
                color: #444444;
                margin-bottom: 0.6rem;
            }
            .twotext{
                font-size: 0.6rem;
                color: #444444;
                margin-bottom: 0.6rem;
                span{
                    color: #6CB127;
                }
            }
            .tretext{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.5rem;
                color: #444444;
                margin-bottom: 0.6rem;
                .trebox{
                    width: 6rem;
                    height: 0.1rem;
                    background: #DADADA;
                    border-radius: 0.1rem;
                    div{
                        width: 50%;
                        height: 100%;
                        background: #6CB127;  
                    }
                }
            }
        }
}
</style>