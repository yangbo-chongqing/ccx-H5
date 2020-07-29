<template>
    <div class="advanced">
       <MyHeader :title="'参会人员'"/>
       <personnelList :list="list"></personnelList>
    </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import personnelList from "@/components/member/personnelList";
import { getPeople } from "@/apis";
export default {
    name: 'advanced',
    components: {
        MyHeader,
        personnelList
    },
    data(){
        return {
            list: [],
            id: this.$route.query.id,
        }
    },
    methods: {
        toPeople(){
            let data={
                meeting_id: this.id
            }
            getPeople({
               url:'/NewMeeting/getMeetingUser' ,
               data:data,
               currentObject: this
            }).then(res=>{
                if(~~res.status === 200){
                    res = res.data;
                    this.list = res
                }else {
                    //获取失败
                    this.GToast({message:"获取失败"});
                }
            })
        },
        
    },
    created(){
        this.toPeople();
    }
}
</script>
<style lang="stylus" scoped>
.advanced
    padding-top func(44)
    min-height 100vh
    background #E5E5E5
</style>