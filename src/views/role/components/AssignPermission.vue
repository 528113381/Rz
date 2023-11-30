<template>
  <el-dialog
    title="提示"
    :visible="value"
    width="40%"
    @close="close"
  >
    <el-tree
      ref="treeRef"
      :data="permisstionList"
      :props="defaultProps"
      show-checkbox
      default-expand-all
      :expand-on-click-node="false"
      check-strictly
      node-key="id"
    />
    <div style="text-align:center; margin-top: 15px">
      <el-button type="primary" @click="assignPermission">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getPermissionListRequest } from '@/api/permission'
import { transformListTree } from '@/utils'
import { assignPremRequest, getRoleDetailRequest } from '@/api/role'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      permisstionList: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    async init() {
      const res = await getPermissionListRequest()
      console.log(res)
      this.permisstionList = transformListTree(res.data, 0)
      // 发请求获取角色详情
      console.log(this.permisstionList)
      const res2 = await getRoleDetailRequest(this.id)
      console.log('1111', res2.data.permIds)
      this.$refs.treeRef.setCheckedKeys(res2.data.permIds)
    },
    async assignPermission() {
      const res = await assignPremRequest({ id: this.id, permIds: this.$refs.treeRef.getCheckedKeys() })
      this.$message({
        type: 'success',
        message: `${res.message}`
      })
      this.close()
    }
  }
}
</script>
