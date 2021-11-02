<template>
<div>
  <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 10px; font-size: 15px;">
    <el-breadcrumb-item :to="{ path: '/main' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">Users</a></el-breadcrumb-item>
  </el-breadcrumb>
<!--  The card-->
  <el-card class="box-card">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Department">
        <el-select v-model="formInline.city" clearable placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left;">{{item.label}}</span>
            <span style="float: right; color: lightskyblue; font-size: 15px;">{{item.value}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Username" label-width="80px">
        <el-input clearable v-model="formInline.user" placeholder="username"/>
      </el-form-item>
      <el-form-item label="Email" label-width="70px">
        <el-input clearable v-model="formInline.email" placeholder="email"/>
      </el-form-item>
      <el-form-item label="Radio" label-width="70px">
        <el-radio v-model="formInline.radio"  label="1">A</el-radio>
        <el-radio v-model="formInline.radio"  label="2">B</el-radio>
        <el-radio v-model="formInline.radio"  label="3">C</el-radio>
      </el-form-item>
      <el-form-item label="Nickname" label-width="70px">
        <el-input clearable v-model="formInline.nickname" placeholder="nickname"/>
      </el-form-item>
      <el-form-item label-width="70px">
        <el-button icon="el-icon-refresh" type="info" >Reset</el-button>
        <el-button icon="el-icon-search" type="primary" @click="onSubmit">Query</el-button>
        <el-button icon="el-icon-plus" type="success" >Add</el-button>
        <el-button icon="el-icon-download" @click="onSubmit">Nav</el-button>

      </el-form-item>
    </el-form>

<!--    The table-->
    <el-table
      :data="userList"
      style="width: 100%" border
      max-height="400"
    >
      <el-table-column align="center" prop="id" label="#" width="50" />
      <el-table-column align="center" prop="username" label="Username" width="90" />
      <el-table-column align="center" prop="sex" label="Gender" width="70" >
        <template v-slot="scope">
          <span class="el-tag el-tag--success el-tag--mini el-tag--light">
            {{scope.row.sex===0?'帅哥':(scope.row.sex===1?'美女':'保密')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="Department" width="130" sortable/>
      <el-table-column align="center" prop="nickname" label="nickname" width="80" />
      <el-table-column align="center" prop="birth" label="Birthday" width="110"  sortable/>
      <el-table-column align="center" prop="email" label="Email" width="150" />
      <el-table-column align="center" prop="phoneNumber" label="Phone" width="130" />
      <el-table-column align="center"  label="Status" width="90" >
        <template v-slot="scope">
            <el-switch
              :model="scope.row.status===1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="" label="Operations" width="170" >
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="warning" icon="el-icon-setting" circle></el-button>
      </el-table-column>

    </el-table>
      <el-pagination
        v-model:currentPage="page" style="text-align: center;"
        :page-sizes="[7, 15, 25, 40]"
        :page-size="7"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
  </el-card>
</div>
</template>

<script>
import {findUserList} from "../../api/users";

export default
{
  name: "Users",
  data() {
    return {
      formInline:
      {
        user: '',
        email: '',
        city:'',
        radio:'1',
        nickname:'',
      },
      page:1,
      total:'',
      status:1,
      userList:[],
      deptList:[],
      options:
      [
          {
            value: 'Option1',
            label: 'Option1',
          },
          {
            value: 'Option2',
            label: 'Option2',
          },
          {
            value: 'Option3',
            label: 'Option3',
          },
          {
            value: 'Option4',
            label: 'Option4',
          },
          {
            value: 'Option5',
            label: 'Option5',
          },
        ],

    }
  },
  created()
  {
    this.getUserList()
  },
  methods:
  {
    onSubmit() {
      console.log('submit!')
    },
    handleSizeChange(val)
    {
      this.size=val;
      this.getUserList();

    },
    handleCurrentChange(val)
    {
      this.page=val;
      this.getUserList();
    },
    async getUserList()
    {
      await findUserList(this.page,this.size).then(res=>
      {
        this.userList=res.data.data.users
      })

      console.log(this.userList)

    },

  },
}
</script>

<style scoped lang="less">
.el-table .warning-row
{
  --el-table-tr-background-color: var(--el-color-warning-lighter);
}
.el-table .success-row
{
  --el-table-tr-background-color: var(--el-color-success-lighter);
}
</style>
