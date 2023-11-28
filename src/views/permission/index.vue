<template>
  <div class="permission-wrap">
    <div class="top">
      <el-button
        type="primary"
        size="small"
        @click="addPermission(1,'0')"
      >添加权限</el-button>
    </div>
    <el-table
      :data="permissionList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="180"
      />
      <el-table-column
        prop="code"
        label="标识"
        sortable
        width="180"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        label="操作"
      >
        <template v-slot="{row}">
          <el-button type="text" @click="addPermission(2,row.id)">添加</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PermissionCom ref="permissionRef" :type="type" :pid="pid" :list="list" @ADD_SUCCESS="getPermissionList" />
  </div>
</template>

<script>
import { getPermissionListRequest } from '@/api/permission'
import { transformListTree } from '@/utils/index'
import PermissionCom from './components/PermissionCom.vue'

export default {
  components: { PermissionCom },
  data() {
    return {
      permissionList: [],
      type: 0,
      pid: 0,
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionListRequest()
      console.log(res)
      this.list = res.data
      this.permissionList = transformListTree(res.data, 0)
    },
    addPermission(type, pid) {
      // 这种打开弹出框的方式，是通过ref调用子组件自己的方法
      console.log(this.$refs.permissionRef)
      this.$refs.permissionRef.openDialog()
      this.pid = pid
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.permission-wrap {
  .top {
    margin-bottom: 20px;
  }
}
</style>
