<template>
  <el-dialog
    title="新增权限点"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item label="开启" prop="enVisible">
        <el-switch
          v-model="ruleForm.enVisible"
          active-color="#13ce66"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item class="btn-contain">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addPermissionRequest } from '@/api/permission'
export default {
  props: {
    type: {
      type: Number,
      required: true
    },
    pid: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    const validatorName = (rules, value, callback) => {
      if (this.list.some(item => item.name === value)) {
        callback(new Error('权限名称不能重复'))
        return
      }
      callback()
    }
    const validatorCode = (rules, value, callback) => {
      if (this.list.some(item => item.code === value)) {
        callback(new Error('权限标识不能重复'))
        return
      }
      callback()
    }
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        code: '',
        description: '',
        enVisible: '0'
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
          { validator: validatorName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
          { validator: validatorCode, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '权限描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    async submitForm() {
      this.$refs.formRef.validate(async(value) => {
        if (value) {
          await addPermissionRequest({ ...this.ruleForm, type: this.type, pid: this.pid })
          this.dialogVisible = false
          this.$emit('ADD_SUCCESS')
        }
      })
    },
    cancel() {}
  }
}
</script>

<style lang="scss">
btn-contain {
  .el-form-item__content {
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
::v-deep.btn-contain {
  .el-form-item__content {
    text-align: center;
  }
}
</style>
