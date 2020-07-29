<template>
    <div id="Map">
        <MyHeader :title="'景区导航'"/>
        <baidu-map  class="map" :center="center" :zoom="zoom"  @click="updatemap" @ready="handler" >
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-local-search :keyword="maptitle" :auto-viewport="true" :location="location" ></bm-local-search>

            <bm-panorama></bm-panorama>
            <bm-marker :position="center" :dragging="true">
                <bm-info-window :show="true">{{maptitle}}</bm-info-window>
            </bm-marker>
        </baidu-map>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { Row, Col,Button } from 'vant';
    import { getMap } from "../../apis";
    export default {
        name: "Map",
        data() {
            return {
                // 地图初始化的位置
                center: {lng: 116.39852, lat:39.91405},
                // 地图内的大小
                zoom: 14,
                // 这个是选择某个点的提醒以及搜索附近的东西的依据
                maptitle: "",
                // 这个是搜索下的东西
                location: '',
                // 这个是选择搜索列表中数据的title以及经纬度
                locationdata: {
                    title: "",
                    center: ''
                },
                geolocation: "",
                biaoji: false
            }
        },
        methods: {
            handler ({BMap, map}) {
                window.map = map; //注册为全局
                var that = this;  // map方法中的this指向不对。所有申明一个。。小细节的东西
                // 刚进入页面中的定位，需要向用户授权
                var geolocation = new BMap.Geolocation();
                this.geolocation = geolocation;
                geolocation.enableSDKLocation();
                geolocation.getCurrentPosition(function(r){

                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        // 把得到的经纬度传给map，就实现了第一步我们的定位
                        that.center = {
                            lng: r.point.lng ,
                            lat: r.point.lat
                        }
                        // 把获取到的位置传给所需要的搜索已经提示里面
                        that.maptitle =r.address.province + r.address.city +  r.address.district + r.address.street;
                        //   当用户拒绝该授权的时候，依然执行
                        if(r.accuracy==null){
                            // alert('accuracy null:'+r.accuracy);
                            //用户决绝地理位置授权
                            return;
                        }
                    }else {
                        console.log('failed'+this.getStatus());
                    }
                },{enableHighAccuracy: true})
            },
            // 移动开始
            movemapstart(){
                this.biaoji = false;
            },
            // 当用户移动选择某一个点
            updatemap(e){
                // 把localtion值清空
                // this.location = {
                //     title: "",
                //      center: ""
                // }
                var that = this;
                // 先赋值经纬度
                const { lng, lat } = e.target.getCenter();
                that.center = {
                    lng ,
                    lat
                }
                // 然后根据经纬度查询地图的具体位置
                var geoc = new BMap.Geocoder();
                geoc.getLocation(e.target.getCenter(), function(rs){
                    // console.log(rs)
                    // 然后赋值给搜索的条件
                    that.locationdata.title = rs.address;
                    that.locationdata.center = e.target.getCenter();
                    that.maptitle = rs.address;
                },{enableHighAccuracy: true});

            },
            // //   选择localtion的值
            // getlocalsearch(e){
            //     // console.log(e)
            //     // this.maptitle = e.address

            //     this.locationdata.title = e.address + e.title;
            //     this.locationdata.center = e.point;
            // },
            // // 确定该信息然后存在session中
            // getmapdamodata(){
            //     var that = this;
            //     if(this.locationdata.title == '' && this.locationdata.center == ''){
            //         var mapdata = {
            //             title: that.maptitle,
            //             center: this.center

            //         }
            //         sessionStorage.setItem('mapdata', JSON.stringify(mapdata))
            //     }else{
            //         sessionStorage.setItem('mapdata', JSON.stringify(this.locationdata))
            //     }


            //     this.$router.go(-1);
            // },
            // 获取地图
            getMap(){
                getMap({
                    url:"/industry/map/getList",
                    data:{}
                }).then(msg => {
                    if(~~msg.code === 0){
                        let list = []
                        msg.data.list.forEach(val => {
                            list.push({
                                latitude: val.latitude,
                                longitude: val.longitude,
                                name: val.enterprise_name,
                            })
                        })
                        this.locationdata.center=list;
                        this.locationdata.title=list.name;
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
        },
        components: {
            MyHeader,
            Row,
            Col
        },
        created() {
            this.getMap()
        },
    }
</script>

<style scoped lang="stylus">
    #Map {
        width 100%
        min-height 100vh
        box-sizing  border-box;
        padding-top 2rem;
        > img {
            width:100%;
        }
        .map {
            width: 100%;
            height: 6.6667rem;
        }
        .anchorBL {
            display:none
        }
        .map_title{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.1533rem;
            .map_title_span{
                font-size: 0.29rem;
            }
        }
    }
</style>
