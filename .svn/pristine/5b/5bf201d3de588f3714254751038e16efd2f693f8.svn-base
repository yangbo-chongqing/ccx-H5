<template>
    <div id="MorePhone">
        <MyHeader title="报警电话" />
        <div v-for="(item , index) in list" :key="index" class="list">
            <img :src="item.contact_img | formatImg" />
            <div>
                <p>{{ item.contact_name }}</p>
                <p>{{ item.contact_phone_1 }}</p>
                <p>{{ item.contact_phone_2 }}</p>
            </div>
            <i class="iconfont green" @click="call(item.contact_phone_1)">&#xe6a9;</i>
            <i class="iconfont red" @click="call(item.contact_phone_2)">&#xe6a9;</i>
        </div>
    </div>
</template>

<script>
    import {getPolicePhone} from "../../apis";
    import MyHeader from "../../components/public/MyHeader";
    import {Dialog} from "vant";
    export default {
        name: "MorePhone",
        data() {
            return {
                list:[]
            }
        },
        methods: {
            //获取报警电话
            getPolicePhone(){
                const data = {
                    del_lag:0
                };
                getPolicePhone({data}).then(msg => {
                    if(~~msg.code === 0 && ~~msg.status === 200){
                        this.list = msg.data.list;
                    }else {
                        this.GToast({message:"获取报警电话列表失败"});
                    }
                }).catch(err =>{
                    this.GToast({message:"网络错误"});
                })
            },
            //拨打电话
            call(phone){
                Dialog.confirm({
                    title: '拨打电话',
                    message: '确认拨打电话？',
                    confirmButtonText: '确定',
                    confirmButtonColor: '#6CB127',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#8A8A8A'
                }).then(() => {
                    // 确定
                    phone = "tel:" + phone;
                    window.open(phone);
                }).catch(() => {
                    // 取消
                });
            }
        },
        components: {
            MyHeader
        },
        created() {
            this.getPolicePhone();
        },
    }
</script>

<style scoped lang="stylus">
    #MorePhone {
        width 100%
        height 100%
        box-sizing border-box
        padding-top: func(44)
        .list {
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
