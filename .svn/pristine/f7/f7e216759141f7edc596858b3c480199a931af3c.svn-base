<template>
    <div id="OnLine">
        <!--在线办理-->
        <MyHeader :title="'在线办理'" :color="false"/>
        <main>
            <p></p>
            <MyTitle :title="'准备材料'"/>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>准备材料：</span>
                </p>
                <input type="text" disabled v-model="thingType">
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>申请报名：</span>
                </p>
                <input type="text" >
                <i class="iconfont">&#xe636;</i>
            </div>
            <div class="item">
                <p>
                    <i>*</i>
                    <span>身份证号：</span>
                </p>
                <input type="text" >
                <i class="iconfont">&#xe636;</i>
            </div>
            <Lines />
            <div class="item">
                <p>
                    <i>*</i>
                    <span>住院发票：</span>
                </p>
                <input type="text" disabled>
            </div>
            <Uploader :after-read="afterRead" v-model="fileList" multiple :max-count="3" />
            <Lines />
            <div class="item">
                <p>
                    <i>*</i>
                    <span>合作医疗黄卡：</span>
                </p>
                <input type="text" disabled>
            </div>
            <Uploader :after-read="afterRead" v-model="fileList" multiple :max-count="3" />
            <Lines />
            <div class="item">
                <p>
                    <i>*</i>
                    <span>患者病例：</span>
                </p>
                <input type="text" disabled>
            </div>
            <Uploader :after-read="afterRead" v-model="fileList" multiple :max-count="3" />
            <Lines />
            <div class="item">
                <p>
                    <i>*</i>
                    <span>患者本人身份证：</span>
                </p>
                <input type="text" disabled>
            </div>
            <Uploader :after-read="afterRead" v-model="fileList" multiple :max-count="3" />
            <div class="item">
                <p>
                    <i>*</i>
                    <span>内容说明：</span>
                </p>
                <input type="text" disabled>
            </div>
            <textarea placeholder="请输入详细说明" />
            <div class="button">预约提交</div>
        </main>
    </div>
</template>

<script>
    import MyTitle from "../../components/convenience/public/MyTitle";
    import MyHeader from "../../components/public/MyHeader";
    import Lines from "../../components/public/Lines";
    import { Uploader  } from "vant"
    export default {
        name: "OnLine",
        data() {
            return {
                thingType:"上个页面传过来的",
                fileList: []
            }
        },
        methods: {
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
            }
        },
        components: {
            MyTitle,
            MyHeader,
            Lines,
            Uploader
        },
        created() {
        },
    }
</script>

<style scoped lang="stylus">
#OnLine {
    width 100%
    min-height 100vh
    padding-top func(44)
    box-sizing border-box
    > main {
        width 100%
        box-sizing border-box
        padding: 0 func(15);
        > p {
            width 100%
            height func(1)
            background-color: #f5f5f5
        }
        > .item {
            width 100%
            height func(44)
            border-bottom func(1) solid #f5f5f5
            box-sizing border-box
            display flex
            justify-content space-between
            align-items center
            > p {
                > i {
                    color #f00
                }
                > span {
                    color #bfbfbf
                }
            }
            > input {
                flex 1
                box-sizing border-box
                padding 0 func(15)
                text-align right
                border 0
                outline 0
                background-color: transparent
            }
            > i {
                font-size func(14)
                color #bebebe
                margin-top:func(4)
            }
        }
        > textarea {
            width 100%
            box-sizing border-box
            height: func(118)
            border 0
            outline 0
            resize none
        }
        > .button {
            width: func(258)
            height func(44)
            color #fff
            background-color: #6CB127
            font-size func(16)
            display flex
            align-items center
            justify-content center
            margin: func(49) auto func(73) auto
        }
    }
}
</style>
