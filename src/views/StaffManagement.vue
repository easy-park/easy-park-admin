<template>
  <a-table class="staff" :columns="columns" :dataSource="data" :rowKey="(row) => row.id">
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
    </span>
    <span slot="action">
      <a href="javascript:;">修改</a>
      <a-divider type="vertical" />
      <a href="javascript:;">冻结</a>
    </span>
  </a-table>
</template>

<script>
const columns = [{
  dataIndex: 'id',
  title: 'Id'
}, {
  dataIndex: 'name',
  title: '姓名'
}, {
  dataIndex: 'email',
  title: '邮箱'
}, {
  title: '电话号码',
  dataIndex: 'phoneNumber'
}, {
  title: '操作',
  scopedSlots: { customRender: 'action' }
}]

const data = [{
  id: 1,
  name: 'John Brown',
  email: 'johnbrown@qq.com',
  phoneNumber: '13602800488',
  tags: ['nice', 'developer']
}, {
  id: 2,
  name: 'Jim Green',
  email: 'jimgreen@126.com',
  phoneNumber: '13602800480',
  tags: ['loser']
}, {
  id: 3,
  name: 'Joe Black',
  email: 'joeblack@136.com',
  phoneNumber: '13602800489',
  tags: ['cool', 'teacher']
}]

export default {
  data () {
    return {
      data,
      columns
    }
  }
}
</script>

<style scoped>
.staff {
  background: white;
}
</style>
