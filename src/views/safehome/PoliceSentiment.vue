<template>
    <div id="PoliceSentiment">
        <MyHeader :title="'警情通报'"/>
        <NewsList v-for="(item , index) in list" :key="index" :news="item"/>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import NewsList from "../../components/public/NewsList";
    import {getNewsClass} from "../../apis";
    export default {
        name: "PoliceSentiment",
        data() {
            return {
                list:[]
            }
        },
        methods: {},
        components: {
            MyHeader,
            NewsList,
        },
        created() {
            const data = {
                news_type:29
            }
            getNewsClass({data ,currentObject:this}).then(msg => {
                if(~~msg.code === 1 && ~~msg.status === 200){
                    msg = msg.data.list;
                    msg.forEach(item => {
                        if(!item.contentPic || item.contentPic === "null"){
                            item.showImg = require("../../assets/img/noImg.png");
                        }else{
                            item.showImg = item.contentPic.split(",")[0]
                        }
                        item.isNotice = true;
                    })
                    this.list = msg;
                }else {
                    this.GToast({message:"获取列表失败"})
                }
            }).catch(err=> {
                this.GToast({message:"网络错误"})
            })
        },
    }
</script>

<style scoped lang="stylus">
#PoliceSentiment {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
</style>
