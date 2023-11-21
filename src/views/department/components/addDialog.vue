<template>
  <div class="add-dialog">
    <el-dialog
      :title="isEdit ? '编辑部门' : '新增部门'"
      :visible="visible"
      width="50%"
      @close="resetForm"
    >
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
            clearable
          >
            <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="ruleForm.introduce" type="textarea" placeholder="1-300字符" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >{{ isEdit?'更新':'创建' }}</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addDepartmentRequest, getDepartmentDetailRequest, simpleListRequest } from '@/api/department'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    currentId: {
      type: [Number, String],
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const ValidatorName = (rules, value, callback) => {
      if (this.list.some((item) => item.name === value)) {
        callback(new Error('当前部门名称已存在,请重新输入'))
        return
      }
      callback()
    }
    const ValidatorCode = (rules, value, callback) => {
      if (this.list.some((item) => item.code === value)) {
        callback(new Error('当前部门编码已存在,请重新输入'))
        return
      }
      callback()
    }
    return {
      managerList: [],
      ruleForm: {
        name: '',
        code: '',
        managerId: '',
        introduce: ''
      },

      rules: {
        name: [
          { required: true, message: '请填写部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称必须是1-50字符', trigger: 'blur' },
          { validator: ValidatorName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写部门编号', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编号必须是1-50字符', trigger: 'blur' },
          { validator: ValidatorCode, trigger: 'blur' }
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
  watch: {
    list(newVal, oldVal) {},

    async currentId(newVal) {
      if (this.isEdit && newVal) {
        const { data } = await getDepartmentDetailRequest(newVal)
        this.ruleForm.name = data.name
        this.ruleForm.code = data.code
        this.ruleForm.introduce = data.introduce
        this.ruleForm.managerId = data.managerId
      }
    }
  },
  created() {
    this.simpleList()
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('RESET_PROPS')
    },
    async simpleList() {
      const res = await simpleListRequest()
      this.managerList = res.data
    },
    submitForm() {
      this.$refs.ruleForm.validate(async value => {
        if (value) {
          console.log(this.ruleForm)
          await addDepartmentRequest({ ...this.ruleForm, pid: this.currentId })
          this.resetForm()
          this.$emit('ADD_SUCCESS')
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.close()
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
