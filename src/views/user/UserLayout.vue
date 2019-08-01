<template>
  <div class="user-layout">
    <div class="top">
      <div class="header">
        <a href="/">
          <img src="~@/assets/logo.svg" class="logo" alt="logo">
          <span class="title">Easy Park</span>
        </a>
      </div>
    </div>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.user-layout {
  height: 100%;
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 0 0 200px;

  a {
    text-decoration: none;
  }

  .top {
    text-align: center;
    margin: 0 0 40px;

    .header {
      height: 44px;
      line-height: 44px;

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
      }

      .title {
        font-size: 33px;
        color: rgba(0, 0, 0, .85);
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
  }

  .main {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
  }
}
</style>
