<template>
  <div>v2
    <h2>子组件</h2>
    <slot :a="count" :b="list">555555555默认内容</slot>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data() {
    return {
      count: 100,
      list: [1, 2, 3]
    }
  }

}
</script>
