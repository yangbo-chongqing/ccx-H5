<template>
    <div id="SearchConvenience">
        <MyHeader :title="'便民查询'" :color="false"/>
        <img src="../../assets/img/convenience/searchBanner.png" />
        <Tools :toolsList="toolsList" :openPage="openPage"/>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import Tools from "../../components/convenience/SearchConvenience/Tools";
    export default {
        name: "SearchConvenience",
        data() {
            return {
                toolsList:[
                    {
                        link:"https://map.baidu.com/mobile/webapp/index/index/",
                        title:"公交线路",
                        img: window.baseImgUrl + "bm_1.png"
                    },
                    {
                        link:"http://www.weather.com.cn/weather/101040100.shtml",
                        title:"天气预报",
                        img: window.baseImgUrl + "bm_2.png"
                    },
                    {
                        link:"http://rlsbj.cq.gov.cn/",
                        title:"社保查询",
                        img: window.baseImgUrl + "bm_3.png"
                    },
                    {
                        link:"http://chaxun.weizhang8.cn/",
                        title:"违章查询",
                        img: window.baseImgUrl + "bm_4.png"
                    },
                    {
                        link:"http://laohuangli.net/",
                        title:"老黄历",
                        img: window.baseImgUrl + "bm_5.png"
                    },
                    {
                        link:"https://www.bestpay.com.cn/mobileclient?y7bRbP=cr7bqGqFDfLFDfLFD.tnsmMNpYhlkmvRDSw2R5fIHQ3F",
                        title:"翼支付",
                        img: window.baseImgUrl + "bm_6.png"
                    },
                    {
                        link:"https://www.ctrip.com/",
                        title:"车票",
                        img: window.baseImgUrl + "bm_7.png"
                    },
                    {
                        link:"https://www.kuaidi100.com/",
                        title:"快递查询",
                        img: window.baseImgUrl + "bm_8.png"
                    }
                ]
            }
        },
        methods: {
            openPage(link){
                window.open(link,"_self")
            }
        },
        components: {
            MyHeader,
            Tools
        },
        created() {
        },
    }
</script>

<style scoped lang="stylus">
#SearchConvenience {
    width 100%
    box-sizing border-box
    padding-top func(44)
    > img {
        width:100%
    }
}
</style>
