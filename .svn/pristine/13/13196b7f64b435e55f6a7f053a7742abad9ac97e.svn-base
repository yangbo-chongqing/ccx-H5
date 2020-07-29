<template>
    <div class="personnelList">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <!-- <div class="headImg"><img :src="item.headImg" alt=""></div> -->
                <div class="name">{{item.attendee_user_name}}</div>
                <div class="time">{{item.status}}</div>
                <div class="position">{{item.attendee_user_job}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'personnelList',
    props: {
        list: Array
    },
    data(){
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="stylus" scoped>
.personnelList
    background #ffffff
    padding-left func(15)
    box-sizing border-box
    ul 
        li
            min-height func(97)
            border-bottom 1px solid #DADADA
            position relative
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
            .time
                position absolute
                left func(72)
                top func(53)
                color #6CB127
                font-size func(12)
            .position
                position absolute
                top func(25)
                right func(15)
                color #6CB127
                font-size func(14)
</style>