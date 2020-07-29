<template>
    <div id="households">
        <MyHeader :title="'贫困户'"/>
        <div class="housBox" v-for="(item , index) in list" :key="index" @click="toNewdet(item)">
            <div class="onebox">
                <p>{{item.name}}</p>
                <div>
                    <p>{{item.householder}}</p>
                    <p>{{item.tel}}</p>
                    <p>{{item.count}}人</p>
                </div>
            </div>
            <div class="twobox">详情</div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getPoor } from "../../apis";
    export default {
        name: "households",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            getPoor(){
                const userInfo = this.$store.state.userInfo;
                let deptId = userInfo === null ? 651 : userInfo.deptId;
                getPoor({
                    url:"/work/helpPoor/getPoorList",
                    data:{
                        houseType: '05',
                        del_lag: 0,
                        // dept_id:deptId
                    }
                }).then(msg => {
                    if(~~msg.code === 0){
                        this.list=msg.data.list;
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
            toNewdet(item){
                this.$router.push({path:'/family.html',query:{ id:item.id}});
            },
        },
        components: {
            MyHeader,
        },
        created() {
            this.getPoor()
        },
    }
</script>

<style scoped lang="stylus">
#households {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .housBox{
        width: 100%;
        padding: 0.6rem 1rem 0.6rem 1rem;
        box-sizing: border-box;
        background: #FFFFFF;
        border-top: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .onebox p{
            color: #444444;
            font-size: 0.5rem;
        }
        .onebox div{
            margin-top: 0.4rem;
            p{
                color: #8A8A8A;
                display: inline-block;
                margin-right: 1rem; 
            }
            p:last-child{
                margin-right: 0;
            }
        }
        .twobox{
            background: #6CB127;
            width: 2rem;
            height: 1.2rem;
            border-radius: 1rem;
            color: #FFFFFF;
            line-height: 1.2rem;
            text-align: center;
            font-size: 0.56rem;
        }
    }
}
</style>
