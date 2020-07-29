<template>
    <div class="taskHandle">
        <MyHeader :title="'任务处理'"/>
        <Lines />
        <div class="titBox"><p>*</p><span>内容说明</span></div>
        <div class="textareaBox">
            <textarea rows="5" placeholder="请输入详细说明" v-model="mission_result_content" />
        </div>
        <Lines />
        <div class="titBox"><p>*</p><span>图片上传</span></div>
        <div class="upImg">
            <Uploader v-model="fileList"
                      :max-count="3"
                      multiple
                      :afterRead="afterRead"
                      @delete="deleteImg"
            />
        </div>
        <!-- 按钮 -->
        <div class="btnBox">
            <button class="btn" @click="upDataTask">发布</button>
        </div>
    </div>
</template>
<script>
    import MyHeader from "@/components/public/MyHeader";
    import Lines from "@/components/public/Lines";
    import { Uploader  } from "vant";
    import { upImage , upDataTask} from "../../apis";
    export default {
        name: 'taskHandle',
        components: {
            MyHeader,
            Lines,
            Uploader
        },
        data(){
            return {
                mission_id:-1,
                mission_userTable_id:-1,
                mission_result_pic:[],//图片
                mission_result_content:"",//任务描述
                status:-1,  //0:未接受,1:已完成,2:处理中
                fileList: []
            }
        },
        created() {
            const params = this.decodeBase64(this.$route.query);
            this.mission_id = params.mission_id;
            this.mission_userTable_id = params.mission_userTable_id;
            this.status = params.status;
        },
        methods:{
            //上传图片
            afterRead(file) {
                upImage(file.file).then(msg =>{
                    if(~~msg.statusCode === 200 && ~~msg.errno === 0){
                        msg = msg.data[0];
                        this.mission_result_pic.push(msg);
                        this.GToast({message:"图片上传成功"})
                    }else {
                        this.fileList.pop();
                        this.GToast({message:"上传图片失败"})
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"})
                })
            },
            //删除图片
            deleteImg(file,current){
                const index= current.index;
                this.mission_result_pic.splice(index, 1);
            },
            //提交
            upDataTask(){
                if(this.mission_result_content.trim().length === 0){
                    this.GToast({message:"请填写内容说明"});
                    return false
                }
                if(this.mission_result_pic.length === 0){
                    this.GToast({message:"请至少上传一张图片"});
                    return false
                }
                let mission_result_pic = this.mission_result_pic.join(",");

                let status = -1;
                if(~~this.status === 0){
                    status = 2
                }else if(~~this.status === 2){
                    status = 1
                }
                upDataTask({data:{
                        status,
                        mission_result_pic,
                        mission_result_content:this.mission_result_content,
                        mission_id:this.mission_id,
                        id:this.mission_userTable_id
                    }}).then(msg => {
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        this.GToast({message:"发布成功"})
                       window.setTimeout(this.$router.go(-2),1000)
                    }else {
                        this.GToast({message:"发布失败"})
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"})
                })

            }
        }
    }
</script>
<style lang="stylus" scoped>
    .taskHandle
        min-height 100vh
        background #f8f8f8
        padding-top func(44)
        .titBox
            display flex
            padding func(15)
            background #ffffff
            p
                font-size func(14)
                color #D33333
            span
                font-size func(14)
                color #BFBFBF
        .textareaBox
            background #ffffff
            padding 0 func(15)
            textarea
                width 100%
                font-size func(14)
                border none
            textarea::placeholder
                         color #BFBFBF
        .upImg
            display flex
            flex-wrap wrap
            background #ffffff
            padding 0 func(15)
            padding-bottom func(15)
            .imgbox
                width func(88)
                height func(66)
                position relative
                margin-right func(13)
                img
                    width 100%
                    height 100%
                span
                    display block
                    width func(10)
                    height func(10)
                    position absolute
                    top func(-5)
                    right func(-5)
                    background #cccccc
                    border-radius 50%
                    border 1px solid #ffffff
            .add
                width func(66)
                height func(66)
                background #F5F5F5
        .btnBox
            margin-top func(90)
            display flex
            justify-content center
            .btn
                width func(258)
                line-height func(44)
                text-align center
                background #6CB127
                color #ffffff
                font-size func(16)
</style>
