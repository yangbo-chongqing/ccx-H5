<template>
  <div id="scoring" v-if="postList">
    <MyHeader :title="'书记考核'" />
    <div class="title">
      {{plNum+1}}
      <span>{{postList[plNum].title}}</span>
    </div>
    <div class="radioBox option">
      <RadioGroup
        class="my-radio radio"
        v-model="radio"
        v-for="(obj, index) in postList[plNum].choices"
        :key="index"
      >
        <Radio
          shape="square"
          class="radio-content"
          :name="obj.choice"
          @click="updataInp"
        >{{obj.choice}}.{{obj.choiceDesc}}</Radio>
      </RadioGroup>
    </div>
    <button v-if="plNum<postList.length-1" class="nexttest" @click="next">下一题</button>
    <button v-else class="nexttest" @click="submit">提交</button>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { RadioGroup, Radio, Toast } from "vant";
import { getTest, getSubmit } from "../../apis";
export default {
  name: "scoring",
  data() {
    return {
      plNum: 0,
      radio: "",
      postList: null,
      name: {
        type: [Number, String],
        required: true
      },
      paperId: "",
      list_map: [],
      userExamId: ""
    };
  },
  methods: {
    getTest() {
      getTest({
        url: "examQuest/getExamPaper",
        data: {
          id: this.paperId
        }
      }).then(msg => {
        if (~~msg.code === 200) {
          this.userExamId = msg.data.userExamId;
          msg = msg.data.titles;
          this.postList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    updataInp() {
      let radio = this.radio;
    },
    next(e, boo) {
      let list_map = this.list_map;
      let radio = this.radio;
      let xb = this.postList[this.plNum].id;
      list_map.push({ titleId: xb, answerId: radio });
      if (radio === "") {
        Toast("您还没有选择答案哦");
      } else {
        this.list_map = list_map;
        this.plNum = boo ? this.plNum : this.plNum + 1;
        // this.plNum+=1;
        this.radio = null;
      }
    },
    // 提交
    submit() {
      this.next(null, true);
      let list_map = this.list_map;
      let data = {
        answers: JSON.stringify(list_map),
        userExamId: this.userExamId
      };
      if (!list_map) {
        Toast("您还没有选择答案哦");
        return;
      }
      getSubmit({
        url: "/examQuest/saveUserExam",
        data: data
      }).then(msg => {
        if (~~msg.code === 0) {
          Toast("提交成功");
        } else {
          Toast("请勿重复提交");
        }
      });
    }
  },
  components: {
    MyHeader,
    RadioGroup,
    Radio
  },
  created() {
    this.paperId = this.$route.query.id;
    this.getTest();
  }
};
</script>

<style scoped lang="stylus">
#scoring {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .title {
    margin: 0.2rem 0.7rem 1rem 0.6rem;
    font-size: 0.64rem;
    color: #444444;
  }

  .option .radio {
    display: block;
    margin-bottom: 0.8rem;
    padding-left: 0.7rem;
    font-size: 0.64rem;

    input {
      vertical-align: baseline;
    }
  }

  .nexttest {
    width: 50%;
    height: 1.84rem;
    color: #fff;
    margin-top: 1rem;
    position: absolute;
    bottom: 2.6rem;
    left: 25%;
    border-radius: 0.3rem;
    font-size: 0.56rem;
    background: #6cb127;
    -webkit-box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
