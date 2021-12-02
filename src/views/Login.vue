<template>
  <div class="login-container">
    <div class="login-left">
      <img src="@/assets/img/log.jpg" alt="The logo"  style="width:500px; height: 450px; border-radius: 20px;">
    </div>
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar-box">
        <img src="../assets/img/login_logo.png" alt="">
      </div>
      <!-- 标题 -->
      <div class="title"> Log in </div>
      <!-- 登陆表单 -->
      <el-form ref="form" class="login-form" :model="form" :rules="rules" label-position="top">
        <el-form-item prop="username" label="Username">
          <el-input  v-model="form.username" placeholder="Please input your username" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input v-model="form.password" placeholder="Please input your password" show-password prefix-icon="el-icon-lock" />
        </el-form-item>

          <el-form-item>
            <div style="display: flex; background-color: #86b7fe; border-radius: 5px;">
              <el-input prefix-icon="el-icon-key" v-model="form.validCode" style="width: 60%;" placeholder="input the code"></el-input>
              <LoginCode @input="createValidCode" />
            </div>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitLogin">login</el-button>
        </el-form-item>
        <el-form-item>
          Don't you have an account? <el-button type="text"  @click="$router.push('/register')"> Register -->></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../axios/request";
import LoginCode from "../components/LoginCode";
export default
{
  name:"Login",
  components:{LoginCode},
  data()
  {
    return {
      form:{},
      validCode: '',
      rules:
      {
        username:
        [
          { required: true, message: '请输入登陆账户', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:
        [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {sessionStorage.removeItem("user")},
  methods:
  {
     createValidCode(data)
     {
      this.validCode = data
     },
    submitLogin()
    {
      this.$refs['form'].validate(valid =>
      {
        if(valid)
        {
          if(!this.form.validCode)
          {
            this.$message({type:"error",message:"Please input the code! "})
            return
          }
          if(this.form.validCode.toLowerCase() !== this.form.validCode.toLowerCase())
          {
            this.$message({type:"error",message:"The validCode is incorrect!"})
            return
          }
          request.post("user/login", this.form).then(res=>
          {
            if(res.code==='200')
            {
              this.$message({type:"success",message:"登陆成功"})
              sessionStorage.setItem("user", JSON.stringify(res.data))
              this.$router.push('/users')
            }
            else  this.$message({type:"error",message:"登陆失败"})
          })
        }
      })
    }
  },
}
</script>

<style  scoped>
.login-container
{
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align-all: center;
  margin-top:50px;
}
  .login-left
  {
    margin-right: 100px;
  }
  /*.photo{border-radius: 10px;}*/

  .login-box
  {
    width: 500px;
    height: 500px;
    background: #fff;
    padding: 50px;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
  }
  .avatar-box
  {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    text-align: center;
    line-height: 100px;
    position: absolute;
    top: -40px;
    right: 190px;
    background: #fff;
    }

    .title
    {
      position: absolute;
      top: 100px;
      left:50%;
      transform: translate(-50%);
      font-size: 18px;
      color: #444;
    }

    .login-form
    {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      padding: 0 20px;
      width: 80%;
      box-sizing: border-box;
    }
    .login-btn
    {
      width: 100%;
    }
/*.verifyCode_box*/
/*{*/
/*  display: flex;*/
/*}*/
/*.verifyCode {*/
/*  width: 70%;*/
/*  justify-content: left;}*/

/*.verifyCode_img {*/
/*  padding-left: 5px;*/
/*  padding-top: 2px;*/
/*  width: 25%;*/
/*  height: 35px;*/
/*  justify-content: flex-end;*/
/*  cursor: pointer;*/
/*}*/
/*img {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  border-radius: 50%;*/
/*  background-color: #EEEEEE;*/
/*}*/

/*img[src=""], img:not([src]) {*/
/*  opacity: 0;*/
/*  border: none;*/
/*  visibility: hidden;*/
/*  max-width: none;*/
/*}*/
</style>

