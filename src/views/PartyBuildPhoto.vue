<template>
    <div id="PartyBuildPhoto">
        <MyHeader :title="'党建相册'"/>
        <div class="photo" v-for="(item , index) in list" :key="index" >
            <div @click="goPhoto(item)">
                <div class="photo-main">
                    <p class="photo-main-title">{{item.photo_titel}}</p>
                    <img :src="item.photo_cover" />
                    <div class="photo-main-details">
                        <div>
                            <div class="photo-details-name">
                                <div>{{item.createUserName}}</div>
                                <div>{{item.create_time}}</div>
                            </div>
                        </div>
                        <div><span>{{item.photoNumber}}</span>张相片</div>
                    </div>
                </div>
            </div>
            <Lines />
        </div>
    </div>
</template>
<script>
    import MyHeader from "../components/public/MyHeader";
    import Lines from "../components/public/Lines";
    import { getPhoto } from "../apis";
    export default {
        name: "PartyBuildPhoto",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            goPhoto(item){
                this.$router.push({path:"/PartyPhotoDetails.html",query:{ id:item.photo_titel_id,cover:item.photo_cover,create_time:item.create_time,photo_titel:item.photo_titel,photo_titel_introduce:item.photo_titel_introduce,photoNumber:item.photoNumber}});
            },

            getPhoto(){
                getPhoto({
                    url:"/Photos/appPhotoTitelList",
                    data:{}
                }).then( msg => {
                    if(~~msg.code === 0){
                        msg = msg.data.list;
                        this.list = msg;
                    }else {
                        this.GToast({message:"获取失败"})
                    }
                })
            },
        },
        components: {
            MyHeader,
            Lines
        },
        created() {
            this.getPhoto()
        },
    }
</script>

<style scoped lang="stylus">
#PartyBuildPhoto {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
.photo{
    border-top: 1px solid #f5f5f5;
    .photo-main-title{
        margin: 0.5rem;
        color: #444;
    }
    .photo-main img{
        width: 14rem;
        height: 7.8rem;
        display: block;
        margin: auto;
    }
    .photo-main-details{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 0.6rem;
        margin-top: 0.4rem;
        >div:last-child{
            color :#999;
            span {
                color:#d33333;
            }
        }
    }
    .photo-details-name div:last-child{
        color: #999;
        font-size:0.5rem;
        margin-top: 0.32rem;
    }
}

</style>