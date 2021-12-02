<template>
  <el-card style="padding: 20px">
    <div class="container" style="width:950px; height: 650px;"></div>
  </el-card>
</template>

<script>
let map;
// import BMap from 'BMap'
export default
{
  name: "Map",
  mounted()
  {
    // map = new BMap.Map("container");
    // map.centerAndZoom(BMap.Point(116.404, 39.915), 12)
    // map.enableScrollWheelZoom(true)
    //
    // let geolocation = new BMap.Geolocation()
    // geolocation.getCurrentPosition(function (r)
    // {
    //   if(this.getStatus()===BMAP_STATUS_SUCCESS)
    //   {
    //     const mk = new BMap.Marker(r.point);
    //     map.addOverlay(mk)
    //     map.panTo(r.point)
    //   }
    // });
  }
}
</script>

<style scoped>

</style>
