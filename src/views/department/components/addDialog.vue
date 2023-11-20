<template>
  <div class="add-dialog">
    <el-dialog title="提示" :visible="visible" @close="close">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="1-50字符" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="ruleForm.code" placeholder="1-50字符" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="managerId">
          <el-select
            v-model="ruleForm.managerId"
            placeholder="请选择部门负责人"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="ruleForm.introduce" type="textarea" placeholder="1-300字符" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        code: '',
        managerId: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称必须是1-50字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写部门编号', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编号必须是1-50字符', trigger: 'blur' }
        ],
        managerId: [
          { required: true, message: '请选择部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请填写部门介绍', trigger: 'blur' },
          { min: 1, max: 300, message: '部门编号必须是1-300字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-dialog {
  .el-select {
    width: 100%;
  }
}
</style>
