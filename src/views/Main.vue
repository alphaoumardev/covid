<template>
  <div>
    <el-container class="main-container">
      <el-header class="el-header">
        <div class="left-box">
          <img src="../assets/img/timg.gif" alt="aa">
          <span>Covid-19 Management System</span>
        </div>
        <div class="right-box">
            <el-dropdown >
              <img src="../assets/img/timg.gif" alt="Aj">
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><i class="el-icon-house"/>Home</el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-microphone"/>交流</el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-switch-button"/>Logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <el-aside :width="isCallapse?'60px':'210px'">
<!--          Toggle the menu-->
          <div class="toggle-box" @click="toggleCallpase">|||</div>
          <el-menu active-text-color="#ffd04b"  background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff"
            :unique-opened="true"
            :router="true"
            @open="handleOpen"
            @close="handleClose"
            :collapse-transition="false"
            menu-trigger="hover" :collapse="isCallapse">
            <MainTree :menuList="menuList"/>

          </el-menu>

        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import MainTree from "@/components/MainTree";
export default
{
  name: "Main",
  components:
    {
      MainTree
    },
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
      return {
        handleOpen,
        handleClose,
      }
    }},
  data()
  {
    return{
      isCallapse:false,
      activePath:'',
      menuList:
        [
          {
            "id":1,
            "parentId":0,
            "menuName":"Admin",
            "url":'',
            "icon":"el-icon-setting",
            "orderNum":1,
            "open":1,
            "desabled":false,
            "perms":null,
            "type":0,
            "children":
              [{
                "id":254,
                "parentId":1,
                "menuName":"Welcome",
                "url":'/welcome',
                "icon":"el-icon-star-off",
                "orderNum":1,
                "open":0,
                "desabled":false,
                "perms":null,
                "type":0,
              }]
          }
        ],
    }
  },
  methods:
    {
      toggleCallpase()
      {
        this.isCallapse=!this.isCallapse
      }
    }
}
</script>

<style scoped lang="less" >
.main-container{height: 100%;}
.el-header
{
  background-color: #001529;
  color: white;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  .left-box
  {
    display: flex;
    align-items: center;
    img
    {
      width: 60px;
      height: 60px;margin: 0 0 10px 10px;
    }
    span
    {
      margin-left: 20px;
    }
  }
  .right-box
  {
    margin-right: 10px;
    .el-dropdown>img
    {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: lightblue;

    }
  }
}


.el-aside {
  background-color: #001529;
  text-align: center;
  overflow: hidden;

  .el-menu{border-right: none;}
  .toggle-box
  {
    height: 50px;
    text-align: center;
    cursor:pointer;
    background-color: red;
    overflow: hidden;
  }
}

.el-main
{
  background-color: #e9eef3;
}

.el-dropdown-link
{
  cursor: pointer;
  color: blue;
}



</style>
