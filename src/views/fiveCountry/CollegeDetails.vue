<template>
    <div id="CollegeDetails">
        <MyHeader :title="'大学生详情'"/>
        <div class="attractions">
            <div class="item">
                <img class="left" :src="list.showImg"/>
                <div class="right">
                    <div class="title single">姓名：{{list.able_name}}</div>
                    <div class="title">电话：{{list.tel}}</div>
                    <div class="about multiLine">学历：{{list.education_background}}</div>
                    <div class="numberPeople">类型：#{{list.label}}</div>
                </div>
            </div>
            <div class="bottom" v-html="list.able_content"/>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { Swipe, SwipeItem,Dialog } from 'vant';
    import {getCollegeDetails} from "@/apis";
    export default {
        name: "CollegeDetails",
        data() {
            return {
                list:{},
            }
        },
        methods: {
            getCollegeDetails(){
                getCollegeDetails({
                    url:"/able/person/getOne",
                    data:{
                        able_id:this.$route.query.id
                    }
                }).then(msg => {
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        msg = msg.data;
                        if(msg.able_pic && msg.able_pic !== "null"){
                            msg.showImg = msg.able_pic.split(",")[0];
                        }else {
                            msg.showImg = require("../../assets/img/noImg.png");
                        }
                        this.list = msg;
                    }else {
                        //获取失败
                        this.GToast({message:"获取新闻失败"});
                    }
                })
            },
        },
        components: {
            MyHeader,
            Dialog
        },
        created() {
            this.getCollegeDetails()
        },
    }
</script>

<style scoped lang="stylus">
#CollegeDetails  {
    width 100%
    min-height 100vh;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .attractions {
        width: 100%;
        min-height: 15rem;
        background-color: #fff;
        box-sizing: border-box;
        .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            img {
                height: 1rem;
                width: 60%;
            }
            div {
                font-size: 0.5rem;
                color: #aaa;
            }
            p:nth-child(2){
                color: #6CB127;
                margin-left: 0.4rem;
            }
        }
        .item {
            display: flex;
            box-sizing: border-box;
            position: relative;
            .left {
                width: 31%;
                height: 3.55rem;
                padding: 0.5rem;
            }
            .right {
                padding: 0.5rem 0;
                width: 55%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                .title {
                    font-size: 0.5rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .about{
                    font-size: 0.5rem;
                    color: #444;
                }
                .numberPeople{
                    font-size: 0.5rem;
                    display: flex;
                    color: #6cb127;
                    div{
                        color: #ff0000;
                    }
                }
                div{
                    margin-top 0.2rem
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
    .multiLine{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .next {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        line-height: func(43);
        text-align: center;
        font-size: func(16);
        color: #fff;
        background: #6CB127;
    }
}
</style>
