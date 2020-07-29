<template>
    <div id="archives">
        <MyHeader :title="'扶贫过程'"/>
        <div class="proBox" v-for="(item , index) in list" :key="index" @click="toNewdet(item)">
            <div class="imgBox"><img :src="item.contentPic" /></div>
            <div class="textBox">
            <div>{{item.title}}</div>
            <div class="oneimg">
                <div><img src="http://www.mlxc365.com/images/sxccx/icon/v_location.png" /></div>
                <div class="text">{{item.areaName}}</div>
            </div>
            <div class="oneimg">
                <div><img src="http://www.mlxc365.com/images/sxccx/icon/ic_villagedetail_4.png" /></div>
                <div class="text">{{item.create_date}}</div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getArchives } from "../../apis";
    export default {
        name: "archives",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            getArchives(){
                getArchives({
                    url:"/information/query",
                    data:{
                        news_type:'21',
                        del_lag:0,
                        house_id:this.id
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        this.list=msg.data.list;
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
            toNewdet(item){
                this.$router.push({path:'/processDetails.html',query:{ id:item.news_id}});
            },
        },
        components: {
            MyHeader,
        },
        created() {
            this.id=this.$route.query.id;
            this.getArchives()
        },
    }
</script>

<style scoped lang="stylus">
#archives {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .proBox{
        width: 100%;
        display: flex;
        flex-direction: row;
        background: #ffffff;
        padding: 0.6rem 0.5rem 0.8rem 0.5rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5; 
        .imgBox{
            width: 4.4rem;
            height: 3.3rem;
            border-radius 3px;
            overflow: hidden;
            display: flex;
            align-items: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .textBox{
            margin-left: 0.4rem;
            div:nth-child(1){
                color: #444444;
                font-size: 0.6rem;
                margin-top: 0.3rem;
            }
            .oneimg{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-top: 0.4rem;
                .text{
                    color: #8A8A8A;
                    font-size: 0.4rem;
                }
                div:nth-child(1){
                    width: 0.4rem;
                    height: 0.4rem;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    margin-right: 0.2rem;
                    position: relative;
                    top: -0.1rem;
                }
                div img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
