<template>
  <a-layout class="home">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys">
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
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false,
      defaultSelectedKeys: ['staff'],
      menuItems: [
        {
          key: 'staff',
          icon: 'user',
          text: '员工管理',
          routeTo: '/'
        },
        {
          key: 'parkinglot',
          icon: 'user',
          text: '停车场管理',
          routeTo: '/'
        },
        {
          key: 'clerk',
          icon: 'user',
          text: '停车员管理',
          routeTo: '/'
        }
      ]
    }
  }
}
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
  transition: color .3s;
}

.home .trigger:hover {
  color: #1890ff;
}

.home .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
