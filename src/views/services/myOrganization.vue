<template>
  <div class="myOrganization">
    <MyHeader :title="'我的组织'" />
    <div class="org-one" v-if="orgList.length>0">
      <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" />
      <span>我的组织</span>
    </div>
    <div class="org-two">
      <div>
        <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" />
        <span>部门名称</span>
      </div>
      <span>{{ orgList.deptName }}</span>
    </div>
    <div class="org-two">
      <div>
        <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" />
        <span>直接上级</span>
      </div>
      <span>{{ orgList.parentDept }}</span>
    </div>
    <div class="org-two">
      <div>
        <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" />
        <span>下级部门</span>
      </div>
      <span>{{ orgList.deptOrg }}</span>
    </div>
    <div class="org-two">
      <div>
        <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" />
        <span>部门性质</span>
      </div>
      <span>{{ orgList.deptAttributes }}</span>
    </div>
    <div class="org-two">
      <div>
        <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" />
        <span>权限管理</span>
      </div>
      <span>{{ orgList.deptPermission }}</span>
    </div>
    <!-- <img src="../../assets/img/noData.png" v-show="orgList.length === 0"/> -->
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { getMyOrg } from "@/apis";
export default {
  name: "mailbox",
  components: {
    MyHeader
  },
  data() {
    return {
      orgList: []
    };
  },
  methods: {
    // 获取我的组织
    getmaibox() {
      getMyOrg({
        data: {},
        currentObject: this
      }).then(res => {
        if (res.code == 200) {
          this.orgList = res.data;
        }
      });
    }
  },
  created() {
    this.getmaibox();
  }
};
</script>
<style lang="stylus" scoped>
.myOrganization {
  width: 100%;
  padding-top: func(64);

  .org-one {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: func(14);
    margin-bottom: func(20);

    img {
      width: func(21);
      height: func(21);
      margin-right: func(18);
    }

    span {
      font-size: func(16);
      color: #6CB127;
    }
  }

  .org-two {
    margin-left: func(20);
    display: flex;
    margin-bottom: func(24);

    span {
      color: #6CB127;
      font-size: func(14);
      margin-left: 0.5rem;
    }

    div {
      width: func(80);

      img {
        width: func(12);
        height: func(12);
        margin-right: func(6);
      }

      span {
        color: #8A8A8A;
        margin-left: 0rem;
      }
    }
  }
}
</style>
