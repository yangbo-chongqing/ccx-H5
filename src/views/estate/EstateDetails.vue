<template>
    <div id="EstateDetails">
        <MyHeader title="市场详情"/>
        <DetailsTop :goods="goods"/>
        <main v-html="goods.bazaar_content" />
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import DetailsTop from "../../components/estateDetails/DetailsTop";
    import { marketDetails } from "../../apis";
    export default {
        name: "EstateDetails",
        data() {
            return {
                goods:{}
            }
        },
        methods: {},
        components: {
            MyHeader,
            DetailsTop
        },
        created() {
            const baz_id = this.decodeBase64(this.$route.query).baz_id;
            marketDetails({
                data: {
                    baz_id
                }
            }).then(msg => {
                if(~~msg.code === 0 && ~~msg.status === 200){
                    msg = msg.data;
                    this.goods = msg;
                }else {
                    this.GToast({message: "获取失败"});
                }
            }).catch(err => {
                this.GToast({message: "网络错误"});
            })
        },
        mounted() {
        },
        filters: {},
        computed: {},
        watch: {}
    }

</script>

<style scoped lang="stylus">
#EstateDetails {
    width 100%
    min-height 100vh
    box-sizing border-box
    padding func(44) func(14) 
    >main {
        width 100%
        >>> img {
            max-width 100%!important
        }
    }
}
</style>
