<template>
  <div class="register-container">
    <div class="register-left">
      <img src="../assets/img/log.jpg" alt="The logo"  style="width:500px; height: 500px; border-radius: 10px;">
    </div>
    <div class="register-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="../assets/img/login_logo.png" alt="">
      </div>
      <!-- 标题 -->
      <div class="title">Registration </div>
      <!-- Registration -->
      <el-form ref="registerFormRef" class="register-form" :model="registerForm" :rules="registerFormRules" label-position="top">
        <el-form-item prop="nickName" label="Name">
          <el-input placeholder="Please input your name" prefix-icon="el-icon-user" v-model="registerForm.name"/>
        </el-form-item>
        <el-form-item prop="address" label="Address">
          <el-input placeholder="Please fill your address" prefix-icon="bi bi-geo-alt" v-model="registerForm.address"/>
        </el-form-item>
        <el-form-item  prop="gender" label="Gender" >
          <el-radio-group v-model="registerForm.gender">
            <el-radio label="male"/>
            <el-radio label="female"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="username" label="Username">
          <el-input placeholder="Please input your username" prefix-icon="el-icon-user" v-model="registerForm.username"/>
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input placeholder="Please input your password" show-password prefix-icon="iconfont icon-3702mima" v-model="registerForm.password"/>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input placeholder="confirm your password" show-password prefix-icon="iconfont icon-3702mima" v-model="registerForm.confirm"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="register-btn" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../axios/request";

export default
{
  name: 'Register',
  data(){
    return {
      // 表单的数据绑定对象
      registerForm:{},

      registerFormRules:
      {
        name:
            [
              { required: true, message: '请输入登陆账户', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
        gender:
            [
              { required: true, message: '请输入登陆密码', trigger: 'blur' },
            ],
        address:
            [
              { required: true, message: '请输入登陆密码', trigger: 'blur' },
              { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
        username:
            [
              { required: true, message: '请输入登陆账户', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
        password:
            [
              { required: true, message: '请输入登陆密码', trigger: 'blur' },
              { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
        confirm:
            [
              { required: true, message: '请输入登陆密码', trigger: 'blur' },
              { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]
      }
    }
  },
  methods:
      {
        register()
        {
          if(this.registerForm.password !== this.registerForm.confirm)
          {
            this.$message({type:"error",message:"The passwords are not same!"})
            return false
          }
          this.$refs['registerFormRef'].validate(valid =>
          {
            if(valid)
            {
              request.post("user/register", this.registerForm).then(res=>
              {
                if(res.code==='200')
                {
                  this.$message({type:"success",message:"You have successfully registred!"})
                  sessionStorage.setItem("user", JSON.stringify(res.data))
                  this.$router.push('/login')
                }
                else  this.$message({type:"error",message:"登陆失败"})
              })
            }
          })
        }
      }
}
</script>

<style  scoped>
.register-container
{
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align-all: center;
  margin-top:40px;
}
.register-left
{
  margin-right: 100px;
}

.register-box
{
  width: 500px;
  height: 720px;
  background: #fff;
  padding: 0;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
}
.avatar-box
{
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: -30px;
  right: 230px;
  background: #fff;
}

.title
{
  position: absolute;
  top: 30px;
  left:50%;
  transform: translate(-50%);
  font-size: 18px;
  color: #444;
}

.register-form
{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  padding: 0 20px;
  width: 80%;
  box-sizing: border-box;
}
.register-btn
{
  width: 100%;
}
</style>
