<template>
  <el-dialog
    title="新增权限点"
    :visible="value"
    width="40%"
    @close="close"
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
        <el-button type="primary" @click="submitForm">{{ isEdit? '更新' : '新增' }}</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addPermissionRequest, getPermissionDetailRequest, updatePermissionDetailRequest } from '@/api/permission'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    pid: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    isAddOrEdit: {
      type: String,
      required: true
    }
  },
  data() {
    const validatorName = (rules, value, callback) => {
      let tmp = this.list
      if (this.isAddOrEdit === 'edit') {
        tmp = this.list.filter(item => item.id !== this.pid)
      }
      if (tmp.some(item => item.name === value)) {
        callback(new Error('权限名称不能重复'))
        return
      }
      callback()
    }
    const validatorCode = (rules, value, callback) => {
      let tmp = this.list
      if (this.isAddOrEdit === 'edit') {
        tmp = this.list.filter(item => item.id !== this.pid)
      }
      if (tmp.some(item => item.code === value)) {
        callback(new Error('权限标识不能重复'))
        return
      }
      callback()
    }
    return {
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
  computed: {
    isEdit() {
      return this.isAddOrEdit === 'edit'
    }
  },
  watch: {
    isAddOrEdit: {
      handler(newV, oldV) {
        console.log('watch里面的函数执行：', newV, oldV)
      },
      deep: true, // 如果监听的是一个对象，那么就需要添加deep---深度监听
      immediate: true // 已进入组件，就执行watch的回调函数
    }
  },
  created() {
    this.init()
  },

  methods: {
    async submitForm() {
      this.$refs.formRef.validate(async(value) => {
        if (value) {
          if (this.isEdit) {
            await updatePermissionDetailRequest(this.ruleForm)
          } else {
            await addPermissionRequest({ ...this.ruleForm, type: this.type, pid: this.pid })
          }

          this.close()
          this.$emit('ADD_SUCCESS')
        }
      })
    },
    cancel() {
      this.close()
    },
    close() {
      this.$emit('input', false)
      this.$refs.formRef.resetFields()
    },
    async init() {
      if (this.isAddOrEdit === 'edit') {
        const res = await getPermissionDetailRequest(this.pid)
        this.ruleForm = res.data
      }
    }
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
