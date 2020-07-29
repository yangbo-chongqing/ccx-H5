<template>
    <div id="PartyAffairs">
        <MyHeader :title="'党务公开'"/>
        <ul>
            <li v-for="(item , index) in newsList" :key="index">
                <NewsList v-if="item.showImg" :news="item"/>
                <textList v-else :news="item"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import NewsList from "../components/public/NewsList";
    import textList from "@/components/public/textList";
    import MyHeader from "../components/public/MyHeader";
    import { getNewsClass } from "../apis";
    export default {
        name: "PartyAffairs",
        data() {
            return {
                newsList:null
            }
        },
        methods: {
            getNewsClass(news_type = 19){
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
                        if(news_type === 19){
                            msg.forEach(item => {
                                if(item.contentPic !== "null" ){
                                    item.showImg = item.contentPic.split(",")[0];
                                    item.typeName = "党务"
                                }
                            })
                        }
                        this.newsList = msg
                    }else {
                        //获取失败
                        this.GToast({message:"获取新闻失败"});
                    }
                })
            },
        },
        components: {
            NewsList,
            textList,
            MyHeader
        },
        created() {
            this.getNewsClass()
        },
    }
</script>

<style scoped lang="stylus">
#PartyAffairs {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
</style>