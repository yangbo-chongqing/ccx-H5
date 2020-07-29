<template>
    <div id="SocietySign">
        <MyHeader :title="'加入社会组织'" :color="false"/>
        <Lines />
        <div class="form">
            <div class="item">
                <p>
                    <i>*</i>
                    <span>姓名</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userName">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>性别</span>
                </p>
                <input type="text" placeholder="请选择" disabled :value="value">
                <i class="iconfont" @click="show = true">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>职务</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userWork">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>爱好</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userLike">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>联系电话</span>
                </p>
                <input type="text" placeholder="请输入" v-model="userPhone">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>验证码</span>
                </p>
                <input type="text" placeholder="请输入验证码" v-model="captcha">
                <button @click="getCaptcha" v-show="!this.timer">点击获取</button>
                <button class="no" v-show="this.timer">{{ timeLeft }}后再次获取</button>
            </div>
        </div>
        <Lines />
        <div class="item">
            <p>
                <i>*</i>
                <span>谈谈你的特长</span>
            </p>
            <input type="text">
        </div>
        <textarea placeholder="请输入详细内容" v-model="orderContent" />
        <div class="button" @click="upDataSociety">立即提交</div>
        <Popup  v-model="show"
                position="bottom"
                :style="{ height: '40%' }">
            <Picker
                    show-toolbar
                    :columns="columns"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    value-key="showName"
            ></Picker>
        </Popup>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import Lines from "../../components/public/Lines";
    import { Toast,Picker,Popup } from 'vant';
    import { getCaptcha,upDataSociety } from "../../apis";
    export default {
        name: "SocietySign",
        data() {
            return {
                news_id:"",
                show : false,
                columns: ["男","女"],
                value:"",  //性别
                userName:"",//姓名
                userWork:"", //职务
                userLike:"", //爱好
                userPhone:"",//电话
                captcha:"",//用户输入验证码
                Captcha:"",//系统返回验证码
                orderContent:"",// 特长
                articleId:"",
                timer:null,
                timeLeft:0
            }
        },
        methods: {
            onConfirm(value) {
                this.value = value;
                this.show = false
            },
            onCancel() {
                this.show = false
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

            // 提交
            upDataSociety(){
                if(this.captcha != this.Captcha){
                    this.GToast({message:"请正确输入验证码"});
                    return false;
                }
                //验证
                if(!this.userName.trim().length){
                    this.GToast({message:"请输入姓名"});
                    return false;
                }
                if(this.value === null){
                    this.GToast({message:"请选择性别"});
                    return false;
                }
                if(!this.userWork.trim().length){
                    this.GToast({message:"请输入职务"});
                    return false;
                }
                if(!this.userLike.trim().length){
                    this.GToast({message:"请输入爱好"});
                    return false;
                }
                const regExp = /^1[345678]\d{9}$/;
                if(!regExp.test(this.userPhone)){
                    this.GToast({message:"请正确输入手机号码"});
                    return false;
                }
                if(!this.orderContent.trim().length){
                    this.GToast({message:"请输入您的特长"});
                    return false;
                }
                upDataSociety({
                    url:"/regime/apply/insertAndUpdate",
                    data:{
                        user:this.userName,
                        articleId:this.news_id,
                        sex: this.value,
                        hobby: this.userLike,
                        speciality:this.orderContent,
                        position:this.userWork,
                        phone: this.userPhone
                    }
                }).then(msg => {
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        this.GToast({message:"加入成功"});
                        this.$router.go(-1);
                    }else {
                        this.GToast({message:"提交失败"});
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"})
                })
            }
        },
        components: {
            MyHeader,
            Lines,
            Picker,
            Popup,
        },
        created() {
            this.news_id=this.$route.query.id;
        },
    }
</script>

<style scoped lang="stylus">
#SocietySign {
    width 100%
    box-sizing border-box
    padding-top func(44)

    > .form {
        width 100%
        box-sizing  border-box
        padding 0 func(15)
        > .item {
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
            }
        }
    }
    > .item {
        width 100%
        height func(44)
        padding 0 func(15)
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
        > p {
            span {
                color #BFBFBF
            }
            i {
                color #f00
            }
        }

    }
    > textarea {
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
    > .button {
        width func(258)
        height func(44)
        background-color: #6CB127
        color #fff
        font-size func(16)
        display flex
        align-items center
        justify-content center
        margin func(74) auto func(148) auto
    }
}
</style>
