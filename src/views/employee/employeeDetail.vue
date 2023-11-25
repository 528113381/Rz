<template>
  <div class="detail-wrap">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="200px"
      size="mini"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="ruleForm.workNumber" disabled />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <SelectDepartment v-model="ruleForm.departmentId" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="ruleForm.formOfEmployment"
          placeholder="请选择活动区域"
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="ruleForm.timeOfEntry"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="ruleForm.correctionTime"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="员工头像" prop="staffPhoto">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
        >
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{
          $route.params.id ? "更新" : "保存"
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import SelectDepartment from './components/select-department.vue'
export default {
  components: { SelectDepartment },
  data() {
    const validator = (rules, value, callback) => {
      if (value === 0) {
        callback(new Error('请选择部门'))
        return
      }
      callback()
    }
    return {
      ruleForm: {
        username: '',
        workNumber: '',
        departmentId: 0,
        mobile: '',
        formOfEmployment: '',
        timeOfEntry: '',
        correctionTime: '',
        staffPhoto: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 4, message: '用户名必须是1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入正常手机号的格式',
            trigger: 'blur'
          }
        ],
        departmentId: [
          { validator, trigger: 'change' }
        ]
      }
    }
  },
  create() {
    console.log(this.$route.params)
  },

  methods: {
    submitForm() {}
  }
}
</script>
<style lang="scss" scoped>
.detail-wrap {
  width: 500px;
  ::v-deep .el-cascader ,.el-select {
    width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

