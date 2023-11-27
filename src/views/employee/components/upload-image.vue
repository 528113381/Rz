<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :http-request="uploadImage"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="value" :src="value">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    beforeAvatarUpload(e) {
      console.log(e)
      // MIME 类型
      // 去网上自己找excel的类型， jpg的类型    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      // 这里的解法是针对el-upload。 如果是原生的 <input type="file" accept="png,jpeg">
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      // 如果文件的 MIME 类型不在允许的数组中
      if (!allowedTypes.includes(e.type)) {
        this.$message.error('上传文件类型只支持 jpeg、png、gif')
        return false
      }
      if (e.size > 10 * 1024 * 1024) {
        this.$message.error('上传文件大小最大只支持10MB')
        return false
      }
      return true
    },
    uploadImage(e) {
      console.log(e)
    }
  }
}
</script>
