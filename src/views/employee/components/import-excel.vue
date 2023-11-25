<template>
  <el-dialog
    title="提示"
    :visible="value"
    width="45%"
    @close="close"
  >
    <div class="import-wrap">
      <div class="top">
        <input ref="inputfileRef" type="file" class="input-file" accept=".xlsx" @change="fileChange">
        <i class="el-icon-edit top-icon" />
        <a href="#" class="top-download" @click.prevent="exportExcelTemplate">下载导入模板</a>
        <div class="top-upload">
          <span>将文件拖动到此处或</span>
          <a href="javascript:;" @click="importFile">点击上传</a>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" @click="close">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { exportExcelTemplateRequest, importExcelRequest } from '@/api/employee'
import { saveAs } from 'file-saver'
export default {
  name: 'ImportExcelVue',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('input', false)
      this.$refs.inputfileRef.value = ''
    },
    async exportExcelTemplate() {
      const res = await exportExcelTemplateRequest()
      console.log(res)
      saveAs(res, '员工导入模板.xlsx')
    },
    importFile() {
      this.$refs.inputfileRef.click()
    },
    async fileChange(e) {
      try {
        // 上传文件大部分时间使用FormData上传文件
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        await importExcelRequest(formData)
        // 清空上传组件
        this.$refs.inputfileRef.value = ''
        this.close()
        this.$emit('IMPOPT_SUCCESS')
      } catch (error) {
        this.$refs.inputfileRef.value = ''
        console.log('失败')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.import-wrap{
    .top{
        margin: 0px 60px;
        padding: 50px ;
        border: 1px dashed rgba(204,204,204,0.7);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .input-file{
            display: none;
        }
        .top-icon{
            font-size: 50px;
            color: rgba(204,204,204,0.9);
        }
        .top-download{
            margin: 30px 0;
            font-size: 20px;
            color: #007acc;
        }
        .top-upload{
            span{
                color: rgba(204,204,204,0.9);
            }
            a{
                color:#007acc;
                margin-left:9px ;
            }
        }
    }
    .footer{
        padding: 10px;
        text-align: right;
    }
}
</style>
