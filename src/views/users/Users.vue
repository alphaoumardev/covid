<template>
<div>
  <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 10px; font-size: 15px;">
    <el-breadcrumb-item :to="{ path: '/main' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">Users</a></el-breadcrumb-item>
  </el-breadcrumb>
<!--  The card-->
  <el-card class="box-card">
    <div style="float: right;">
      <el-input v-model="search"  placeholder="search" clearable style="width: 45%; margin: 10px;"/>
      <el-button icon="el-icon-search" type="primary" @click="getUserList">Query</el-button>
      <el-button icon="el-icon-plus" type="success" @click="openDialog">Add</el-button>
    </div>

<!--    The table To display the users-->
    <el-table :data="userList" stripe style="width: 100%" border max-height="400">

      <el-table-column align="center" prop="id" label="#"  width="80"  />
      <el-table-column align="center" prop="username" label="Username"  />
      <el-table-column align="center" prop="sex" label="Gender"  >
        <template v-slot="scope">
          <span class="el-tag el-tag--success el-tag--mini el-tag--light">
            {{scope.row.sex===0?'帅哥':(scope.row.sex===1?'美女':'保密')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="nickname" />
      <el-table-column align="center" prop="age" label="Age"   sortable/>
      <el-table-column align="center" prop="address" label="Address" width="200" />
      <el-table-column align="center" prop="" label="Operations" width="170" >
        <template #default="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"/>
          <el-popconfirm title="Are you sure to delete it?" @confirm="deleteRow(scope.row.id)">
            <template #reference>
              <el-button type="danger" icon="el-icon-delete" circle/>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        :model:currentPage="page" style="text-align: center;"
        :page-sizes="[7, 15, 25, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
  </el-card>
<!--  The dialog to add the new userForm-->
  <el-dialog v-model="centerDialogVisible" title="Add New User" @close="onClose" >
    <el-row :gutter="15">
      <el-form ref="elForm" :model="userForm" :rules="rules" size="medium" label-width="100px" label-position="left">
        <el-col :span="24">
          <el-form-item label="Avatar"  required>
            <img v-if="image"  :src="image" alt="avatar" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            <el-upload
                ref="avatar"
                v-model="image"
                :action="avatarAction"
                :before-upload="avatarBeforeUpload"
                list-type="picture" accept="image/*"
                :auto-upload="true"
                :show-file-list="false"
                :on-success="handleSuccess"
                @close="closeImage"
                v-show="imageShow"
                :data="imagekey"
                :on-change="handleChange"
              >
                <el-button size="small" type="primary" icon="el-icon-upload">Change</el-button>
              </el-upload>
          </el-form-item>
        </el-col><br>
        <el-col :span="12">
          <el-form-item label="Username" prop="username">
            <el-input v-model="userForm.username" placeholder="Your Username" clearable  prefix-icon='el-icon-user-solid' :style="{width: '100%'}"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Password" prop="password">
            <el-input v-model="userForm.password" placeholder="Your Password" clearable   prefix-icon='el-icon-lock' show-password :style="{width: '100%'}"/>
          </el-form-item>
        </el-col>
        <el-col :span="16">
            <el-form-item label="Gander " prop="sex">
              <el-radio-group v-model="userForm.sex" size="medium">
                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nickname" prop="nickname">
            <el-input v-model="userForm.nickname" placeholder="Your Nickname" clearable  prefix-icon='el-icon-user' :style="{width: '100%'}"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Address" prop="address">
            <el-input v-model="userForm.address" placeholder="Your address" clearable :style="{width: '100%'}"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Birthday" prop="age">
            <el-date-picker v-model="userForm.age" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="Your Birthday" clearable/>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">Cancel</el-button>
        <el-button type="primary" @click="addUser">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>
import request from "../../axios/request";
export default
{
  name: "Users",
  data()
  {
    return {
      page:1,
      size:10,
      total:0,
      search:'',
      userList:[],
      imagekey:0,
      imageShow:true,
      centerDialogVisible:false,
      avatarAction: 'http://localhost:9000/files/upload',
      //THIS IS TO ADD THE NEW USER DIALOG
      userForm:{},
      image: "https://diallo.oss-cn-shanghai.aliyuncs.com/2021-29-05/fcd1ef7f41454116805132311774362f.jpg?versionId=CAEQLBiBgIDRyJO75xciIDRiMjY2YWYxYzBmZTRiYjE5YjFjOWJhMGJmNGRiZDc0",

      rules: {
        username:
          [{
            required: true, message: 'Prompt your Username',trigger: 'blur'
          }],
        sex:
          [{
            required: true, message: 'Gender cant be empty',trigger: 'change'
          }],
        nickname:
          [{
            required: true, message: 'Prompt your Nickname', trigger: 'blur'
          }],
        password:
          [{
            required: true, message: 'Prompt your Password', trigger: 'blur'
          }],
        address:
          [{
            required: true, message: 'Prompt your address', trigger: 'blur'
          }],
        age:
          [{
            required: true,  message: 'Select your age',  trigger: 'change'
          }],
      },
      sexOptions:  [
        {
          "label": "Male",
          "value": 1
        },
        {
          "label": "Female",
          "value": 2
        }, {
          "label": "Scret",
          "value": 3
        }],
    }
  },
  created()
  {
    this.getUserList()
  },
  methods:
  {
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
    openDialog()
    {
      this.centerDialogVisible = true
    },
    edit(row)
    {
      this.centerDialogVisible=true
      this.userForm.JSON.parse(JSON.stringify(row))
    },
    addUser()
    {
      if(this.userForm.id)
      {
        request.put("/user/update",this.userForm).then(res =>
        {
          if(res.code==='0')
          {
            this.getUserList()
            return this.$message.success("You have successfully updated the user")
          }
          return this.$message.error("You got an error")
        })
      }
      else
      {
        request.post("/user/add",this.userForm).then(res =>
        {
          if(res.code==='0')
          {
            this.getUserList()
            return this.$message.success("You have successfully added a new user")
          }
          return this.$message.error("You got an error")
        })
      }
      this.centerDialogVisible=false
    },
    getUserList()
    {
      request.get("/user/list",
        {params:{page:this.page,size:this.size,search:this.search}})
        .then(res=>
        {
          this.userList = res.data.records
          this.total = res.data.total
          console.log(this.total)
        })
    },
    handleChange()
    {

    },
    deleteRow(id)
    {
      request.delete(`user/delete/${id}`).then(res=>
      {
        if(res.code=='0')
        {
          this.getUserList()
        }
      })
    }

}}
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
.avatar{width: 100px; height: 100px;  border-radius: 100%; }
</style>
