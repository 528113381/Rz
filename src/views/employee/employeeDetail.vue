<template>
  <div class="detail-wrap">
    <el-form
      ref="ruleFormRef"
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
      <el-form-item label="手机" prop="mobile" :disabled="$route.params.id ? true : false">
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
          <el-option label="正式" :value="1" />
          <el-option label="非正式" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="ruleForm.timeOfEntry"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="ruleForm.correctionTime"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="员工头像" prop="staffPhoto">
        <UploadImage :value="ruleForm.staffPhoto" />
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
import { addEmployeeRequest, getEmployeeDetailRequest, updateEmployeeDetailRequest } from '@/api/employee'
import SelectDepartment from './components/select-department.vue'
import UploadImage from './components/upload-image.vue'
export default {
  components: { SelectDepartment, UploadImage },
  data() {
    const validator = (rules, value, callback) => {
      if (value === 0) {
        callback(new Error('请选择部门'))
        return
      }
      callback()
    }
    const validatorCorrectionTime = (rules, value, callback) => {
      // 获取时间戳的三种方式 +new Date() Date.now() new Date().getTime()
      if (new Date(this.ruleForm.timeOfEntry).getTime() > +new Date(value)) {
        callback(new Error('转正时间必须大于入职时间'))
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
          { validator, trigger: 'change', required: true }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式必填', trigger: 'change' }
        ],
        correctionTime: [
          { required: true, message: '入职时间必填', trigger: 'change' },
          { validator: validatorCorrectionTime, trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '转正时间必填', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.init()
  },

  methods: {
    async init() {
      // this.$route.params 有值就是编辑或者查看，没有值就是新增
      if (this.$route.params.id) {
        // 编辑 --- 发请求，将数据回填
        const res = await getEmployeeDetailRequest(this.$route.params.id)
        this.ruleForm = res.data
      } else {
        // 新增
      }
    },
    submitForm() {
      this.$refs.ruleFormRef.validate(async(value) => {
        if (value) {
          if (this.$route.params.id) {
            // 因为编辑的时候，获取用户详情，给this.ruleForm这个对象赋值了很多数据
            // 但是更新的接口有些字段不需要，需要手动删除一些字段
            delete this.ruleForm.departmentName
            delete this.ruleForm.roleIds
            await updateEmployeeDetailRequest(this.ruleForm)
          } else {
            // 进入了这个分支，标签校验成功，然后在发请求
            await addEmployeeRequest(this.ruleForm)
          }

          // this.$router.push('xxxx')
          // this.$router.go(-1)
          this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-wrap {
  width: 500px;
  ::v-deep .el-cascader ,.el-select {
    width: 100%;
  }

  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  ::v-deep .el-upload--text{
    width: 178px;
    height: 178px;
    img{
    width: 178px;
    height: 178px;
    }
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

</style>

