<template>
  <div>
    <el-cascader
      :value="value"
      :options="departmentList"
      :props="props"
      clearable
      @change="handleChange"
    />
  </div>
</template>
<script>
import { transformListTree } from '@/utils'
import { departmentRequest } from '@/api/department'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      departmentList: [],
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  created() {
    this.department()
  },
  methods: {
    handleChange(value) {
      if (value.length > 0) {
        this.$emit('input', value[value.length - 1])
      } else {
        this.$emit('input', 0)
      }
    },
    async department() {
      const res = await departmentRequest()
      this.departmentList = transformListTree(res.data, 0)
    }
  }
}
</script>
