<template>
    <div class="BeVolunteer">
        <MyHeader :title="'志愿者报名'"/>
        <div class="topmess">
            <div class="int">
                <span>*</span>
                <p>姓名</p>
                <input type="text" placeholder="请输入" v-model="volunteer_name">
                <div class="arrow"></div>
            </div>
            <div class="int">
                <span>*</span>
                <p>性别</p>
                <input type="text" placeholder="请选择" disabled v-model="sex">
                <div class="arrow" @click="resetSex"></div>
            </div>
            <div class="int">
                <span>*</span>
                <p>年龄</p>
                <input type="text" placeholder="请选择" disabled v-model="age">
                <div class="arrow" @click="resetAge"></div>
            </div>
            <div class="int">
                <span>*</span>
                <p>特长</p>
                <input type="text" placeholder="请输入" v-model="speciality">
                <div class="arrow"></div>
            </div>
            <div class="int">
                <span>*</span>
                <p>住址</p>
                <input type="text" placeholder="请输入" v-model="address">
                <div class="arrow"></div>
            </div>
        </div>
        <Lines />
        <div class="topmess">
            <div class="int">
                <span>*</span>
                <p>联系电话</p>
                <input type="text" placeholder="请输入" v-model="phone">
                <div class="arrow"></div>
            </div>
            <div class="int">
                <span>*</span>
                <p>验证码</p>
                <div class="code">
                    <input type="text" placeholder="请输入" v-model="captcha">
                    <div class="vertical">|</div>
                    <div class="getBtn" @click="getCode">{{ getReg }}</div>
                </div>
            </div>
        </div>
        <!-- <Lines />
         <div class="titBox"><p>*</p><span>谈谈你对志愿者的理解</span></div>
         <div class="textareaBox">
             <textarea rows="5" placeholder="请输入详细说明"></textarea>
         </div>-->
        <!-- 按钮 -->
        <div class="btnBox">
            <button class="btn" @click="become">立即提交</button>
        </div>
        <Popup
                v-model="show"
                position="bottom"
                :style="{ height: '50%' }"
        >
            <Picker
                    show-toolbar
                    :columns="sexs"
                    @cancel="show = false"
                    @confirm="onConfirm"
            />
        </Popup>
        <Popup  v-model="show1"
                position="bottom"
                :style="{ height: '50%' }">
            <DatetimePicker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="sureTime"
                    @cancel="show1=false"
            />
        </Popup>
    </div>
</template>
<script>
    import MyHeader from "@/components/public/MyHeader";
    import Lines from "@/components/public/Lines";
    import { Popup  , Picker , DatetimePicker} from "vant";
    import { become , getCode} from "../../apis";
    export default {
        name: 'BeVolunteer',
        components: {
            MyHeader,
            Lines,
            Popup,
            Picker,
            DatetimePicker
        },
        methods:{
            become(){
                //地址
                const address = this.address.trim();
                // 年龄
                const age = this.age;
                //姓名
                const volunteer_name = this.volunteer_name.trim();
                //性别
                const sex = this.sex.trim();
                //特长
                const speciality = this.speciality.trim();
                //联系电话
                const phone = this.phone.trim();
                if(this.Captcha.toLowerCase() !== this.captcha.toLowerCase()){
                    this.GToast({message:"请正确输入验证码"});
                    return null;
                }
                if(volunteer_name.length === 0){
                    this.GToast({message:"请输入您的姓名"});
                    return null;
                }
                if(sex.length === 0){
                    this.GToast({message:"请选择您的性别"});
                    return null;
                }
                if(age.length === 0){
                    this.GToast({message:"请选择您的出生日期"});
                    return null;
                }
                if(speciality.length === 0){
                    this.GToast({message:"请输入您的特点"});
                    return null;
                }
                if(address.length === 0){
                    this.GToast({message:"请输入您的地址"});
                    return null;
                }
                const regExp = /^1[3456789]\d{9}$/;
                if(!regExp.test(phone)){
                    this.GToast({message:"请正确输入手机号码"})
                    return null;
                }
                become({
                    data:{
                        volunteer_name,
                        age,
                        address,
                        sex,
                        speciality,
                        phone
                    }
                }).then( msg => {
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        this.GToast({message:"申请提交成功,即将返回上一级页面"});
                        this.$router.go(-1);
                    }else {
                        this.GToast({message:"申请提交失败"});
                    }
                }).catch(err =>{
                    this.GToast({message:"网络错误"});
                })

            },
            onChange(picker, value, index) {
            },
            //确认
            onConfirm(value, index) {
                this.sex = value;
                this.show = false;
            },
            //取消
            onCancel() {
                this.show = false;
            },
            //修改展示的弹出层内容为性别
            resetSex(){
                this.show = true;
            },
            //修改弹出层为时间
            resetAge(){
                this.flag = 1;
                this.show1 = true;
            },
            //时间确定
            sureTime(value){
                const year = value.getFullYear();
                const month = value.getMonth() + 1;
                const date = value.getDate()
                this.show1 = false;
                this.age = `${year}年${month}月${date}日`
            },
            //获取验证码
            getCode(){
                if(this.timer !== null){
                    return false;
                }
                const regExp = /^1[3456789]\d{9}$/;
                if(!regExp.test(this.phone.trim())){
                    this.GToast({message:"请正确输入手机号码"});
                    return false;
                }
                let a = 60;
                this.timer = setInterval(() => {
                    if(a <= 0){
                        this.getReg = "获取验证码";
                        clearInterval(this.timer);
                        this.timer = null;
                    }else {
                        a--;
                        this.getReg = a + "秒后获取";
                    }
                },1000);
                getCode({
                    url:"/information/getSMSMsg",
                    data:{
                        mobile : this.phone
                    }
                }).then(msg =>{
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        this.GToast({message:msg.msg});
                        this.Captcha = msg.captcha;
                    }else {
                        this.GToast({message:"验证码获取失败"});
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"});
                })
            }
        },
        data(){
            return {
                volunteer_name:"",//姓名
                sex:"",//性别
                age:"", //年龄
                speciality:"", //特长
                address:"",//地址
                phone:"",//联系电话
                show: false,
                sexs:['男',"女"],
                times:[],
                show1:false,
                minDate: new Date(1900, 0, 1),
                maxDate: new Date(),
                currentDate: new Date(1995,6,18),
                getReg:"获取验证码",
                timer:null,
                captcha:"",//用户输入
                Captcha:"" //系统返回
            }
        },
        created() {
        }
    }
</script>
<style lang="stylus" scoped>
    .BeVolunteer
        min-height 100vh
        background #f8f8f8
        padding-top func(44)
        box-sizing border-box
        .topmess
            box-sizing border-box
            padding-left func(15)
            background #ffffff
            .int
                width 100%
                height func(45)
                border-bottom 1px solid #F5F5F5
                position relative
                box-sizing border-box
                padding-left func(8)
                overflow hidden
                span
                    color #D33333
                    position absolute
                    left 0
                    top func(10)
                p
                    line-height func(44)
                    color #BFBFBF
                    font-size func(14)
                    width func(60)
                    text-align justify
                p::after
                      display inline-block
                      width 100%
                      content ''
                      height 0
                input
                    width func(220)
                    position absolute
                    top 0
                    right func(35)
                    line-height func(44)
                    text-align right
                    border none
                    font-size func(14)
                    background none
                input::placeholder
                          color #BFBFBF
                .arrow
                    position absolute
                    width func(8)
                    height func(16)
                    right func(15)
                    top func(14)
                    background: #BEBEBE;
                    border-radius: func(2);
                    transform: rotate(-180deg);
                .code
                    height 100%
                    width func(250)
                    display flex
                    justify-content flex-end
                    align-items center
                    position absolute
                    right func(15)
                    top 0
                    input
                        position relative
                        width func(150)
                        right 0
                        margin-right func(12)
                    .vertical
                        color #DADADA
                    .getBtn
                        padding-left func(12)
                        font-size func(14)
                        color #6CB127

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
