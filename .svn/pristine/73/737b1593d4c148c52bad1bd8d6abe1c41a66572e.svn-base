<template>
    <div :id="div">
        <MyHeader :title="'VR展示详情'"/>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import PhotoSphereViewer from 'photo-sphere-viewer';
    import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
    import { getVR } from "../../apis";
    export default {
        name:'three',
        data(){
            return{
                //图片加载
                imgurl:"",
                div:'div'
            }
        },
        mounted() {
            PhotoSphereViewer({
                // 容器加载
                container:this.div,     //必须的参数：绑定的容器
                panorama:this.imgurl,   //图片路径
                autoload:true,          //自动加载
                time_anim:2000,         //3秒自动播放
                anim_speed:'0.4rpm',    //自动旋转速度
                size:{
                    width:'600',
                    height:'600'
                },
                navbar:true   //显示下面的导航栏

            })
        },
        methods: {
            getVR(){
                getVR({
                    url:'/information/getOne',
                    data:{
                        news_id:this.news_id
                    }
                }).then(msg => {
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        msg = msg.data[0].contentPic;
                        this.imgurl = msg;
                    }else {
                        //获取失败
                        this.GToast({message:"获取新闻失败"});
                    }
                })
            },
        },
        components: {
            MyHeader,
        },
        created() {
            this.news_id=this.$route.query.id;
            this.getVR()
        },
    }
</script>

<style scoped lang="stylus">
#div {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
}
</style>