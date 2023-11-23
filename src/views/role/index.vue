<template>
  <div class="role-wrap">
    <!-- 添加按钮 -->
    <div class="add-btn">
      <el-button type="primary" @click="addRole">添加角色</el-button>
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
      >
        <template v-slot="{row}">
          <el-input v-if="row.isEdit" v-model="editRow.name" />
          <div v-else>{{ row.name }}</div>

        </template>
      </el-table-column>
      <el-table-column
        label="启用"
        width="180"
      >
        <!-- <div slot-scope="scope" @click="fn(scope)">
          {{ scope.row.state === 1 ? '已启用' : '未启用' }}
        </div> -->
        <!-- <template v-slot="scope"> -->
        <template #default="scope">
          <div v-if="scope.row.isEdit">
            {{ editRow.state === 1 ? '已启用' : '未启用' }}<el-switch v-model="editRow.state" :active-value="1" :inactive-value="0" />
          </div>
          <div v-else>{{ scope.row.state === 1 ? '已启用' : '未启用' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      >
        <template v-slot="{row}">
          <el-input v-if="row.isEdit" v-model="editRow.description" type="textarea" />
          <div v-else>{{ row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      ><template v-slot="{row}">
        <div v-if="row.isEdit">
          <el-button type="primary" size="mini" @click="updateRole(editRow)">确定</el-button>
          <el-button size="mini" @click="row.isEdit = false">取消</el-button>
        </div>
        <div v-else>
          <el-button type="text">分配权限</el-button>
          <el-button type="text" @click="editLine(row)">编辑</el-button>
          <el-button type="text">删除</el-button>
        </div>

      </template>
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
    <addDialog ref="addRef" @ADD_ROLE_SUCCESS="toPage" />
  </div>
</template>
<script>
import { getRoleListRequest, updateRoleRequest } from '@/api/role'
import addDialog from './components/addDialog.vue'
import lodash from 'lodash'
export default {
  name: 'Role',
  components: { addDialog },
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      pagesize: 5,
      editRow: {}
    }
  },
  computed: {
    // 最大页码值
    maxPage() {
      return Math.ceil(this.total / this.pagesize)
    },
    // 每页数据是否刚好填满
    isFullPage() {
      return this.total % this.pagesize === 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleListRequest({ page: this.page, pagesize: this.pagesize })
      this.tableData = res.data.rows
      this.tableData.forEach(item => {
        this.$set(item, 'isEdit', false)
      })
      this.total = res.data.total
    },
    handleSizeChange(value) {
      this.pagesize = value
      this.getRoleList()
    },
    handleCurrentChange(value) {
      this.page = value
      this.getRoleList()
    },
    addRole() {
      this.$refs.addRef.openDialog()
    },
    toPage() {
      if (this.isFullPage) {
        this.page = this.maxPage + 1
      } else {
        this.page = this.maxPage
      }
      // this.$nextTick  等dom加载完毕了以后，在执行数据的操作
      this.getRoleList()
    },
    editLine(item) {
      item.isEdit = true
      this.editRow = lodash.cloneDeep(item)
    },
    async updateRole(row) {
      delete row.isEdit
      await updateRoleRequest(row)
      this.getRoleList()
    }
  }

}
</script>
<style scoped>
::v-deep .el-switch__core{
  margin-left: 20px;
}
</style>
