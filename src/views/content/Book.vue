<template>
  <div>
    <el-breadcrumb separator="/" style="padding-left: 10px; padding-bottom: 10px; font-size: 15px;">
      <el-breadcrumb-item :to="{ path: '/main' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">Books</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--  The card-->
    <el-card class="box-card">
      <div style="float: right;">
        <el-input v-model="search"  placeholder="search" clearable style="width: 45%; margin: 10px;"/>
        <el-button icon="el-icon-search" type="primary" @click="getBookList">Query</el-button>
        <el-button icon="el-icon-plus" type="success" @click="openDialog">Add</el-button>
      </div>

      <!--    The table To display the books-->
      <el-table :data="bookList" stripe style="width: 100%" border max-height="400">

        <el-table-column align="center" prop="id" label="#"  width="80"  />
        <el-table-column align="center" prop="name" label="Bookname"  />
        <el-table-column align="center" prop="price" label="Price" /> >
        <el-table-column align="center" prop="author" label="Author" />
        <el-table-column align="center" prop="createTime" label="Publication"   sortable/>
        <el-table-column align="center" prop="cover" label="Cover" width="200" />
        <el-table-column align="center" prop="" label="Operations" width="170" >
          <template #default="scope">
            <el-image style="width: 100px; height: 100px;" :src="scope.row.cover" :preview-src-list="[scope.row.cover]"/>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="Operations" width="170" >
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
    <!--  The dialog to add the new form-->
    <el-dialog v-model="dialog" :title="title" @close="onClose" >
      <el-row :gutter="15">
        <el-form ref="elForm" :model="form" :rules="rules" size="medium" label-width="100px" label-position="left">
          <el-col :span="24">
            <el-form-item label="Avatar"  required>
              <img v-if="image"  :src="image" alt="avatar" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
              <el-upload
                  ref="ref"
                  v-model="image"
                  :action="avatarAction"
                  :before-upload="avatarBeforeUpload"
                  list-type="picture" accept="image/*"
                  :auto-upload="true"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  v-show="true">
                <el-button size="small" type="primary" icon="el-icon-upload">Change</el-button>
              </el-upload>
            </el-form-item>
          </el-col><br>
          <el-col :span="12">
            <el-form-item label="Bookname" prop="name">
              <el-input v-model="form.name" placeholder="The Book name" clearable  prefix-icon='el-icon-book-solid' :style="{width: '100%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Price" prop="price">
              <el-input v-model="form.price" placeholder="The price" clearable   prefix-icon='el-icon-lock' :style="{width: '100%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Author" prop="author">
              <el-input v-model="form.author" placeholder="The author" clearable  prefix-icon='el-icon-book' :style="{width: '100%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Publication" prop="createTime">
              <el-date-picker v-model="form.createTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :style="{width: '100%'}" placeholder="Your Birthday" clearable/>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">Cancel</el-button>
        <el-button type="primary" @click="addBook">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../axios/request";
export default
{
  name: "Book",
  data()
  {
    return {
      page:1,
      size:10,
      total:0,
      title:'',
      search:'',
      image:'',
      bookList:[],
      form:{},
      dialog:false,
      avatarAction: 'http://localhost:9000/files/upload',
      //THIS IS TO ADD THE NEW USER DIALOG
      // image: "https://diallo.oss-cn-shanghai.aliyuncs.com/2021-29-05/fcd1ef7f41454116805132311774362f.jpg?versionId=CAEQLBiBgIDRyJO75xciIDRiMjY2YWYxYzBmZTRiYjE5YjFjOWJhMGJmNGRiZDc0",
      rules: {
        name:
            [{
              required: true, message: 'Prompt your Bookname',trigger: 'blur'
            }],
        price:
            [{
              required: true, message: 'Price cant be empty',trigger: 'change'
            }],
        author:
            [{
              required: true, message: 'Prompt the author', trigger: 'blur'
            }],
        createTime:
            [{
              required: true, message: 'publication', trigger: 'blur'
            }],
      },
    }
  },
  created()
  {
    this.getBookList()
  },
  methods:
      {
        handleSizeChange(val)
        {
          this.size = val;
          this.getBookList();
        },
        handleCurrentChange(val)
        {
          this.page = val;
          this.getBookList();
        },
        openDialog()
        {
          this.title="Add New Book"
          this.dialog = true
          this.$nextTick(()=>
          {
            if(this.$refs['ref'])
            {
              this.$refs['ref'].clearFiles()
            }
          })
        },
        onClose()
        {
          this.form={}
          this.dialog=false
        },
        edit(row)
        {
          this.form=JSON.parse(JSON.stringify(row))
          this.title="Edit the Book"
          this.dialog = true
        },
        addBook()
        {
          if (this.form.id)
          {
            request.put("/book/update", this.form).then(res =>
            {
              if (res.code === '200')
              {
                this.getBookList()
                return this.$message.success("You have successfully updated the book")
              }
              return this.$message.error("You got an error")
            })
          } else {
            request.post("/book/add", this.form).then(res =>
            {
              if (res.code === '200')
              {
                this.getBookList()
                return this.$message.success("You have successfully added a new book")
              }
              return this.$message.error("You got an error")
            })
          }
          this.dialog = false
        },
        getBookList()
        {
          request.get("/book/list",
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
          request.delete(`book/delete/${id}`).then(res=>
          {
            if(res.code==='200')
            {
              this.getBookList()
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
