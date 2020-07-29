<template>
    <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <SwipeItem v-for="(item , index) in swipeList" :key="index">
            <img :src="item" alt="">
        </SwipeItem>
    </Swipe>
</template>

<script>
    import { Swipe, SwipeItem } from 'vant';
    export default {
        name: "mySwipe",
        data() {
            return {
                swipeList:[
                    "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=186682105,1195550347&fm=26&gp=0.jpg",
                    "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=186682105,1195550347&fm=26&gp=0.jpg",
                    "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=186682105,1195550347&fm=26&gp=0.jpg",
                    "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=186682105,1195550347&fm=26&gp=0.jpg"
                ]
            }
        },
        methods: {},
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
