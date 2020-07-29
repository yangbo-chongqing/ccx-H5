<template>
  <div id="poveryDevelopment">
    <MyHeader :title="'发展现状'" />
    <div class="box">
      <div class="oneBox">
        <div class="imgBox">
          <div>
            <img src="http://119.3.196.255:7604/images/iconPic/dt01.png" />
          </div>
          <p>收入状况</p>
        </div>
      </div>
      <div class="listBox">
        <div class="listone">
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>农名每年人均收入</p>
            <p class="lasttext">{{list.per_capita_income}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>村集体经济收入</p>
            <p class="lasttext">{{list.community_income}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="oneBox">
        <div class="imgBox">
          <div>
            <img src="http://119.3.196.255:7604/images/iconPic/dt02.png" />
          </div>
          <p>交通状况</p>
        </div>
      </div>
      <div class="listBox">
        <div class="listone">
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>行政村是否通客运班车</p>
            <p class="lasttext">{{list.passenger_car}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="oneBox">
        <div class="imgBox">
          <div>
            <img src="http://119.3.196.255:7604/images/iconPic/dt03.png" />
          </div>
          <p>社会保障</p>
        </div>
      </div>
      <div class="listBox">
        <div class="listone">
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>参加新型农村合作医疗（人数）</p>
            <p class="lasttext">{{list.insured_number}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>参加城镇职工基本养老保险（人数）</p>
            <p class="lasttext">{{list.endowment_insurance}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { getDevelopment } from "../../apis";
export default {
  name: "poveryDevelopment",
  data() {
    return {
      id: "",
      list: []
    };
  },
  methods: {
    getDevelopment() {
      getDevelopment({
        url: "/communityDetails/getOne",
        data: {
          a_id: this.id,
          del_lag: 0
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          this.list = msg.data[0];
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
    this.getDevelopment();
  }
};
</script>

<style scoped lang="stylus">
#poveryDevelopment {
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
