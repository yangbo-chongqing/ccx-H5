<template>
  <div id="familyMember">
    <MyHeader :title="'家庭成员'" />
    <div class="box">
      <div class="oneBox">
        <div class="imgBox">
          <div>
            <img src="http://119.3.196.255:7604/images/iconPic/ic_villagedetail_1.png" />
          </div>
          <p>家庭成员</p>
        </div>
      </div>
      <div class="listBox" v-for="(item , index) in list" :key="index">
        <div class="listone">
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>姓名</p>
            <p class="lasttext">{{item.popName}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>职业</p>
            <p class="lasttext">{{item.jobName}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>户主身份证</p>
            <p class="lasttext">{{item.popCard}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { getFamily } from "../../apis";
export default {
  name: "familyMember",
  data() {
    return {
      id: "",
      list: []
    };
  },
  methods: {
    getFamily() {
      getFamily({
        url: "/population/getForCountry",
        data: {
          houseId: this.id,
          del_lag: 0
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          this.list = msg.data.list;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.id = this.$route.query.id;
    this.getFamily();
  }
};
</script>

<style scoped lang="stylus">
#familyMember {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .oneBox {
    width: 100%;
    padding: 0.6rem 0.5rem 0 0.5rem;
    box-sizing: border-box;

    .imgBox {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      div {
        width: 0.6rem;
        height: 0.6rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-right: 0.6rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        color: #6CB127;
        font-size: 0.6rem;
      }
    }
  }

  .listBox {
    width: 100%;
    margin-top: 0.9rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;

    .listone {
      width: 100%;
      padding-left: 2rem;
      padding-bottom: 0.6rem;

      .firtlist {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-bottom: 0.6rem;

        .imgbox {
          width: 0.6rem;
          height: 0.6rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin-right: 0.1rem;
          color: #6CB127;
        }

        p {
          font-size: 28rpx;
          color: #8A8A8A;
        }

        .lasttext {
          color: #6CB127;
          font-size: 0.5rem;
          position: absolute;
          right: 0.5rem;
        }
      }
    }
  }

  .box {
    border-top: 1px solid #e5e5e5;
  }
}
</style>
