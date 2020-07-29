<template>
    <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <SwipeItem v-for="(item , index) in swipeList" :key="index">
            <img :src="item.people_pic" />
        </SwipeItem>
    </Swipe>
</template>

<script>
    import { Swipe, SwipeItem } from 'vant';
    export default {
        name: "mySwipe",
        props:{
            swipeList:{
                type:Array,
                required: true
            }
        },
        methods: {
        },
        components: {
            Swipe,
            SwipeItem
        },
        created() {
        },
    }
</script>

<style scoped lang="stylus">
    .my-swipe
        height:func(188)
        display flex
    .my-swipe .van-swipe-item
        text-align: center;
        img
            width 100%
            height:100%
    /deep/ .van-swipe__track {
        display flex
    }
</style>
