<template>
    <div class="AgriculturalServer">
        <MyHeader title="农技服务" :back="back"/>
        <Options :modifyOptionFlag="modifyOptionFlag" :optionFlag="optionFlag"/>
        <!--视频-->
        <VideoList v-for="item  in videoList" :key="item.create_date" :video="item" :class="{hidden:optionFlag !== 0 , list: true}"/>
        <!--文章-->
        <ArticleList v-for="item in articleList" :key="item.create_date" :article="item" :class="{hidden:optionFlag !== 1 , list: true}"/>
        <!--专家-->
        <ExpertList v-for="item in expertList" :key="item.create_date" :expert="item" :class="{hidden:optionFlag !== 2 , list: true}"/>
<!--        <ExpertList :class="{hidden:optionFlag !== 2 , list: true}"/>-->
        <Overlay :show="show"  class="over">
            <Loading type="spinner"/>
        </Overlay>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import Options from "../../components/AgriculturalServer/Options";
    import VideoList from "../../components/AgriculturalServer/VideoList";
    import ArticleList from "../../components/AgriculturalServer/ArticleList";
    import ExpertList from "../../components/AgriculturalServer/ExpertList";
    import { Loading  , Overlay} from "vant";
    import { CollectiveStudy , getExportList} from "../../apis";
    export default {
        name: "AgriculturalServer",
        data() {
            return {
                optionFlag: 0,
                videoList:[],
                articleList:[],
                expertList:[],
                show: false
            }
        },
        methods: {
            modifyOptionFlag(flag){
                this.show = true
                this.optionFlag = flag;
                switch (flag) {
                    case 0:
                        window.sessionStorage.setItem('optionFlag',"85");
                        flag = 85;
                        break;
                    case 1:
                        window.sessionStorage.setItem('optionFlag',"84");
                        flag = 84;
                        break;
                    default:
                        window.sessionStorage.setItem("optionFlag","2")
                        flag = false;
                        break;
                }
                if(flag){
                    this.getStudy(flag);
                }else{
                    getExportList({data:{expert_type: 0, from:true} , currentObject: this}).then(msg => {
                        this.show = false
                        if(~~msg.code === 0 && ~~msg.status === 200){
                            msg = msg.data.list;
                            this.expertList = msg;
                        }else {
                            this.GToast({message: "获取失败"})
                        }
                    }).catch(err => {
                        this.show = false
                        this.GToast({message: "网络错误"})
                    })
                }

            },
            getStudy(news_type){
                if(news_type){
                    //当前页面
                    CollectiveStudy({data:{news_type},currentObject:this}).then(msg => {
                        this.show = false
                        if(~~msg.code === 1 && ~~msg.status === 200){
                            msg = msg.data.list;
                            if(~~news_type === 85){
                                this.videoList = msg;
                            }else {
                                this.articleList = msg;
                            }
                        }
                    }).catch(err => {
                        this.show = false
                        this.GToast({message: "网络错误"})
                    })
                }else {
                    //刚刚进来
                    news_type = window.sessionStorage.getItem("optionFlag");
                    if(news_type){
                        //1、返回时
                        if(~~news_type === 2){
                            getExportList({data:{expert_type: 0, from:true} , currentObject: this}).then(msg => {
                                this.show = false
                                if(~~msg.code === 0 && ~~msg.status === 200){
                                    msg = msg.data.list;
                                    this.expertList = msg;
                                }else {
                                    this.articleList = msg;
                                }
                            }).catch(err => {
                                this.show = false
                                this.GToast({message: "网络错误"})
                            })
                        }else {
                            CollectiveStudy({data:{news_type},currentObject:this}).then(msg => {
                                this.show = false
                                if(~~msg.code === 1 && ~~msg.status === 200){
                                    msg = msg.data.list;
                                    if(~~news_type === 85){
                                        this.videoList = msg;
                                    }else {
                                        this.articleList = msg;
                                    }
                                }else {
                                    this.articleList = msg;
                                }
                            }).catch(err => {
                                this.show = false
                                this.GToast({message: "网络错误"})
                            })
                        }
                    }else {
                        //2、第一次
                        news_type = 85;
                        CollectiveStudy({data:{news_type},currentObject:this}).then(msg => {
                            this.show = false
                            if(~~msg.code === 1 && ~~msg.status === 200){
                                msg = msg.data.list;
                                this.videoList = msg;
                            }else {
                                this.articleList = msg;
                            }
                        }).catch(err => {
                            this.show = false
                            this.GToast({message: "网络错误"})
                        })
                    }
                }
            },
            back(){
                window.sessionStorage.removeItem("optionFlag");
            }
        },
        components: {
            MyHeader,
            Options,
            VideoList,
            ArticleList,
            Loading,
            Overlay,
            ExpertList
        },
        created() {
            const flag = window.sessionStorage.getItem("optionFlag")

            switch (~~flag) {
                case 2: //专家
                    this.optionFlag = 2;
                    break;
                case 84://文档
                    this.optionFlag = 1;
                    break;

                default ://视频
                    this.optionFlag = 0;
                    break;
            }
            this.getStudy();
        },
        mounted() {
        },
        filters: {},
        computed: {},
        watch: {}
    }

</script>

<style scoped lang="stylus">
    .AgriculturalServer {
        width 100%
        min-height 100vh
        padding-top func(44)
        box-sizing border-box
        >.list {
            transition all .5s
            &.hidden {
                opacity 0
                height 0
                overflow hidden
            }
        }
        >>> .over {
            display flex
            align-items center
            justify-content center
            z-index 2
        }
    }
</style>
