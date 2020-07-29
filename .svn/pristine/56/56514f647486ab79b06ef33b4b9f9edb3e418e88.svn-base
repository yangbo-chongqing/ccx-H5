<template>
    <div id="Society">
        <MyHeader :title="'社会组织'"/>
        <div class="list" >
            <div v-for="(item , index) in list" :key="index" @click="goDet(item)">
                <img :src="item.contentPic" />
                <p>{{ item.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from "../../components/public/MyHeader";
    import { getNewsClass } from "../../apis";
    export default {
        name: "Society",
        data() {
            return {
                list:[]
            }
        },
        methods: {
             getNewsClass(){
                 const data = {
                    pageSize:10,
                    pageCurrent:1,
                    news_type:25
                }
                getNewsClass({
                    data,
                    currentObject:this
                }).then(msg => {
                    if(~~msg.code === 1 && ~~msg.status === 200){
                        this.list=msg.data.list;
                    }else {
                        //获取失败
                        this.GToast({message:"获取失败"});
                    }
                })
            },
            goDet(item){
                this.$router.push({path:'/SocietyDet.html',query:{ id:item.news_id}});
            }
        },
        components: {
            MyHeader,
        },
        created() {
            this.getNewsClass()
        },
    }
</script>

<style scoped lang="stylus">
#Society {
    width 100%
    min-height 100vh
    box-sizing  border-box;
    padding-top 2rem;
    > img {
        width:100%;
    }
    .list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        > div {
            width: calc(100% / 3);
            height: 4rem;
            box-sizing: border-box;
            border-right: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            > img {
                width: 1.8rem;
                height: 1.8rem;
                margin-bottom: 0.3rem;
            }
            > p {
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.5rem;
                line-height: 1.5;
                color: #454545;
            }
        }
        > div:nth-of-type(3n) {
            border-right:0
        }
    }
}
</style>
