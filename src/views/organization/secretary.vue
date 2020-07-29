<template>
  <div id="secretary">
    <MyHeader :title="'书记考核'" />
    <div v-for="(item , index) in examList" :key="index">
      <div v-if="item.isExam==0" class="exam-list">
        <div class="exam-title">
          <p>{{item.title}}</p>
          <p>{{item.remark}}</p>
        </div>
        <div>
          <button class="exam-btn" @click="goScoring(item)">为TA打分</button>
        </div>
      </div>
    </div>
    <div v-for="(item , index) in examList" :key="index">
      <div v-if="item.isExam==1" class="red-list">
        <div class="exam-title">
          <p>{{item.title}}</p>
          <p>{{item.remark}}</p>
        </div>
        <div>
          <button class="exam-btn" disabled>为TA打分</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { getScore, outRate } from "../../apis";
export default {
  name: "secretary",
  data() {
    return {
      examList: [],
      staute: ""
    };
  },
  methods: {
    getScore() {
      getScore({
        url: "examQuest/listPaperBeExam",
        data: { status: 1 }
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data.list;
          this.examList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    goScoring(item) {
      this.$router.push({ path: "/scoring.html", query: { id: item.id } });
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.getScore();
  }
};
</script>

<style scoped lang="stylus">
#secretary {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .exam-list {
    width: 13.6rem;
    height: 5rem;
    margin: 0 auto 0.8rem auto;
    background: linear-gradient(301.7deg, #220bf7 0%, #f7b0fe 100%);
    -webkit-box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;

    >div:nth-child(2) {
      text-align: center;
    }
  }

  .exam-title {
    color: #FFFFFF;
    padding: 0.6rem;

    >p {
      display: block;
      margin-bottom: 0.2rem;
    }
  }

  .exam-btn {
    background: #fff;
    border-radius: 5px;
    width: 5.44rem;
    height: 1.44rem;
    font-size: 0.6rem;
    color: #6CB127;
    font-weight: 500;
  }
}

.red-list {
  width: 13.6rem;
  height: 5rem;
  margin: 0 auto 0.8rem auto;
  background: linear-gradient(316.52deg, #DB5F89 0%, #FE9D7A 100%);
  -webkit-box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;

  >div:nth-child(2) {
    text-align: center;
  }
}
</style>
