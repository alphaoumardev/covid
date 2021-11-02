<template>
  <div>
    <template v-for="item in this.menuList" :key="item.id">
      <el-submenu :index="item.id+''"   :desabled="item.desabled" >
        <template #title>
          <i :class="item.icon"/>
          <span>{{item.menuName }}</span>
        </template>
        <MainTree :menuList="item.children"/>
<!--        <span>{{item.menuName }}</span>-->

      </el-submenu>
      <el-menu-item  :index="item.id" :desabled="item.desabled"  :route="item.url+''" @click="savePath(item.url)">
        <i :class="item.icon"/>
        <span>{{item.menuName }}</span>
      </el-menu-item>

    </template>
  </div>
</template>

<script>
export default
{
  name: "MainTree",
  props:['menuList'],
  methods:
    {
      savePath(path)
      {
        window.sessionStorage.getItem("activePath",path)
        this.path=path;
      }
    }
}
</script>

<style scoped>
.el-menu{}

</style>
