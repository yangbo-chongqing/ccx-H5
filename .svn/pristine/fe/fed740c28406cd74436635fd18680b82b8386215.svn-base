<template>
    <div class="Single">
        <span v-text="title"/>
        <div v-html="info"/>
    </div>
</template>

<script>
    export default {
        name: "Single",
        props:{
            title: {
                type: String,
                required: true
            },
            info:{
                type: String,
                required: false
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
.Single {
    width:100%
    position relative
    border-top: func(1) solid #f5f5f5
    padding func(15) 0
    > span {
        position absolute
        top 0
        left 0
        transform translateY(-50%)
        background-color: #fff
        padding-right func(12)
        color #6CB127
        font-size func(14)
    }
    > div {
        text-indent 2em
        >>> img {
            max-width 100% !important
        }
        >>> div ,
        >>> span {
            font-size func(14)!important
        }
    }
}
</style>
