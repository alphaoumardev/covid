<template>
  <div>
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 10px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/main' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">News</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--  The card-->
    <el-card class="box-card">
      <div style="float: right;">
        <el-input v-model="search"  placeholder="search" clearable style="width: 45%; margin: 10px;"/>
        <el-button icon="el-icon-search" type="primary" @click="getNewsList">Query</el-button>
        <el-button icon="el-icon-plus" type="success" @click="openDialog">Add</el-button>
      </div>

      <!--    The table To display the books-->
      <el-table :data="bookList" stripe style="width: 100%" border max-height="400">

        <el-table-column align="center" prop="id" label="#"  width="80"  />
        <el-table-column align="center" prop="title" label="Newsname"  />
        <el-table-column align="center" prop="author" label="Author" />
        <el-table-column align="center" prop="time" label="Publication"   sortable/>
        <el-table-column align="center"  label="Operations" width="170" >
          <template #default="scope">
            <el-button type="info" icon="el-icon-view" circle @click="details(scope.row)"/>
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
    <!--  The dialog to add the new form-->
    <el-dialog v-model="dialog" :title="boxtitle" @close="onClose" width="50%">
        <el-form ref="elForm" :model="form" :rules="rules" label-width="120px"  label-position="left">
            <el-form-item label="Newsname" prop="title" >
              <el-input v-model="form.title" placeholder="The News title" clearable  prefix-icon='el-icon-book-solid' :style="{width: '100%'}"/>
            </el-form-item>
          <div id="div1"></div>
        </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">Cancel</el-button>
        <el-button type="primary" @click="addNews">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogue" :title="boxtitle"  width="50%">
      <el-card>
        <div v-html="detail.content"/>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>
import request from "../../axios/request";
import E from 'wangeditor';
let editor;
export default
{
  title: "News",
  data()
  {
    return {
      page:1,
      size:10,
      total:0,
      boxtitle:'',
      search:'',
      image:'',
      bookList:[],
      form:{},
      detail:{},
      dialog:false,
      dialogue:false,
      avatarAction: 'http://localhost:9000/files/upload',
      //THIS IS TO ADD THE NEW USER DIALOG
      // image: "https://diallo.oss-cn-shanghai.aliyuncs.com/2021-29-05/fcd1ef7f41454116805132311774362f.jpg?versionId=CAEQLBiBgIDRyJO75xciIDRiMjY2YWYxYzBmZTRiYjE5YjFjOWJhMGJmNGRiZDc0",
      rules: {
        title:
            [{
              required: true, message: 'Prompt your Newsname',trigger: 'blur'
            }],
      },
    }
  },
  created()
  {
    this.getNewsList()
  },
  methods:
      {
        handleSizeChange(val)
        {
          this.size = val;
          this.getNewsList();
        },
        handleCurrentChange(val)
        {
          this.page = val;
          this.getNewsList();
        },
        openDialog()
        {
          this.boxtitle="Add New News"
          this.$nextTick(()=>
          {
              editor = new E('#div1')//the editor div
              editor.config.uploadImgServer='http://localhost:9000/files/editor/upload'
              editor.config.uploadFileName='file' //必须的 the file name from api
              editor.create();
          })
          this.dialog = true
        },
        onClose()
        {
          this.form={}
          this.dialog=false
        },
        edit(row)
        {
          this.form=JSON.parse(JSON.stringify(row))
          this.boxtitle="Edit the News"
          //This is for the editor
          this.$nextTick(()=>
          {
            editor = new E('#div1')
            editor.config.uploadImgServer='http://localhost:9000/files/editor/upload'
            editor.config.uploadFileName='file'
            editor.create();
            editor.txt.html(row.content)
          })
          this.dialog=true
        },
        details(row)
        {
          this.boxtitle="Details"
          this.detail=row
          this.dialogue = true
        },
        addNews()
        {
          this.form.content=editor.txt.html()//put the content

          if (this.form.id)
          {
            request.put("//update", this.form).then(res =>
            {
              if (res.code === '200')
              {
                this.getNewsList()
                return this.$message.success("You have successfully updated the ")
              }
              return this.$message.error("You got an error")
            })
          }
          else
          {
            //This part is to add the other attribute(author, content(above))
            let userStr = sessionStorage.getItem("user")||"{}"
            let user =JSON.parse(userStr)
            this.form.author=user.nickName
            request.post("//add", this.form).then(res =>
            {
              if (res.code === '200')
              {
                this.getNewsList()
                return this.$message.success("You have successfully added a new ")
              }
              return this.$message.error("You got an error")
            })
          }
          this.dialog = false
        },
        getNewsList()
        {
          request.get("/news/list",
              {params: {page: this.page, size: this.size, search: this.search}})
              .then(res =>
              {
                this.bookList = res.data.records
                this.total = res.data.total
                console.log(this.total)
              })
        },

        deleteRow(id)
        {
          request.delete(`/delete/${id}`).then(res=>
          {
            if(res.code==='200')
            {
              this.getNewsList()
              this.$message({type:"success",message:"You have successfully deleted this book"})
            }
          })
        },
        avatarBeforeUpload(file)
        {
          let isRightSize = file.size / 1024 / 1024 < 2
          if (!isRightSize)
          {
            this.$message.error('The photo is more than 2MB please change it and try again')
          }
          let isAccept = new RegExp('image/*').test(file.type)
          if (!isAccept) {
            this.$message.error('You have to choose an image ')
          }
          return isRightSize && isAccept
        },

        handleSuccess (res)
        {
          this.form.cover=res.data
          console.log(res.data)
          this.$message.success("You have successfully uploaded a new cover")

        },
        // closeImage()
        // {
        //   this.imageShow=true
        //   this.imagekey = this.imagekey + 1
        //   this.image = this.user.avatar
        //   this.user.avatar = res.data.url
        // },
        // async addUser()
        // {
        //   const {data:res}=await addUser(this.user)
        //   if(res.code===200)
        //   {
        //     console.log(res.code)
        //     this.$message.success("You have successfully added a new user")
        //     this.user={}
        //     this.$emit('getUserList')
        //     this.$emit('getDepartment')
        //   }
        //
        //   else
        //   {
        //     // this.$message.error("Adding new user has failed"+res.message)
        //   }
        // }
      }
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
.avatar{width: 100px; height: 100px;  border-radius: 100%; }
</style>
