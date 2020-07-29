<template>
    <div id="ApplyCollege">
        <MyHeader :title="'申请上榜'"/>
        <div>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>姓名</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userName">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>性别</span>
                </p>
                <input type="text" placeholder="请选择" disabled :value="columnsSex.typeSex" >
                <i class="iconfont" @click="showSex = true">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>身份证号</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userCard">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                </p>
                <Field
                    readonly
                    clickable
                    label="工作时间"
                    placeholder="选择时间"
                    v-model="TimeValue"
                    @click="showTime = true"
                />
                <Popup v-model="showTime" position="bottom">
                    <DatetimePicker
                        type="date"
                        v-model="currentDate"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @cancel="showTime = false"
                        @confirm="showTime = false"
                        @change="startTimeChange"
                    />
                </Popup>
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>申报类型</span>
                </p>
                <input type="text" placeholder="请选择" disabled :value="columns.type" >
                <i class="iconfont" @click="show = true">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>突出亮点</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userLiang">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>联系电话</span>
                </p>
                <input type="text" placeholder="请输入联系电话" v-model="userPhone">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p class="captcha">
                    <i style="padding-right:0.6rem">*</i>
                    <span>验证码</span>
                </p>
                <input type="text" placeholder="请输入验证码"   v-model="captcha">
                <button @click="getCaptcha" v-show="!this.timer">点击获取</button>
                <button class="no" v-show="this.timer">{{ timeLeft }}后再次获取</button>
            </div>
            <Lines />
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>详情描述</span>
                </p>
                <input type="text" disabled>
            </div>
            <textarea class="txtarea" placeholder="请输入详细说明" v-model="userReason"/>
            <div class="item">
                <p>
                    <i style="padding-right:0.6rem">*</i>
                    <span>图片上传</span>
                </p>
                <input type="text" disabled>
            </div>
            <Uploader v-model="fileList"
                    :after-read="afterRead"
                    :max-count="3"
                    class="IupFile"
                    @delete="deleteImg"
            />
            <div @click="upDataOut" class="btn">提交</div>
            <Popup  v-model="show"
                position="bottom"
                :style="{ height: '50%' }">
                <Picker
                        show-toolbar
                        :columns="columns"
                        @cancel="onCancel"
                        @confirm="onConfirm"
                        value-key="type"
                ></Picker>
            </Popup>
            <Popup  v-model="showSex"
                position="bottom"
                :style="{ height: '50%' }">
                <Picker
                        show-toolbar
                        :columns="columnsSex"
                        @cancel="onCancelSex"
                        @confirm="onConfirmSex"
                        value-key="typeSex"
                ></Picker>
            </Popup>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import Lines from "../../components/public/Lines";
    import { Toast,Picker,Field,Popup,DatetimePicker,Uploader } from 'vant';
    import { getCaptcha , upApply , upImage} from "@/apis";
    export default {
        name: "ApplyCollege",
        data() {
            return {
                show: false,
                showSex:false,
                fileList:[],
                columns: [
                    {type:"大学生",typeId:1},
                    {type:"人才",typeId:2}
                ],
                columnsSex:[
                    {typeSex:"男",typeSexId:1},
                    {typeSex:"女",typeSexId:2}
                ],
                TimeValue:'',
                showTime:false,
                minDate: new Date(2000, 0, 1),
                maxDate: new Date(2200, 10, 1),
                currentDate: new Date(),
                userName:"",   //姓名
                userSex:"",  //性别
                userCard:"",  //身份证号
                userPhone:"",//电话
                captcha:"",//用户输入验证码
                Captcha:"",//系统返回验证码
                userReason:"",    //原因
                userLiang:"",     //突出亮点
                timer:null,
                timeLeft:0,
                orderImg:[]
            }
        },
        methods: {
            onConfirm(value) {
                this.columns = value;
                this.show = false
            },
            onCancel() {
                this.show = false
            },
            onConfirmSex(value) {
                this.columnsSex = value;
                this.showSex = false
            },
            onCancelSex() {
                this.showSex = false
            },
            //获取验证码
            getCaptcha(){
                const userPhone  = this.userPhone.trim();
                const reg = /^1[345678]\d{9}$/;
                if(!reg.test(userPhone)){
                    this.GToast({message:"请正确输入您的手机号码"});
                    return false;
                }
                getCaptcha({data:{mobile:userPhone}}).then(msg => {

                    if(~~msg.code === 0 && ~~msg.status === 200){
                        this.GToast({message:msg.msg});
                        this.Captcha = msg.captcha;
                        this.timeLeft = 60
                        this.timer =  setInterval(() => {
                            if(this.timeLeft <= 0){
                                clearInterval(this.timer)
                                this.timer = null;
                            }else {
                                this.timeLeft--;
                            }
                        },1000)
                    }else {
                        this.GToast({message:msg.msg});
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"});
                })
            },
            startTimeChange(e) {
                let endTimeArr = e.getValues();//["2019", "03", "22", "17", "28"]
                this.TimeValue = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`
            },
            afterRead(file) {
                this.upImage(file)
            },
            upDataOut(){
                //验证
                if(!this.userName.trim().length){
                    this.GToast({message:"请输入姓名"});
                    return false;
                }
                if(this.columnsSex === null){
                    this.GToast({message:"请选择性别"});
                    return false;
                }
                const regExpCard = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if(!regExpCard.test(this.userCard)){
                    this.GToast({message:"请输入正确的身份证号"});
                    return false;
                }
                if(this.columns === null){
                    this.GToast({message:"请选择类型"});
                    return false;
                }
                if(!this.userLiang.trim().length){
                    this.GToast({message:"请输入亮点"});
                    return false;
                }
                const regExp = /^1[345678]\d{9}$/;
                if(!regExp.test(this.userPhone)){
                    this.GToast({message:"请正确输入手机号码"});
                    return false;
                }
                if(!this.userReason.trim().length){
                    this.GToast({message:"请输入内容说明"});
                    return false;
                }
                const orderImg = this.orderImg.join(",");
                this.upApply(orderImg)
            },
            upImage(file){
                upImage(file.file).then(msg => {
                    if(~~msg.statusCode === 0 && ~~msg.errno === 0){
                        this.orderImg.push(msg.data[0]);
                    }else {
                        this.GToast({message:"网络错误，上传失败"});
                        this.fileList.pop();
                    }
                }).catch(err =>{
                    this.GToast({message:"网络错误"});
                })
            },
            //提交
            upApply(orderImg){
                upApply({
                    url:"/able/person/insertAndUpdate",
                    data:{
                        able_name: this.userName,
                        able_sex: this.columnsSex.typeSexId,
                        id_card: this.userCard,
                        talent_type: this.columns.typeId,
                        tel: this.userPhone,
                        orderImg
                    }
                }).then(msg => {
                    if(~~msg.code === 200 && ~~msg.data.code === 200){
                        this.GToast({message:msg.data.data});
                        this.$router.go(-1);
                    }else {
                        this.GToast({message:"提交失败"});
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"})
                })
            },
            deleteImg(file , current ){
               const index = current.index;
               this.orderImg = this.orderImg.filter((item,i) => i!== index)
            }
        },
        components: {
            MyHeader,
            Picker,
            Popup,
            Field,
            DatetimePicker,
            Lines,
            Uploader
        },
        created() {
        },
    }
</script>

<style scoped lang="stylus">
#ApplyCollege {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .item {
        width 100%
        height func(44)
        border-bottom: func(1) solid #f5f5f5
        display flex
        align-items center
        justify-content space-between
        > input {
            flex 1
            border 0
            outline 0
            background-color: transparent
            text-align right
            box-sizing border-box
            color #BFBFBF
            padding 0 func(15)
            &::placeholder{
                color #BFBFBF
            }
        }
        > i {
            margin-top: func(4)
            color #BFBFBF
        }
        > p {
            span {
                color #BFBFBF
            }
            i {
                color #f00
            }
        }
        > button {
            background-color: transparent
            padding-left: func(15);
            border-left func(2) solid #6CB127
            color #6CB127
            min-width func(80)
            &.no {
                color: #bfbfbf
            }
        }
        >.captcha {
            min-width func(50)
        }
    }
    > .item {
        width 100%
        height func(44)
        display flex
        align-items center
        padding 0 func(15)
        justify-content space-between
        box-sizing border-box
        border-bottom func(1) solid #f5f5f5
        > input {
            flex 1
            border 0
            outline 0
            background-color: transparent
            text-align right
            box-sizing border-box
            color #BFBFBF
            padding 0 func(15)
            &::placeholder{
                color #BFBFBF
            }
        }
        > i {
            margin-top: func(4)
            color #BFBFBF
        }
        > p {
            span {
                color #BFBFBF
            }
            i {
                color #f00
            }
        }

    }
    .txtarea {
        width: 100%
        box-sizing border-box
        padding:0 func(15)
        color #BFBFBF
        height: func(108)
        resize none
        border 0
        outline 0
        &::placeholder {
            color #BFBFBF
        }
    }
    .btn{
        width: 10.84rem;
        height: 1.84rem;
        background: #6cb127;
        margin: 2rem auto 0;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 1.84rem;
    }
    
    
}
</style>
