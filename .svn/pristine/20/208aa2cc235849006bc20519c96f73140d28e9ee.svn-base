<template>
    <div class="villager">
        <MyHeader :title="'村民自治'"/>
        <NewsList v-for="(item,index) in list" :key="index" :news="item"/>
        <img src="../../assets/img/noData.png" v-show="list.length === 0">
    </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import NewsList from "../../components/public/NewsList";
import {getNewsClass} from "../../apis";
export default {
    name: 'villager',
    components: {
        MyHeader,
        NewsList
    },
    data(){
        return {
            list:[]
        }
    },
    methods: {
        getProtocolList(){
            getNewsClass({
                data:{
                    news_type: 30
                },
                currentObject: this
            }).then( msg => {
                if(~~msg.code === 1 && ~~msg.status === 200){
                    msg = msg.data.list;
                    msg.forEach(item => {
                        if(item.contentPic && item.contentPic !== "null" ){
                            item.showImg = item.contentPic.split(",")[0];
                        }else {
                            item.showImg = require("../../assets/img/noImg.png");
                        }
                        item.isNotice = true;
                    });
                    this.list = msg;
                }
            })
        },
        goNews(news_id){
            this.switchPage({
                pageRouter:"/NewsDetails.html",
                params:{
                    news_id
                }
            })
        }

    },
    created() {
        this.getProtocolList();
    },
    filters:{
        formatTime(date){
            date = new Date(date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate() ;
            return `${year}年${month}月${day}日`;
        },
    }
}
</script>
<style lang="stylus" scoped>
.villager
    width 100%
    min-height 100vh
    padding-top func(44)
    box-sizing border-box
    > img {
        max-width 100%
    }
</style>
