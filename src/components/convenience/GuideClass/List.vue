<template>
    <ul id="List">
        <li v-for="(item, index) in list" :key="index" @click="goDetails(item)">
            <p>{{ item.flow_name }}</p>
            <i class="iconfont">&#xe601;</i>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "List",
        props:{
            list:{
                type:Array,
                required: true
            }
        },
        methods: {
            //去详情页
            goDetails(obj){
                window.sessionStorage.setItem("guideDetaiilsFlowId",obj.flow_id)
                this.$router.push("/GuideDetails.html");
            }
        },
        created() {
        },
    }
</script>

<style scoped lang="stylus">
#List {
    width 100%
    box-sizing border-box
    padding 0 func(15)
    > li {
        width 100%
        height func(56)
        display flex
        align-items center
        justify-content space-between
        border-bottom func(1) solid #dadada
        > p {
            width: func(295)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-weight 600
        }
        > i {
            color #DADADA
        }
    }
}
</style>
