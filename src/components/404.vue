<template>
    <div class="contianer">
        <div class="exception">
            <div class="img-block">
                <div class="img-404"></div>
            </div>
            <div class="content">
                <h1>404</h1>
                <div class="desc">抱歉，你访问的页面不存在</div>
                <el-button type="primary" @click="backHome()">返回首页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        backHome() {
            this.$router.push({ path: '/nnc1' })
        }
    }
}
</script>

<style scoped>
  .contianer {
    margin: 200px 24px 0px;
    height: 100%;
  }

  .exception {
      min-height: 500px;
      height: 80%;
      display: flex;
  }

  .img-block {
    width: 50%;
    padding-right: 152px;
    zoom: 1;
  }

  .img-404 {
    background: url('/static/404.svg') no-repeat center;
    height: 360px;
    width: 100%;
    max-width: 430px;
    float: right;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
      flex: 1;
  }

  .desc {
    color: rgba(0,0,0,.45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
</style>
