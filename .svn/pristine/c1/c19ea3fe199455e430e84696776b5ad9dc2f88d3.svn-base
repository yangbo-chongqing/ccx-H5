<template>
    <div class="Tools">
        <div v-for="item in toolsList" :key="item.title" @click="swiperPage(false , item.pagelink)">
            <img :src="item.src" />
            <p v-text="item.title" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tools",
        data() {
            return {}
        },
        props:{
            toolsList:{
                type: Array,
                required: true
            },
            swiperPage: {
                type: Function,
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
.Tools {
    width 100%
    display flex
    align-items center
    box-sizing border-box
    padding: 0 func(15)
    > div {
        width 25%
        height func(106)
        display flex
        align-items center
        justify-content center
        box-sizing border-box
        flex-direction column
        > img {
            width func(44)
            height func(44)
            margin-bottom func(12)
        }
        > p {
            color #444
        }
    }
}
</style>
