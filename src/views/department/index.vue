<template>
  <div class="department-wrap">
    <el-tree
      :data="departmentList"
      :props="defaultProps"
      default-expand-all
    >
      <div slot-scope="{ data: LabelData }" class="item-warp">
        <div class="left">{{ LabelData.name }}</div>
        <div class="right">
          <div class="rigth-handler">{{ LabelData.managerName }}</div>
          <el-dropdown>
            <div>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item>编辑部门</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-tree>
  </div>
</template>
<script>
import { departmentRequest } from '@/api/department'
import { transformListTree } from '@/utils'
export default {
  data() {
    return {
      departmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.department()
  },
  methods: {
    async department() {
      const res = await departmentRequest()
      // console.log(res)
      this.departmentList = transformListTree(res.data, 0)
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
