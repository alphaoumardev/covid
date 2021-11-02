<template>
  <div>
    <el-container>
      <el-header class="header" >
        <el-menu :default-active="activeIndex"  class="el-menu" text-color="black"  mode="horizontal"  active-text-color="red"
                 background-color="white"  >
        <!--     @select="handleSelect"-->
          <el-menu-item  id="logo"> <img src="../assets/img/logo.png" alt="logo"></el-menu-item>
          <el-menu-item class="el-menu-item" index="1">Drink
              <el-sub-menu index="2">
                <template #title>item four</template>
              </el-sub-menu>
          </el-menu-item>
          <el-menu-item class="el-menu-item" index="2">Men</el-menu-item>
          <el-menu-item class="el-menu-item" index="3">Women</el-menu-item>
          <el-menu-item class="el-menu-item" index="4">Kids</el-menu-item>
          <el-menu-item class="el-menu-item" index="5">Activewear</el-menu-item>
          <el-menu-item class="el-menu-item" index="6">Beauty</el-menu-item>
          <el-menu-item class="el-menu-item" index="7">HomeKit</el-menu-item>
          <el-menu-item class="el-menu-item" index="8">Books</el-menu-item>
          <el-menu-item class="el-menu-item" index="9">Electronic</el-menu-item>
          <el-menu-item class="el-menu-item" index="10">Gifts</el-menu-item>

          <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">Me</el-avatar>

          <div class="item">
            <el-dropdown  :split-button="true" size="mini">
              <span class="el-dropdown-link">My Order </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :to="{path:'/about'}">about</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown id="order"  :split-button="true" size="mini">
            <span class="el-dropdown-link"> My Account</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><router-link class="router-link" to="./login"><i class="bi bi-person-check-fill"/>Log in</router-link></el-dropdown-item>
                  <el-dropdown-item><router-link class="router-link" to="./register"><i class="bi bi-geo-alt"/>Register</router-link></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default
{
  name: "Header",
  data()
  {
    return {activeIndex:"1"}
  },
  created()
  {

  },
  methods:
  {

  }

}
</script>

<style scoped>
  img{width: 85px;}
  /*#logo{background-image: url("../assets/logo.png"); width: 70px; }*/
  .el-menu-item{  font-weight: bold; font-size: 14px; }
  .avatar{margin: 10px;float:right;}
  .item{float: right;margin-top:16px; right:100px;   }
  .el-dropdown-link {cursor: pointer; color: black; }
  .el-icon-arrow-down { font-size: 12px;}
  .header{ margin-top: 0; left: 0; top: 0;width: 100%; height: auto; position: fixed}
  .router-link{font-size: 15px; color: black; text-underline-style:none;}
  #order{padding:15px;}
</style>