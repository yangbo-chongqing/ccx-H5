<template>
  <div class="taskDetails">
    <MyHeader :title="'任务详情'" />
    <!-- 标题及上传人信息 -->
    <div class="topBox">
      <div class="tit" v-html="task.mission_title" />
      <div class="upMess">
        <div class="txtbox">
          <span v-html="task.userName   " />
          <p v-html="task.create_time" />
        </div>
      </div>
      <div class="state">
        <img src="../../assets/img/partyServices/clz.png" v-show="~~task.status === 2" />
        <img src="../../assets/img/partyServices/wcl.png" v-show="~~task.status === 0" />
        <img src="../../assets/img/partyServices/ycl.png" v-show="~~task.status === 1" />
        <p>{{ task.missionLevelName }}</p>
      </div>
    </div>
    <!-- 类型及时间 -->
    <div class="otherMess">
      <ul>
        <li>
          <span>事件类型：</span>
          <p v-html="task.MissionType" />
        </li>
        <li>
          <span>提交时间：</span>
          <p v-html="task.create_time" />
        </li>
      </ul>
    </div>
    <!-- 任务内容 -->
    <div class="content" v-html="task.mission_content" />
    <!-- 处理结果 -->
    <div class="result" v-show="~~task.status === 1">
      <div class="tit">
        <p>处理结果</p>
      </div>
      <div class="otherMess">
        <ul>
          <li>
            <span>处理人：</span>
            <p>{{task.userName }}</p>
          </li>
          <li>
            <span>事件严重度：</span>
            <p>{{task.missionLevelName}}</p>
          </li>
          <li>
            <span>要求时间：</span>
            <p v-html="task.demand_time"></p>
          </li>
        </ul>
      </div>
      <div class="con" v-html="task.mission_result_content" />
    </div>
    <!-- 按钮 -->
    <div class="btnBox">
      <a href="javascript:;" class="btn" @click="goUpdata" v-show="~~task.status !== 1">立即处理</a>
      <!-- <button class="btn">立即处理</button> -->
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { getTaskDetails } from "../../apis";
export default {
  name: "taskDetails",
  components: {
    MyHeader
  },
  data() {
    return {
      task: {}
    };
  },
  methods: {
    getTaskDetails(mission_id) {
      getTaskDetails({
        data: { mission_id }
      }).then(msg => {
        if (~~msg.status === 200 && msg.msg === "成功") {
          this.task = msg.data[0];
        }
      });
    },
    goUpdata() {
      this.switchPage({
        pageRouter: "/taskHandle.html",
        params: {
          mission_id: this.task.mission_id,
          mission_userTable_id: this.task.mission_userTable_id,
          status: this.task.status
        }
      });
    }
  },
  created() {
    const mission_id = this.decodeBase64(this.$route.query).mission_id;
    this.getTaskDetails(mission_id);
  }
};
</script>
<style lang="stylus" scoped>
.taskDetails {
  padding: 0 func(15);
  padding-top: func(44);

  .topBox {
    border-bottom: 1px solid #DADADA;
    padding-top: func(10);
    position: relative;
    min-height: func(100);

    .tit {
      color: #444444;
      font-size: func(16);
    }

    .upMess {
      width: 100%;
      display: flex;
      margin-top: func(12);

      .headbox {
        width: func(44);
        height: func(44);
        border-radius: 50%;
        overflow: hidden;
        background: #f2f2f2;
        display: flex;
        align-items: center;
        margin-right: func(14);

        img {
          width: 100%;
        }
      }

      .txtbox {
        span {
          color: #444444;
          font-size: func(14);
        }

        p {
          color: #BFBFBF;
          font-size: func(12);
        }
      }
    }

    .state {
      position: absolute;
      right: 0;
      top: func(19);

      img {
        width: func(46);
        height: func(44);
        border-radius: 50%;
      }

      p {
        color: #D33333;
        font-size: func(12);
        margin-top: func(6);
      }
    }
  }

  .otherMess {
    padding: func(15) 0;
    padding-bottom: func(5);

    ul {
      li {
        display: flex;
        margin-bottom: func(10);

        span {
          color: #8A8A8A;
          font-size: func(12);
        }

        p {
          color: #444444;
          font-size: func(12);
        }
      }
    }
  }

  .content {
    color: #444444;
    font-size: func(16);
    text-indent: 2em;
  }

  .btnBox {
    margin-top: func(50);
    margin-bottom: func(50);
    display: flex;
    justify-content: center;

    .btn {
      width: func(258);
      line-height: func(44);
      text-align: center;
      background: #6CB127;
      color: #ffffff;
      font-size: func(16);
    }
  }

  .result {
    .otherMess {
      padding-top: 0;
    }

    .tit {
      height: func(44);

      p {
        line-height: func(44);
        color: #444444;
        font-size: func(14);
        padding-left: func(36);
        box-sizing: border-box;
        background: url('../../assets/logo.png') no-repeat left;
        background-size: func(21);
      }
    }
  }
}
</style>
