<template>
  <div>
    <h1>父组件</h1>
    <myel-tree :title="111">
      <!-- 作用域插槽:子组件向外传递数据 -->
      <!-- 旧语法 -->
      <!-- <p slot-scope="abc">传值{{ abc.a }}+++++{{ abc.b }}</p> -->
      <!-- 新语法 -->
      <!-- <template v-slot="abc">
        传值{{ abc.a }}+++++{{ abc.b }}
      </template> -->
      <!-- 简写 -->
      <template #default="abc">
        传值{{ abc.a }}+++++{{ abc.b }}
      </template>
    </myel-tree>
  </div>
</template>
<script>
import SonComVue from './SonCom.vue'
export default {
  name: 'Dashboard',
  components: { 'myel-tree': SonComVue },
  data() {
    return {}
  }
}
</script>
