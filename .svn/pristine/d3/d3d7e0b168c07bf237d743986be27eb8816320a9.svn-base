<template>
    <div id="OrgConstruction">
        <MyHeader :title="'组织建设'"/>
        <img src="http://www.mlxc365.com/images/sxccx/icon/zzjs_bg.png" alt="">
        <Tools />
        <Lines />
        <Options />
        <ul>
            <li v-for="(item , index) in newsList" :key="index">
                <NewsList v-if="item.showImg" :news="item"/>
                <textList v-else :news="item"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import Tools from "../../components/organization/Tools";
    import MyHeader from "../../components/public/MyHeader";
    import Lines from "../../components/public/Lines";
    import NewsList from "../../components/public/NewsList";
    import Options from "../../components/organization/Options";
    import textList from "../../components/public/textList";
    import { getNewsClass } from "../../apis";
    export default {
        name: "OrgConstruction",
        data() {
            return {
                newsList:null 
            }
        },
        methods: {
            getNewsClass(news_type = 18){
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
                        if(news_type === 18){
                            msg.forEach(item => {
                                if(item.contentPic !== "null" ){
                                    item.showImg = item.contentPic.split(",")[0];
                                    item.typeName = "先锋模范"
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
            Tools,
            MyHeader,
            Lines,
            NewsList,
            Options,
            textList
        },
        created() {
            this.getNewsClass()
        },
    }
</script>

<style scoped lang="stylus">
#OrgConstruction {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
</style>
