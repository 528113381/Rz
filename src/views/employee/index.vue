<template>
  <div class="employee-warp">
    <div class="left">
      <div style="margin-bottom : 10px">
        <el-input
          v-model="input2"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        />
      </div>
      <el-tree
        ref="treeRef"
        :data="departmentList"
        :props="defaultProps"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        node-key="id"
      />

    </div>
    <div class="right">
      <div class="top">
        <div class="btn-left">
          <el-button size="small"> 群发通知</el-button>
        </div>
        <div class="btn-right">
          <el-button type="primary " size="small">添加员工</el-button>
          <el-button size="small"> excel导入</el-button>
          <el-button size="small"> excel导出</el-button>
        </div>
      </div>
      <el-table
        :data="employeeList"
        style="width:100%;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          align="center"
          label="头像"
          width="70"
        >
          <template v-slot="{row}">
            <img v-if="row.staffPhoto" :src="row.staffPhoto" alt="" width="50" style=" border-radius: 50%;">
            <div v-else class="staff-photo">{{ row.username?.charAt(0) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120"
          align="center"
        />
        <el-table-column
          prop="workNumber"
          label="工号"
          width="120"
          align="center"
        />
        <el-table-column
          label="聘用形式"
          width="100"
          align="center"
        >
          <template v-slot="{ row }">
            {{ row.formOfEmployment === 1 ? '正式员工' : '非正式员工' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门"
          width="120"
          align="center"
        />
        <el-table-column
          prop="timeOfEntry"
          label="入职时间"
          width="120"
          align="center"
        />
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
        >
          <template />
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
import { departmentRequest } from '@/api/department'
import { transformListTree } from '@/utils'
import { getUserListRequest } from '@/api/employee'
export default {
  name: 'Employee',
  data() {
    return {
      input2: '',
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [],
      query: {
        page: 1,
        pagesize: 10,
        keyword: '',
        departmentId: 1
      },
      employeeList: [],
      total: 0

    }
  },
  created() {
    this.department()
  },
  methods: {
    async department() {
      const res = await departmentRequest()
      this.departmentList = transformListTree(res.data, 0)
      this.query.departmentId = this.departmentList[0].id
      this.$nextTick(() => {
        this.$refs.treeRef.setCurrentKey(this.query.departmentId)
      })
      this.getUserList()
    },
    async getUserList() {
      const res = await getUserListRequest(this.query)
      console.log(res)
      this.employeeList = res.data.rows
      this.total = res.data.total
    }
  }

}
</script>
<style lang="scss" scoped>
.employee-warp{
  display: flex;
  background-color: #fff;
  .left{
    flex: 0 0 300px;
    padding:15px;
    height: 700px;

  }
  .right{
    flex: 1 1 0%;
    // height: 700px;
    overflow-x: auto;
    padding: 15px;
    .top{
      display: flex;
      justify-content: space-between;

    }
    .staff-photo {
      width: 45px;
      height: 45px;
      background: lightblue;
      color: white;
      font-size: 20px;
      text-align: center;
      line-height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
