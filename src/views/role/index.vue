<template>
  <div class="role-wrap">
    <!-- 添加按钮 -->
    <div class="add-btn">
      <el-button type="primary">添加角色</el-button>
    </div>
    <!-- table表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="角色"
        width="180"
      />
      <el-table-column
        label="启用"
        width="180"
      >
        <!-- <div slot-scope="scope" @click="fn(scope)">
          {{ scope.row.state === 1 ? '已启用' : '未启用' }}
        </div> -->
        <!-- <template v-slot="scope"> -->
        <template #default="scope">
          {{ scope.row.state === 1 ? '已启用' : '未启用' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        label="操作"
        width="200"
      >
        <el-button type="text">分配权限</el-button>
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <div>
      <el-pagination
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getRoleListRequest } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      pagesize: 3
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleListRequest({ page: 1, pagesize: 10 })
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }

}
</script>
