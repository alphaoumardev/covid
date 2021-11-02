<template>
<div>
  <el-container>
    <el-footer class="footer">
      <div class="links"><el-link><strong>Customer service</strong></el-link><br>
        <el-link :underline="false">Contact Us</el-link><br>
        <el-link :underline="false">Order Status</el-link><br>
        <el-link :underline="false">Shipping</el-link><br>
        <el-link :underline="false">Return Policy</el-link><br>
        <el-link :underline="false">FAQ</el-link><br>
        <el-link :underline="false">Country</el-link><br>
      </div>

      <div class="links">
        <el-link >
          <strong>
            <router-link class="router-link"  to="./about">About Us</router-link>
          </strong><br>
        </el-link><br>

        <el-link href="http://localhost:8081/#/home" :underline="false">Careers</el-link><br>
        <el-link :underline="false">Responsibility</el-link><br>
        <el-link :underline="false">investors Relation</el-link><br>
        <el-link :underline="false">Press Releases</el-link><br>
        <el-link :underline="false">Get Email Update</el-link><br>
        <el-link :underline="false">Diversity&Inclusion</el-link><br>
        <el-link :underline="false">Mudishop Blog</el-link><br>
      </div>

      <div class="links"><el-link><strong>Store & Services</strong></el-link><br>
        <el-link :underline="false">Find a Store</el-link><br>
        <el-link :underline="false">Help</el-link><br>
        <el-link :underline="false">Store&Card</el-link><br>
        <el-link :underline="false">Payments</el-link><br>
        <el-link :underline="false">Sustainability</el-link><br>
        <el-link :underline="false">Sell on Mudishop</el-link><br>
      </div>

      <div class="links"><el-link><strong>Mudishop & Rewards</strong></el-link><br>
        <el-link :underline="false">The Mudi club</el-link><br>
        <el-link :underline="false">The Mudi Rewards</el-link><br>
        <el-link :underline="false">Mudi&Honbao</el-link><br>
        <el-link :underline="false">Manage My Mudi Card</el-link><br>
      </div>

      <div class="links"><el-link><strong>Mudishop, Inc.</strong></el-link><br>
        <el-link :underline="false">Mudishop China</el-link><br>
        <el-link :underline="false">Mudishop Guinea</el-link><br>
        <el-link :underline="false">The Mudi Club</el-link><br>
      </div>
      <div class="links"><el-link><strong>Connect with MudiShop<i id="wifi" class="bi bi-wifi"/></strong></el-link><br>
        <el-link :underline="false"><i id="face" class="bi bi-facebook"></i></el-link>
        <el-link :underline="false"><i id="youtube" class="bi bi-youtube"></i></el-link>
        <el-link :underline="false"><i id="twitter" class="bi bi-twitter"></i></el-link>
        <el-link :underline="false"><i id="what" class="bi bi-whatsapp"></i></el-link>
        <el-link :underline="false"><i id="inst" class="bi bi-instagram"></i></el-link><br>
        <el-link :underline="false"><i class="el-icon-link"><TwitterOutlined />Weibo</i></el-link><br>
        <el-link :underline="false"><i class="el-icon-link">Wechat</i></el-link><br>
        <el-link :underline="false"><i class="el-icon-link">Tiktok</i></el-link><br>

      </div>
    </el-footer>
  </el-container>
</div>
</template>

<script>
export default
{
  name: "Footer"
}
</script>

<style scoped>
/*.el-footer*/
/*{*/
/*  background-color: white;*/
/*  color: black;font-weight: bold;*/
/*}*/
.footer{ margin-bottom: 0; left: 0; bottom: 0;width: 100%; height: auto; position: relative;}
.links{margin-right:80px;margin-left: 0; float:left; line-height: 35px; }
.bi{font-size:20px;padding:10px;}
#face{color:#0b5ed7;}
#twitter{color:deepskyblue;}
#what{color:green;}
#inst{color:red;}
#youtube{color:red;}
.el-icon-link{font-size:15px;padding:10px;}
.router-link{color:black; text-underline:none;}

</style>