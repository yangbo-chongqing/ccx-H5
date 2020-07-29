<template>
    <div id="villageIntroduction">
        <MyHeader :title="'乡村介绍'"/>
        <ul>
            <li v-for="(item , index) in newsList" :key="index" @click="goNews(item)">
                <NewsList v-if="item.showImg" :news="item"/>
                <textList v-else :news="item"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import NewsList from "../../components/public/NewsList";
    import textList from "../../components/public/textList";
    import { getNewsClass } from "../../apis";
    export default {
        name: "villageIntroduction",
        data() {
            return {
                newsList:null
            }
        },
        methods: {
            getNewsClass(){
                const data = {
                    pageSize:10,
                    pageCurrent:1,
                    news_type:44
                }
                getNewsClass({
                    data,
                    currentObject:this
                }).then(msg => {
                    if(~~msg.code === 1 && ~~msg.status === 200){
                        msg = msg.data.list;
                        msg.forEach(item => {
                            if(item.contentPic !== "null" ){
                                item.showImg = item.contentPic.split(",")[0];
                                item.typeName = "乡镇介绍"
                            }
                        })
                        this.newsList = msg
                    }else {
                        //获取失败
                        this.GToast({message:"获取新闻失败"});
                    }
                })
            },
            goNews(item){
                // this.$router.push({path:'/villageDetails.html',query:{ id:item.news_id}});
            },
        },
        components: {
            MyHeader,
            NewsList,
            textList
        },
        created() {
            this.getNewsClass()
        },
    }
</script>

<style scoped lang="stylus">
#villageIntroduction {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
</style>
