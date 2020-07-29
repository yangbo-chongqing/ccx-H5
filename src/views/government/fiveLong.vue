<template>
    <div class="fiveLong">
        <MyHeader :title="'五长制度'"/>
        <NewsList v-for="(item,index) in list" :key="index" :news="item"/>
        <img src="../../assets/img/noData.png" v-show="list.length === 0">
    </div>

</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import NewsList from "../../components/public/NewsList";
import {getNewsClass} from "../../apis";
export default {
    name: 'fiveLong',
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
                    news_type: 31
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
        }
    },
    created() {
        this.getProtocolList();
    }

}
</script>
<style lang="stylus" scoped>
.fiveLong
    width 100%
    min-height 100vh
    padding-top func(44)
    > img {
        max-width 100%
    }
</style>
