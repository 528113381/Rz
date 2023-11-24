<template>
  <div class="employee-warp">
    <div class="left" style="background-color: #fff">
      <div style="margin-bottom : 10px">
        <el-input
          v-model="input2"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        />
      </div>
      <el-tree :data="data" :props="defaultProps" />

    </div>
    <div class="right">1112</div>
  </div>
</template>
<script>
export default {
  name: 'Employee',
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.employee-warp{
  display: flex;
  .left{
    flex: 0 0 300px;
    padding:15px;
    height: 700px;

  }
  .right{
    flex: 1 1 0%;
    background-color: #666;
    height: 700px;
    padding: 15px;
  }
}
</style>
