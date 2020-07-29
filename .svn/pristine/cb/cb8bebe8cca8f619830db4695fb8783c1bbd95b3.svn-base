<template>
    <div id="Grid">
        <div v-for="(item , index) in gridList" :key="index" @click="go(item.pageRouter)">
            <img :src="item.src" />
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Grid",
        props:{
            gridList:{
                type:Array,
                required: true
            }
        },
        methods: {
            go(src){
                this.$router.push(src);
            }
        },
        components: {},
        created() {
        },
    }
</script>

<style scoped lang="stylus">
#Grid {
    display flex
    flex-wrap wrap
    width 100%
    margin-bottom func(19)
    > div {
        width 25%
        height func(85)
        display flex
        align-items center
        justify-content center
        flex-direction column
        border-bottom func(1) solid #f5f5f5
        border-right func(1) solid #f5f5f5
        box-sizing border-box
        > img {
            width func(44)
            height func(44)
            margin-bottom func(8)
        }
    }
}
</style>
