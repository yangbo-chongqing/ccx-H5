<template>
    <div id="orgStructure">
        <MyHeader :title="'组织架构'"/>
        <div class="bottompadd">
            <div class="itemone" v-for="(item , index) in treeData" :key="index" @click="goOrg(item)">
                <img src="https://www.mlxc365.com/images/zhongyixiang/zuzhijaigou.png" />
                <div class="itemname">{{item.org_name}}</div>
                <i class="right iconfont">&#xe636;</i>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getOrg } from "../../apis";
    export default {
        name: "orgStructure",
        data() {
            return {
                treeData: []
            }
        },
        methods: {
            // 获取列表
            getOrg(){
                const userInfo = this.$store.state.userInfo;
                let deptId = userInfo === null ? 651 : userInfo.deptId;
                getOrg({
                    url:"/partPop/getPopDeptOrgList",
                    data:{
                        deptId
                    }
                }).then(msg => {
                    if(~~msg.code === 200){
                        msg = msg.data;
                        this.treeData = msg
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
            goOrg(item){
                this.$router.push({path:'/orgDetails.html',query:{ id:item.org_id}});
            },
        },
        components: {
            MyHeader,
        },
        created() {
            this.getOrg();
        },
    }
</script>

<style scoped lang="stylus">
#orgStructure {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .itemone{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.4rem;
        width: 100%;
        box-sizing: border-box;
        flex-wrap: wrap;
        border-bottom: 1px solid #f5f5f5;
        >img{
            width: 1.5remrem;
            height: 1.5rem;
            display: block;
            margin-right:0.4rem;
        }
    }
    .itemname{
        flex: 1;
        text-align: left;
    }
    .right{
        font-size: 0.7rem;
        color: #bdbdbd;
        transition: all .1s;
    }
    .rotate{
        transform: rotate(90deg);
    }
    .item_one{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        margin-left:0.7rem;
        padding:0.4rem 0.4rem 0 0.4rem;
        >img{
            width: 2rem;
            height: 2rem;
            display: block;
            margin-right:1rem;
            border-radius: 50%;
        }
    }
    .iteminfo{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size:0.5rem;
    }
    .bottompadd{
        padding-bottom:1rem;
    }
}
</style>
