<template>
    <div id="EstateMapDetails">
        <MyHeader title="产业详情"/>
        <img src="../../assets/img/map/banner.png" alt="">
        <main>
            <h3 v-text="obj.enterprise_name"/>
            <p><i class="iconfont">&#xe62d;</i><span v-text="obj.address"/></p>
            <div class="map" @click="mapNavigation">
                查看地图
            </div>
            <div class="info">
                <h4>主体信息</h4>
                <p>
                    <label>
                        <i>主</i>
                        <i>营</i>
                        <i>范</i>
                        <i>围</i>
                    </label>：
                    <span v-text="obj.main_scope"/>
                </p>
                <p>
                    <label>
                        <i>库</i>
                        <i>存</i>
                    </label>：
                    <span v-text="obj.inventory" class="green"/>
                </p>
                <p>
                    <label>
                        <i>价</i>
                        <i>格</i>
                    </label>：
                    <span  v-text="obj.price"/>
                </p>
                <p>
                    <label>
                        <i>联</i>
                        <i>系</i>
                        <i>人</i>
                    </label>：
                    <span v-text="obj.contact"/>
                </p>
                <p>
                    <label>
                        <i>联</i>
                        <i>系</i>
                        <i>电</i>
                        <i>话</i>
                    </label>：
                    <span v-text="obj.tel"  class="green" />
                    <i class="iconfont" @click="call">&#xe6a9;</i>
                </p>
            </div>
            <div class="content" v-html="obj.enterprise_content" />
        </main>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import {getEstateDetails} from "../../apis";
    import { Dialog } from 'vant';
    export default {
        name: "EstateMapDetails",
        data(){
            return {
                obj : {}
            }
        },
        components:{
            MyHeader
        },
        methods:{
            //拨打电话
            call(){
                const tel = this.obj.tel;
                Dialog.confirm({
                    title: '温馨提示',
                    message: '是否确定要拨打？' + tel
                }).then(() => {
                    window.location.href = "tel://" + tel
                }).catch(() => {
                    // on cancel
                });
            },
            //进行地图导航
            mapNavigation(){
                Dialog.confirm({
                    title: '温馨提示',
                    message: '是否确定要导航到？' + this.obj.enterprise_name+ '（请确保目的地正确性）'
                }).then(() => {
                    window.location.href = `http://api.map.baidu.com/geocoder?address=${this.obj.enterprise_name}&output=html&src=webapp.baidu.openAPIdemo`;
                }).catch(() => {
                    // on cancel
                });
            }
        },
        created() {
            const ent_id = this.decodeBase64(this.$route.query).ent_id
            getEstateDetails({data:{ent_id}}).then(msg => {
                if(~~msg.code === 0 && ~~msg.status === 200){
                    this.obj = msg.data;
                }else {
                    this.GToast({message:"数据获取失败"})
                }
            }).catch(err => {
                this.GToast({message:"网络错误"})
            })
        }
    }
</script>

<style scoped lang="stylus">
    #EstateMapDetails {
        width 100%
        box-sizing border-box
        padding-top func(44)
        > img {
            max-width 100%
            display block
            margin:0 auto func(16)
        }
        > main {
            box-sizing border-box
            padding 0 func(15)
            > h3 {
                font-weight 400
                font-size func(14)
                margin-bottom func(12)
            }
            > p {
                > i {
                    font-size func(20)
                    color #6CB127
                    margin-right func(15)
                }
            }
            >.map {
                color #16DFA9
                box-sizing border-box
                padding-left: func(35);
                font-size func(12)
                padding-bottom func(16)
                border-bottom func(1) solid #f5f5f5
                margin-bottom func(12)
            }
            > .info {
                width 100%
                box-sizing border-box
                padding-bottom func(16)
                border-bottom func(1) solid #f5f5f5
                margin-bottom func(20)
                > h4 {
                    width 100%
                    margin-bottom func(12)
                    font-weight 400
                }
                > p {
                    width 100%
                    box-sizing border-box
                    padding-left func(35);
                    display flex
                    align-items center
                    position relative
                    >label {
                        width func(60)
                        display flex
                        align-items center
                        justify-content space-between
                        > i {
                            font-size func(14)
                            font-style normal
                        }
                    }
                    > span {
                        font-size func(14)
                        &.green {
                            color #6CB127
                        }
                    }
                    > i {
                        position absolute
                        top 50%;
                        right 0
                        transform translateY(-50%)
                        color #6CB127
                    }
                }
            }
            > .content {
                width 100%
                >>> * {
                    font-size func(14)!important
                    color #444
                }
                >>> img {
                    max-width 100%!important
                }
                >>> div ,
                >>> p {
                    text-indent 2em!important
                }
            }
        }
    }
</style>