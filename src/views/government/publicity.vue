<template>
    <div id="publicity">
        <MyHeader :title="'政策宣传'"/>
        <Lines />
        <NewsList v-for="(item , index) in list" :key="index" :news="item"/>
    </div>
</template>

<script>
    import MyHeader from "@/components/public/MyHeader";
    import Lines from "@/components/public/Lines";
    import NewsList from "@/components/public/NewsList";
    import imageList from "@/components/public/imageList";
    import textList from "@/components/public/textList";
    import {getNewsClass} from "../../apis";
    export default {
        name: "publicity",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            getList(){
                getNewsClass({
                    data:{
                        news_type:33
                    },
                    currentObject: this
                }).then( msg => {
                    if(~~msg.status === 200 && ~~msg.code === 1){
                        msg = msg.data.list
                        msg.forEach(item => {
                            if(item.contentPic && item.contentPic !== "null"){
                                item.showImg = item.contentPic.split(",")[0];
                                item.typeName = "政务";
                            }else {
                                item.typeName = "政务";
                                item.showImg = require("../../assets/img/noImg.png");
                            }
                            item.isNotice = true;
                        })
                        this.list = msg
                    }else {
                        this.GToast({message:"获取失败"})
                    }
                }).catch(err =>{
                    this.GToast({message:"网络错误"})
                })
            }
        },
        components: {
            MyHeader,
            Lines,
            NewsList,
            imageList,
            textList
        },
        created() {
            this.getList();
        },
    }
</script>

<style scoped lang="stylus">
#publicity {
    width 100%
    padding-top func(44)
    box-sizing border-box
}
</style>
