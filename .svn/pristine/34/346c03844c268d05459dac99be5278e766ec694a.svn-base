<template>
    <ul id="ResultList">
        <li v-for="(item , index) in list" :key="index">
            <div class="info">
                <h6>{{ item.app_status }}</h6>
                <p>{{ item.app_title }}</p>
            </div>
            <div class="button" @click="goDetails(item)">详情</div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "ResultList",
        props:{
            goDetails:{
                type:Function,
                required: true
            },
            list:{
                type:Array,
                required: true
            }
        },
        methods: {},
        components: {},
        created() {
        },
    }
</script>

<style scoped lang="stylus">
#ResultList {
    width 100%
    box-sizing border-box
    padding-left func(15)
    > li {
        width: 100%
        box-sizing border-box
        padding-right: func(15);
        border-bottom func(1) solid #f5f5f5
        height func(92)
        display flex
        justify-content space-between
        align-items center
        > .info {
            width func(240)
            >p,
            >h6 {
                width 100%
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                font-size func(14)
            }
            > h6 {
                margin-bottom: func(8)
                font-weight 400
                color #6CB127
                &.active {
                    color #D33333
                }
            }
        }
        > .button {
            width func(50)
            //width func(70)
            height func(30)
            background-color: #6CB127
            color #fff
            border-radius 100vmax
            display flex
            align-items center
            justify-content center
        }
    }
}
</style>
