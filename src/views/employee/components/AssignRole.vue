<template>
  <el-dialog
    title="分配角色"
    width="40%"
    :visible="value"
    @close="close"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in enableList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <div style="text-align:center; margin-top: 15px">
      <el-button type="primary" size="small" @click="assignRoles">确定</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </div>
  </el-dialog>

</template>
<script>
import { getRoleListEnabledRequest, assignRolesRequest, getEmployeeDetailRequest } from '@/api/employee'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      checkList: [],
      enableList: []
    }
  },
  created() {
    console.log(111)
    this.init()
  },
  methods: {
    async init() {
      const res = await getRoleListEnabledRequest()
      this.enableList = res.data
      const res2 = await getEmployeeDetailRequest(this.id)
      console.log(res2)
      this.checkList = res2.data.roleIds
    },
    close() {
      this.$emit('input', false)
    },
    async assignRoles() {
      const res = await assignRolesRequest({ id: this.id, roleIds: this.checkList })
      this.$message({
        message: `${res.message}`,
        type: 'success'
      })
      this.close()
    }
  }
}
</script>
