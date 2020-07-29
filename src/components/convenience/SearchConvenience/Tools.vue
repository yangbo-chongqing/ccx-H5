<template>
    <div id="Tools">
        <div v-for="(item , index) in toolsList" :key="index" @click="openPage(item.link)">
            <img :src="item.img" />
            <p>{{ item.title }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tools",
        props:{
            toolsList:{
                type: Array,
                default(){
                    return []
                }
            },
            openPage:{
                type:Function,
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
#Tools {
    width 100%
    display flex
    flex-wrap wrap
    > div {
        width 50%
        height func(106)
        border-bottom func(1) solid #f5f5f5
        display flex
        flex-direction column
        align-items center
        justify-content center
        box-sizing border-box
        &:nth-of-type(2n){
            border-left func(1) solid #f5f5f5
        }
        > img {
            width func(44)
            height func(44)
            margin-bottom func(12)
        }
        > p {
            font-size func(14)
            color #444
        }
    }
}
</style>
