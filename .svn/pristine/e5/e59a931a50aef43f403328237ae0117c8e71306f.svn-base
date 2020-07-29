<template>
    <div id="Options">
        <div v-for="(item , index ) in list" :key="item" @click="modifyOptionFlag(index)" :class="{active : index === optionFlag}">{{ item }}</div>
    </div>
</template>

<script>
    export default {
        name: "Options",
        data() {
            return {
                list:["视频" , "文档" , "农业专家"]
            }
        },
        props:{
            modifyOptionFlag: {
                type: Function,
                required: true
            },
            optionFlag: {
                type: Number,
                required: true
            }
        },
        methods: {},
        components: {},
        created() {
        },
        mounted() {
        },
        filters: {},
        computed: {},
        watch: {}
    }

</script>

<style scoped lang="stylus">
#Options {
    width 100%
    height func(44)
    display flex
    align-items center
    > div {
        flex 1
        display flex
        align-items center
        justify-content center
        position relative
        height 80%
        transition color .3s
        &::after {
            content ""
            position absolute
            bottom 0
            left 50%
            transform translateX(-50%)
            width 0
            height func(2)
            transition all .3s
            background-color: #6CB127
        }
        &.active{
            color #6CB127
            &::after{
                width 15%
            }
        }
    }
}
</style>
