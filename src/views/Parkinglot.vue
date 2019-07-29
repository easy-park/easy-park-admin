<template>
  <div>
    <div class="table-operations">
      <a-row :gutter="20">
        <a-col :span="2">
          <a-button type="primary">新建</a-button>
        </a-col>
        <a-col :span="14"></a-col>
        <a-col :span="3">
          <a-select style="width: 120px">
            <a-select-option key="id" value="id">id</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3">
          <a-input></a-input>
        </a-col>
        <a-col :span="2">
          <a-button type="primary">搜索</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table :pagination="pagination" :columns="columns" :dataSource="list" @change="handleChange" :rowKey="record => record.id">
      <span slot="operation">
        <a href="javascript:;">修改</a>
        <a-divider type="vertical" />
        <a href="javascript:;">冻结</a>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getParkingLot } from "@/api/manage/parkingLot";
export default {
  data() {
    return {
      filteredInfo: null,
      sortedInfo: null,
      pagination: {},
      list:[],
    };
  },
  mounted(){
    getParkingLot().then(res=>{
      if (res.status === 200) {
        this.list = res.data;
      }
    })
  },
  computed: {
    columns() {
      let { sortedInfo, filteredInfo } = this;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "名字",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "大小",
          dataIndex: "capacity",
          key: "capacity"
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ];
      return columns;
    }
  },
  methods: {
    handleChange(pagination, filters, sorter) {
      console.log("Various parameters", pagination, filters, sorter);
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    }
  }
};
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>