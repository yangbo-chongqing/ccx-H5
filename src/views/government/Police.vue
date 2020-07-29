<template>
    <div id="Police">
        <MyHeader :title="'警务信息'"/>
        <div v-for="(item , index) in list" :key="index" class="list">
            <img :src="item.contact_img | formatImg" />
            <div>
                <p>{{ item.contact_name }}</p>
                <p>{{ item.contact_phone_1 }}</p>
                <p>{{ item.contact_phone_2 }}</p>
            </div>
            <i class="iconfont green" @click="call1(item)">&#xe6a9;</i>
            <i class="iconfont red" @click="call2(item)">&#xe6a9;</i>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import {Dialog} from 'vant';
    import { getPolice } from "../../apis";
    export default {
        name: "Police",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            // 获取信息
            getPolice(){
                getPolice({
                    url:"/CountryAddressList/getContactList",
                    data:{
                        del_lag:0,
                        dept_id:this.deptId,
                        a_id:this.id
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
            call1(item){
                let phone1=item.contact_phone_1;
                Dialog.confirm({
                    title: '拨打电话',
                    message: `确认拨打电话？${phone1}`,
                    confirmButtonText: '确定',
                    confirmButtonColor: '#6CB127',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#8A8A8A'
                }).then(() => {
                    // 确定
                }).catch(() => {
                    // 取消
                });
            },
             call2(item){
                let phone2=item.contact_phone_2;
                Dialog.confirm({
                    title: '拨打电话',
                    message: `确认拨打电话？${phone2}`,
                    confirmButtonText: '确定',
                    confirmButtonColor: '#6CB127',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#8A8A8A'
                }).then(() => {
                    // 确定
                }).catch(() => {
                    // 取消
                });
            }
        },
        components: {
            MyHeader,
            Dialog
        },
        created() {
            this.getPolice()
        },
    }
</script>

<style scoped lang="stylus">
#Police {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    > .list {
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.4rem;
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        > img {
            width: 3.6rem;
            height: 3.6rem;
            border-radius: 50%;
            margin-right: 0.4rem;
        }
        > div {
            width: 60%;
            height: 4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            > p {
                font-size: 0.6rem;
                color: #444;
                margin-bottom: 0.2rem;
            }
            > p:nth-of-type(2) {
                margin-bottom: 0.2rem;
                color: #64b532;
                font-size: 0.5rem;
            }
            > p:last-of-type {
                color: #D33333;
                font-size: 0.5rem;
            }
        }
        > .iconfont {
            position: absolute;
            font-size: 0.8rem;
            right: 0.4rem;
        }
        .red {
            color: #D33333;
            top: 2.5rem;
        }
        .green {
            color: #64b532;
            top: 1.5rem;
        }
    }
}
</style>
