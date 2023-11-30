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
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDEH4cqsd5IEuJRIsBDySfcIiqhOoxpRmq',
  SecretKey: 'oMddLmwqTpvmOjna6LIzPHvKSJtwoQnu'
})

export default {
  props: {
    value: {
      type: String,
      default: null
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
      cos.putObject({
        Bucket: '528113381-1310876796', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: e.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: e.file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        // onProgress: function(progressData) {
        //   console.log(JSON.stringify(progressData))
        // }
        // error first原理
      }, (err, data) => {
        console.log(err || data)
        if (err) {
          console.log(err)
          return
        }
        const url = 'http://' + data.Location
        this.$emit('input', url)
      })
    }
  }
}
</script>
