<template>
  <el-dialog title="新增角色" :visible.sync="dialogFromVisible">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="启用" prop="state">
        <el-switch
          v-model="ruleForm.state"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
        />
        {{ ruleForm.state === 1 ? '已启用' : '未启用' }}
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="ruleForm.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { addRoleRequest } from '@/api/role'
export default {
  data() {
    return {
      dialogFromVisible: false,
      ruleForm: {
        name: '',
        state: 0,
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog() {
      this.dialogFromVisible = true
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(value) => {
        if (value) {
          await addRoleRequest(this.ruleForm)
          this.resetForm()
          this.$emit('ADD_ROLE_SUCCESS')
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.dialogFromVisible = false
    }
  }
}
</script>

