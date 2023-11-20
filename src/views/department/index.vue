<template>
  <div class="department-wrap">
    <el-tree
      :data="departmentList"
      :props="defaultProps"
    >
      <div slot-scope="{ data: LabelData }" class="item-warp">
        <div class="left">{{ LabelData.name }}</div>
        <div class="right">右边</div>
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
    }
  }
}
</style>
