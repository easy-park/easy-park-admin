<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle" :style="{backgroundImage: `url(${config.img})`}">
      </div>
    </div>
    <div class="content">
      <h1>{{ config.title }}</h1>
      <div class="desc">{{ config.desc }}</div>
      <div class="actions">
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      config: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        title: '404',
        desc: '抱歉，你访问的页面不存在或仍在开发中'
      }
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>
<style lang="less">
.exception {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;

  .imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    zoom: 1;
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }

  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: auto;

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>
