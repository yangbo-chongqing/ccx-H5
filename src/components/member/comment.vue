<template>
<div>
    <div class="comment" v-for="(item, index) in list" :key="index">
        <img :src="item.popImg" alt="" srcset="">
        <div class="textbox">
            <p>{{item.popName}}</p>
            <p>{{item.createdate}}</p>
            <p>{{item.comment_content}}</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "comment",
    props: {
        list: Array
    }
}
</script>
<style lang="stylus" scoped>
    .comment
        width 100%
        background #ffffff
        padding func(12) func(15) func(20) func(12)
        box-sizing border-box
        position relative
        display flex
        img
            width func(36)
            height func(36)
            border-radius 50%
        .textbox
            margin-left func(12)    
            p:nth-child(1)
                color #444444
                font-size func(14)
            p:nth-child(2)   
                 color #8A8A8A
                 font-size func(12)
                 margin-top func(8)
            p:nth-child(3)    
                 color #444444
                 font-size func(14)  
                 margin-top func(16)
</style>