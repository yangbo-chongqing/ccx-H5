<template>
    <div id="detailsTop">
        <h2 v-text="goods.bazaar_title" />
        <div class="userInfo">
            <img :src="goods.head_pic | formatImg" />
            <div>
                <p v-text="goods.contacts"/>
                <span v-text="goods.tel" />
            </div>
            <i class="iconfont" @click="call(goods.tel)">&#xe6a9;</i>
        </div>
        <div class="label">
            <a href="javascript:;" :class="{sell:goods.demand_type == '出售'}">出售</a>
            <a href="javascript:;" :class="{userFul:goods.baz_type == '有效'}">有效</a>
            <a href="javascript:;" :class="{ userLess: goods.baz_type == '无效'}">无效</a>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    export default {
        name: "detailsTop",
        props:{
            goods: {
                type: Object,
                required: true
            }
        },
        methods:{
            //拨打电话
            call(phone){
                if (phone){
                    //先询问
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '是否要拨打电话给' + phone + "?"
                    }).then(() => {
                        window.location.href = "tel://" + phone
                    }).catch(() => {

                    });

                }
            }
        }
    }

</script>

<style scoped lang="stylus">
#detailsTop {
    width 100%
    height func(128.5)
    box-sizing border-box
    border-bottom func(1) solid #f5f5f5
    > h2 {
        width 100%
        font-size func(14)
        font-weight 400
    }
    > .userInfo {
        width 100%
        display flex
        align-items center
        height func(62)
        position relative
        > img {
            width func(44)
            height func(44)
            border-radius 50%
            margin-right func(12)
        }
        > div {
            > p {
                font-size func(14)
                line-height 1
            }
            >span {
                font-size func(12)
                color #999
                line-height 1
            }
        }
        > i {
            position absolute
            bottom 0
            right func(15)
            font-size func(20)
            color #6CB127
        }
    }
    > .label {
        display flex
        > a {
            margin-right func(16)
            height func(20)
            border-radius 100vmax
            padding 0 func(9)
            color #fff
            display none
            &.sell {
                background-color: #6CB127
                display block
            }
            &.userFul {
                background-color: #16DFA9
                display block
            }
            &.userLess {
                background-color: #DADADA
                display block
            }
        }
    }
}
</style>
