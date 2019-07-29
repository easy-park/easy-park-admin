<template>
  <a-layout class="home">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="defaultSelectedKeys"
        @click="handleClick"
      >
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <a-icon :type="item.icon" />
          <span>{{ item.text }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      defaultSelectedKeys: ["staff"],
      menuItems: [
        {
          key: "staff",
          icon: "user",
          text: "员工管理"
        },
        {
          key: "parkinglot",
          icon: "user",
          text: "停车场管理"
        },
        {
          key: "clerk",
          icon: "user",
          text: "停车员管理"
        }
      ]
    };
  },
  methods: {
    handleClick(item) {
      this.$router.push("/" + item.key);
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}

.home .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.home .trigger:hover {
  color: #1890ff;
}

.home .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.content {
  padding: 20px;
}
</style>
