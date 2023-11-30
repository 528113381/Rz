<template>
  <div class="role-wrap">
    <div class="add-btn">
      <el-button type="primary" @click="addRole">添加角色</el-button>
    </div>
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
        <template #default="scope">
          <div v-if="scope.row.isEdit">
            {{ editRow.state === 1 ? '已启用' : '未启用' }}
            <el-switch v-model="editRow.state" :active-value="1" :inactive-value="0" style="margin-left: 20px; transform: translateY(-2px);" />
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
      >
        <template v-slot="{ row }">
          <div v-if="row.isEdit">
            <el-button type="primary" size="mini" @click="updateRole">确定</el-button>
            <el-button size="mini" @click="row.isEdit = false">取消</el-button>
          </div>
          <div v-else>
            <el-button type="text" @click="assignPermission(row.id)">分配权限</el-button>
            <el-button type="text" style="margin-right: 5px" @click="editLine(row)">编辑</el-button>
            <el-popconfirm
              title="是否删除该角色"
              @onConfirm="deleteRole(row.id)"
              @onCancel="delCancel"
            >
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        v-if="show"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <addDialog ref="addRef" @ADD_ROLE_SUCCESS="addToPage" />

    <assignPermission v-if="value" :id="id" v-model="value" />
  </div>
</template>

<script>
import { deleteRoleRequest, getRoleListRequest, updateRoleRequest } from '@/api/role'
import addDialog from './components/addDialog.vue'
import assignPermission from './components/AssignPermission.vue'
import lodash from 'lodash'

export default {
  name: 'Role', // 组件名
  components: { addDialog, assignPermission }, // 引入的组件
  data() {
    // 组件的数据
    return {
      tableData: [], // 表格数据
      total: 0, // 数据总数
      page: 1, // 当前页码
      pagesize: 5, // 每页显示的条数
      editRow: {}, // 正在编辑的行
      id: 0, // 角色的ID
      value: false, // 弹窗的显示状态
      show: true // 控制显示的状态
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
    },
    // 数据总数是否只有一项
    onlyOneTotal() {
      return this.total % this.pagesize === 1
    }
  },
  created() {
    // 组件创建时调用获取角色列表的方法
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleListRequest({ page: this.page, pagesize: this.pagesize })
      this.editRow = this.$options.data().editRow
      this.tableData = res.data.rows
      this.tableData.forEach(item => {
        this.$set(item, 'isEdit', false)
      })
      this.total = res.data.total
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    },

    // 每页显示条数变化时的回调
    handleSizeChange(value) {
      this.pagesize = value
      this.getRoleList()
    },

    // 页码变化时的回调
    handleCurrentChange(value) {
      this.page = value
      this.getRoleList()
    },

    // 添加角色
    addRole() {
      this.$refs.addRef.openDialog()
    },

    // 添加角色成功后的回调
    addToPage() {
      if (this.isFullPage) {
        this.page = this.maxPage + 1
      } else {
        this.page = this.maxPage
      }
      // this.$nextTick  等dom加载完毕了以后，在执行数据的操作
      this.getRoleList()
    },

    // 删除后翻页
    delToPage() {
      if (this.onlyOneTotal) {
        this.page = this.maxPage - 1
      }
      // this.$nextTick  等dom加载完毕了以后，在执行数据的操作
      this.getRoleList()
    },

    // 编辑行
    editLine(item) {
      item.isEdit = true
      this.editRow = lodash.cloneDeep(item)
    },

    // 更新角色
    async updateRole() {
      delete this.editRow.isEdit
      await updateRoleRequest(this.editRow)
      // 更新完毕以后，刷新页面，将数据重置
      this.getRoleList()
    },

    // 删除角色
    async deleteRole(id) {
      await deleteRoleRequest(id)
      this.delToPage()
    },

    // 删除取消
    delCancel() {},

    // 给角色分配权限
    assignPermission(id) {
      this.id = id
      this.value = true
    }
  }
}
</script>

<style scoped>
  /* 样式相关的定义 */
</style>
