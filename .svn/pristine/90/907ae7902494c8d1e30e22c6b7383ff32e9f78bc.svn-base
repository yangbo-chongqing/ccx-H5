<template>
    <div id="Selfprotection">
        <MyHeader :title="'自我保护'"/>
        <NewsList v-for="(item , index) in list" :key="index" :news="item"/>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import NewsList from "../../components/public/NewsList";
    import { getNewsClass } from "../../apis";
    export default {
        name: "Selfprotection",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            //获取自我保护列表
            getNewsClass(){
                const data = {
                    news_type:27,
                }
                getNewsClass({data , currentObject: this}).then(msg => {
                    if(~~msg.code === 1 && ~~msg.status === 200){
                        msg = msg.data.list;
                        msg.forEach(item => {
                            if(item.contentPic === "null"){
                                item.showImg = require("../../assets/img/noImg.png");
                            }else {
                                item.showImg = item.contentPic.split(",")[0]
                            }
                            item.isNotice = true;
                        })
                        this.list = msg;
                    }else {
                        this.GToast({message: "获取失败"})
                    }
                }).catch(() => {
                    this.GToast({message: "网络错误"})
                })
            }
        },
        components: {
            MyHeader,
            NewsList,
        },
        created() {
            this.getNewsClass();
        },
    }
</script>

<style scoped lang="stylus">
#Selfprotection {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
</style>
