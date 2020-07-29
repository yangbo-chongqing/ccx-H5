<template>
    <div id="Lawconsultation">
        <MyHeader :title="'法律咨询'" :color="false"/>
        <Lines />
        <div class="form">
            <div class="item">
                <p>
                    <i>*</i>
                    <span>咨询律师</span>
                </p>
                <input type="text" :value="type?type.name:''" disabled>
                <i class="iconfont" @click="show = true">&#xe636;</i>
            </div>
        </div>
        <Lines />
        <div class="item">
            <p>
                <i>*</i>
                <span>咨询内容</span>
            </p>
        </div>
        <textarea placeholder="请输入咨询内容" v-model="turnInfo"/>
        <div class="button" @click="upDataLawyer">立即提交</div>
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
    import { Toast,Picker,Field,Popup,DatetimePicker } from 'vant';
    import { getLawyer,upDataLawyer } from "../../apis";
    export default {
        name: "Lawconsultation",
        data() {
            return {
                show : false,
                columns: [],
                type:null ,//律师
                turnInfo:"", //内容
            }
        },
        methods: {
            //获取律师
            getLawyer(){
                getLawyer({
                    url:"/legalAidApply/getListByRole",
                    data:{}
                }).then( msg => {
                     if(~~msg.code === 0){
                        msg.data.forEach(item => {
                            item.showName = item.name
                        })
                        this.columns = msg.data
                    }else {
                        this.GToast({message:"网络错误，获取失败"})
                    }
                }).catch(err => {
                    this.GToast({message:"网络错误"})
                })
            },
            //确认摁钮
            onConfirm(value) {
                this.type = value;
                this.show = false;
            },
            onCancel() {
                this.show = false
            },
            //提交
            upDataLawyer(){
                if(this.type === null){
                    this.GToast({message:"请选择律师"});
                    return false;
                }
                if(!this.turnInfo.trim().length){
                    this.GToast({message:"请输入内容"});
                    return false
                }
                upDataLawyer({
                    data:{
                        law_uid: this.type.user_id,
                        content:this.turnInfo,
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        this.GToast({message:"提交成功"})
                        setTimeout(() => {
                            this.$router.go(-1);
                        },1000);
                    }else {
                        this.GToast({message:"提交失败，请检查网络"})
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
            Field,
        },
        created() {
            this.getLawyer()
        },
    }
</script>

<style scoped lang="stylus">
#Lawconsultation {
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
