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
    <!--  The dialog to add the new bookForm-->
    <el-dialog v-model="dialog" :title="title" @close="onClose" >
      <el-row :gutter="15">
        <el-form ref="elForm" :model="bookForm" :rules="rules" size="medium" label-width="100px" label-position="left">
          <el-col :span="24">
<!--            <el-form-item label="Avatar"  required>-->
<!--              <img v-if="image"  :src="image" alt="avatar" class="avatar"/>-->
<!--              <i v-else class="el-icon-plus avatar-uploader-icon"/>-->
<!--              <el-upload-->
<!--                  ref="avatar"-->
<!--                  v-model="image"-->
<!--                  :action="avatarAction"-->
<!--                  :before-upload="avatarBeforeUpload"-->
<!--                  list-type="picture" accept="image/*"-->
<!--                  :auto-upload="true"-->
<!--                  :show-file-list="false"-->
<!--                  :on-success="handleSuccess"-->
<!--                  @close="closeImage"-->
<!--                  v-show="imageShow"-->
<!--                  :data="imagekey"-->
<!--                  :on-change="handleChange"-->
<!--              >-->
<!--                <el-button size="small" type="primary" icon="el-icon-upload">Change</el-button>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
          </el-col><br>
          <el-col :span="12">
            <el-form-item label="Bookname" prop="name">
              <el-input v-model="bookForm.name" placeholder="The Book name" clearable  prefix-icon='el-icon-book-solid' :style="{width: '100%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Price" prop="price">
              <el-input v-model="bookForm.price" placeholder="The price" clearable   prefix-icon='el-icon-lock' :style="{width: '100%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Author" prop="author">
              <el-input v-model="bookForm.author" placeholder="The author" clearable  prefix-icon='el-icon-book' :style="{width: '100%'}"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Publication" prop="createTime">
              <el-date-picker v-model="bookForm.createTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="Your Birthday" clearable/>
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
      bookList:[],
      bookForm:{},
      dialog:false,

      // imagekey:0,
      // imageShow:true,
      // avatarAction: 'http://localhost:9000/files/upload',
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
        },
        onClose()
        {
          this.bookForm={}
          this.dialog=false
        },
        edit(row)
        {
          this.title="Edit the Book"
          this.dialog = true
          this.bookForm.JSON.parse(JSON.stringify(row))
        },
        addBook()
        {
          if (this.bookForm.id)
          {
            request.put("/book/update", this.bookForm).then(res =>
            {
              if (res.code === '200')
              {
                this.getBookList()
                return this.$message.success("You have successfully updated the book")
              }
              return this.$message.error("You got an error")
            })
          } else {
            request.post("/book/add", this.bookForm).then(res =>
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
                this.$message.success("Welcome here!")
                this.bookList = res.data.records
                this.total = res.data.total
                console.log(this.total)
              })
        },
        handleChange()
        {

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
        }
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
