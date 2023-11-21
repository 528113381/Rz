<template>
  <div class="department-wrap">
    <el-tree
      :data="departmentList"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
    >
      <div slot-scope="{ data: LabelData }" class="item-warp">
        <div class="left">{{ LabelData.name }}</div>
        <div class="right">
          <div class="rigth-handler">{{ LabelData.managerName }}</div>
          <el-dropdown @command="handleCommand($event,LabelData.id)">
            <div>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item command="del">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-tree>
    <!-- 弹出框 -->
    <addDialogVue
      :visible.sync="dialogVisible"
      :list="list"
      :current-id="currentId"
      :is-edit="isEdit"
      @ADD_SUCCESS="department"
      @RESET_PROPS="resetProps"
    />
  </div>
</template>
<script>
import { departmentRequest } from '@/api/department'
import { transformListTree } from '@/utils'
import addDialogVue from './components/addDialog.vue'
import _ from 'lodash'
export default {
  components: { addDialogVue },
  data() {
    return {
      currentId: '',
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      list: [],
      isEdit: false
    }
  },
  created() {
    this.department()
  },
  methods: {
    async department() {
      const res = await departmentRequest()
      // console.log(res)
      this.list = res.data
      const tmp = _.cloneDeep(res.data)
      this.departmentList = transformListTree(tmp, 0)
    },
    handleCommand(value, id) {
      if (value === 'add') {
        this.dialogVisible = true
        this.isEdit = false
      } else if (value === 'edit') {
        this.dialogVisible = true
        this.isEdit = true
      } else {
        //
      }
      this.currentId = id
    },
    resetProps() {
      this.currentId = ''
    }

  }
}
</script>

<style lang="scss" scoped>
.department-wrap{
  padding: 15px;
   .el-tree{
    padding: 30px 140px;
  }
  .item-warp{
    display: flex;
    width: 100%;
    justify-content: space-between;
    .left{
      flex: 1;
      // background-color: aqua;
    }
    .right{
    // background-color: yellowgreen;
    .rigth-handler {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
}
</style>
