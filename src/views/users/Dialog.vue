<template>
  <el-button type="text" @click="centerDialogVisible = true"
  >Click to open the Dialog</el-button
  >

  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span
    >It should be noted that the content will not be aligned in center by
      default</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props:
    {
      centerDialogVisible:
        {
          type: Boolean,
          default: false
        },
    },
  data()
  {
    return{centerDialogVisible:false,}
  },
  watch:
    {
      centerDialogVisible()
      {
        this.centerDialogVisible=this.centerDialogVisible()
      }
    }
}
</script>

<style scoped>

</style>
