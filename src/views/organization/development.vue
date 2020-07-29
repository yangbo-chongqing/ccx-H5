<template>
    <div id="development">
        <MyHeader :title="'党员发展'"/>
        <div class="all">
            <div class="partyimg">
                <img :src="img" />
                <div>姓名：{{name}}</div>
            </div>
            <div class="one" v-for="(item , index) in list" :key="index">
                <div class="line"></div>
                <div class="bor ">
                    <div class="left">
                        <p>{{item.gorwInfo}}</p>
                        <p>{{item.startTime}}</p>
                    </div>
                    <div class="circle"></div>
                    <div class="right">
                        <p>{{item.gorwInfo}}</p>
                        <p>{{item.startTime}}</p>
                    </div>
                    <div class="centerline"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getLine } from "../../apis";
    export default {
        name:'development',
        data(){
            return{
                img:"",
                name:"",
                list:[]
            }
        },
        methods: {
            getLine(){
                getLine({
                    url:"/handan/grow/list",
                    data:{
                        type:'app'
                    }
                }).then(msg => {
                    if(~~msg.code === 200){
                        this.list=msg.data.list[0].growInfoList,
                        this.img=msg.data.list[0].mebImg,
                        this.name=msg.data.list[0].mebName
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            },
        },
        components: {
            MyHeader
        },
        created() {
            this.getLine()
        },
    }
</script>

<style scoped lang="stylus">
#development {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .all{
        padding:1rem;
    }
    .partyimg{
        width:5rem;
        height:5rem;
        border-radius: 50%;
        box-sizing: border-box;
        /* border:8rpx solid #2BDBDB; */
        margin: 0 auto;
        position: relative;
        >img{
            width:3rem;
            height:3rem;
            border-radius: 50%;
            display: block;
            position: absolute;
            top:40%;
            left:50%;
            transform: translate(-50%,-50%);
        }
        >div{
            position: absolute;
            top:80%;
            left:20%;
            color: #444;
            font-size: 0.64rem;
        }
    }
    .one{
        width:80%;
        margin: 0 auto;
    }
    .line{
        width:2px;
        height:2rem;
        background: #DADADA;
        margin: 0 auto;
    }
    .bor{
        display: flex;
        align-items: center;
        justify-content: center;
        height:1.5rem;
        position: relative;
    }
    .one:nth-of-type(2n+1)>.bor>.left{
        visibility: hidden;
    }
    .one:nth-of-type(2n)>.bor>.right{
        visibility: hidden;
    }
    .centerline{
        width:2px;
        background:#32E5F9;
        height:1.5rem;
        position: absolute;
        top:0;
        left:50%;
        transform: translate(-50%); 
    }
    .one:last-child .centerline{
        height:1rem;
    }
    .circle{
        width:1rem;
        height:1rem;
        background:#32E5F9;
        border-radius: 50%;
        margin:0 30rpx; 
        flex-shrink: 0;
    }
    .left,.right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .vis{
        visibility: hidden;
    }
    .left>p:first-child,.right>p:first-child{
        font-size:0.56rem;
        color:#444;
    }
    .left>p:last-child,.right>p:last-child{
        font-size:0.5rem;
        color:#999999;
    }
}
</style>