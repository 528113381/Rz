<template>
  <div class="permission-wrap">
    <div class="top">
      <el-button
        type="primary"
        size="small"
        @click="addPermission(1,0,'add')"
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
          <el-button type="text" @click="addPermission(2,row.id,'add')">添加</el-button>
          <el-button type="text" @click="addPermission(2,row.id,'edit')">编辑</el-button>
          <el-button type="text" @click="deletePermission(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PermissionCom
      v-if="value"
      ref="permissionRef"
      v-model="value"
      :type="type"
      :pid="pid"
      :list="list"
      :is-add-or-edit="isAddOrEdit"
      @ADD_SUCCESS="getPermissionList"
    />
  </div>
</template>

<script>
import { deletePermissionRequest, getPermissionListRequest } from '@/api/permission'
import { transformListTree } from '@/utils/index'
import PermissionCom from './components/PermissionCom.vue'

export default {
  components: { PermissionCom },
  data() {
    return {
      permissionList: [],
      type: 0,
      pid: 0,
      list: [],
      isAddOrEdit: 'add',
      value: false
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
    addPermission(type, pid, isAddOrEdit) {
      this.pid = pid
      this.type = type
      this.isAddOrEdit = isAddOrEdit
      this.value = true
    },
    deletePermission(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deletePermissionRequest(id)
        this.getPermissionList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
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
