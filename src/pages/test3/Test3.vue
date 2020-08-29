<template>
  <div class="test3 page">
    <!-- <a-date-picker @change="onChange" /> -->

    <input type="text" v-model="msg" />
    {{ msg | capitalize }}
    <br />
    <button @click="one(), two()">点我</button>
    <p v-on="{ click: clickAction, mousemove: moveAction }">我是一个P</p>
    <button @click="OneAndTwo">再点我</button>
  </div>
</template>
<script>
// import DatePicker from "ant-design-vue/lib/date-picker";
// import "ant-design-vue/dist/antd.css";
export default {
  name: 'test3',
  components: {
    // [DatePicker.name]: DatePicker
  },
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    one() {
      console.log(111)
    },
    two() {
      console.log(222)
    },
    clickAction() {
      console.log('我被点了')
    },
    moveAction() {
      console.log(666)
    },
    OneAndTwo() {
      this.one()
      this.two()
    }
  }
}
</script>

<style>
/* .ant-input {
    background-color: yellow;
} */
</style>
