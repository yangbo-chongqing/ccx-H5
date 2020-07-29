<template>
    <div id="Law">
        <MyHeader :title="'法律常识'"/>
        <div>
            <div class="list-main" v-for="(item , index) in list" :key="index" @click="goDetails(item)">
                <img :src="item.contentPic" />
                <div class="list-main-right">
                    <p>{{item.title}}</p>
                    <div>{{item.introduction}}</div>
                    <div class="other">
                        <div><i class="iconfont red">&#xe619;</i>{{item.read_count}}人查看</div>
                        <div><i class="iconfont green">&#xe671;</i>{{item.create_date |formatTime}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getNewsClass } from "../../apis";
    export default {
        name: "Law",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            getNewsClass(news_type = 39){
                if(this.news_type){
                    news_type = this.news_type;
                }

                const data = {
                    pageSize:10,
                    pageCurrent:1,
                    news_type
                }
                getNewsClass({
                    data,
                    currentObject:this
                }).then(msg => {
                    if(~~msg.code === 1 && ~~msg.status === 200){
                        msg = msg.data.list;
                        if(news_type === 39){
                            this.list=msg
                        }
                    }else {
                        //获取失败
                        this.GToast({message:"获取新闻失败"});
                    }
                })
            },
            goDetails(item){
                this.$router.push({path:'/Lawdetails.html',query:{ id:item.news_id}});
            }
        },
        filters:{
            formatTime(date){
                date = new Date(date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate() ;
                return `${year}年${month}月${day}日`;
            }
        },
        components: {
            MyHeader,
        },
        created() {
            this.getNewsClass()
        },
    }
</script>

<style scoped lang="stylus">
#Law {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .list-main{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding:0.6rem;
        border-bottom:1px solid #f5f5f5;
        >img{
            width:4.5rem;
            height:4.5rem;
            display: block;
            margin-right: 0.4rem;
            border-radius 0.2rem;
        }
        .list-main-right{
            width: 70%;
            height: 4rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >p{
                width: 100%;
                font-family: PingFang SC;
                font-size: 0.6rem;
                line-height: 0.8rem;
                font-weight 600;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color:rgba(34, 34, 34, 1);
            }
            >div:nth-child(2){
                font-size: 0.5rem;
                color: #8A8A8A;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .other{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-size: 0.4rem;
                line-height: 0.5rem;
                >div{
                    color: #8A8A8A;
                    font-size 0.45rem;
                }
            }
            .iconfont{
                font-size: 0.6rem;
                vertical-align: middle;
                margin-right 0.3rem;
            }
            .red{
                color #D33333;
            }
            .green{
                color #16DFA9;
            }
        }
    }
}
</style>
