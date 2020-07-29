<template>
    <div id="Options">
        <div class="leftTitle">
            <img src="../../assets/img/study/ztjy.png"
                 class="left"
            />
        </div>
        <div class="rightTitle">
            <ul>
                <li :class="{active : flag === 0 }" @click="toggleFlag(0)">治党治国</li>
                <li :class="{active : flag === 1  }" @click="toggleFlag(1)">党的历程</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Options",
        data() {
            return {
                flag : 0
            }
        },
        methods: {
            toggleFlag(flag){
                this.flag = flag;
            }
        },
        components: {},
        created() {
        },
    }
</script>

<style scoped lang="stylus">
    #Options
        width: 100%
        height:54px
        display flex
        align-items center
        box-sizing border-box
        padding: 0 func(10)
        padding-bottom: func(5)
        border-bottom: func(1) solid #e3e3e3
        .leftTitle
            width 50%
            height: func(44)
            display flex
            align-items center
            .left
                height: func(22)
                margin-right:func(15)
            .right
                width:func(120)
                height:func(33)
        .rightTitle
            width 50%;
            height func(44)
            display flex
            justify-content flex-end
            ul
                height:func(44)
                display flex
                align-items center
                li
                    padding 0 func(10)
                    font-size func(14)
                    height func(33)
                    display flex
                    align-items center
                    justify-content center
                    box-sizing border-box
                    color #8A8A8A
                    position: relative
                    &::after
                        position: absolute
                        content ""
                        width: 50%
                        height:func(2)
                        background-color: #4bb344
                        bottom 10%
                        opacity 0
                        transition all .2s;
                    &.active
                        color #4bb344;
                        &::after
                            opacity 1


</style>
