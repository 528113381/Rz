<template>
  <div>
    <el-dialog
      title="提示"
      :visible="visible"
      @close="close"
    >111{{ visible }}
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
    return {}
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
