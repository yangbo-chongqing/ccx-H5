<template>
    <div class="checkInStaff">
       <MyHeader :title="'参与人员'"/>
       <div class="menu">
           <div class="itembox" @click="chageMenu(1)">
               <p :class="menu == 1 ? 'active' : ''">已签到</p>
               <span v-if="menu == 1"></span>
           </div>
           <div class="itembox" @click="chageMenu(2)">
               <p :class="menu == 2 ? 'active' : ''">未签到</p>
               <span v-if="menu == 2"></span>
            </div>
       </div>
       <!-- 已签到列表 -->
       <personnelList :list="list" v-if="menu == 1"></personnelList>
       <!-- 未签到列表 -->
       <div class="noSign" v-if="menu == 2">
           <ul>
               <li v-for="(item, index) in list" :key="index">
                    <div class="headImg"><img :src="item.headImg" alt=""></div>
                    <div class="name">{{item.name}}</div>
                    <div class="position">{{item.position}}</div>
                    <div class="icon" @click="callPhone(item.phone)"></div>
                </li>
           </ul>
       </div>
    </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import personnelList from "@/components/member/personnelList";
import { Dialog } from 'vant';
export default {
    name: 'checkInStaff',
    components: {
        MyHeader,
        personnelList,
        Dialog
    },
    data(){
        return {
            menu: 1,//1已签到,2未签到
            list: [
                {
                    headImg: '',
                    name: '张三',
                    position: '书记',
                    time: '2019/12/11',
                    phone: '110'
                },
                {
                    headImg: '',
                    name: '张三',
                    position: '书记',
                    time: '2019/12/11',
                    phone: '110'
                },
                {
                    headImg: '',
                    name: '张三',
                    position: '书记',
                    time: '2019/12/11',
                    phone: '110'
                },
                {
                    headImg: '',
                    name: '张三',
                    position: '书记',
                    time: '2019/12/11',
                    phone: '110'
                }
            ]
        }
    },
    methods: {
        chageMenu(e){
            this.menu = e;
        },
        callPhone(e){
            let phone = e
            Dialog.confirm({
                title: '确认拨号',
                message: phone,
                confirmButtonColor: '#6CB127',
                cancelButtonColor: '#8A8A8A'
            }).then(() => {
                // on confirm
                window.location.href = 'tel://' + phone
            }).catch(() => {
                // on cancel
            });
        }
    }
}
</script>
<style lang="stylus" scoped>
.checkInStaff
    padding-top func(88)
    min-height 100vh
    background #E5E5E5
    .menu
        width 100%
        height func(44)
        background #ffffff
        position fixed
        top func(44)
        left 0
        display flex
        .itembox
            width 50%
            position relative
            p 
                line-height func(44)
                text-align center
                display block
                text-align center
                font-size func(12)
                color #8A8A8A
            p.active 
                color #6CB127
                font-size func(14)
            span 
                position absolute
                width func(20)
                height func(3)
                left: 0
                right 0
                bottom func(6)
                margin auto
                background: #6CB127;
                box-shadow 0px 0px func(4) #6CB127;
                border-radius: func(2);
    .noSign
        padding-left func(15)
        background #ffffff
        box-sizing border-box
        ul 
            li 
                min-height func(97)
                position relative
                border-bottom 1px solid #DADADA
                .headImg
                    width func(60)
                    height func(60)
                    border-radius 50%
                    position absolute
                    top func(16)
                    left 0
                    display flex
                    align-items center
                    overflow hidden
                    background red
                    img
                        width 100%
                .name
                    position absolute
                    width func(220)
                    left func(72)
                    top func(25)
                    font-weight 500
                    color #444444
                    font-size func(14)
                .position
                    position absolute
                    left func(72)
                    top func(53)
                    color #6CB127
                    font-size func(14)
                .icon
                    width func(24)
                    height func(24)
                    background #F73A3A
                    position absolute
                    right func(15)
                    top func(36)
</style>