<template>
  <div id="app">
    <!-- 所有路由入口的导航栏，横向滚动 -->
    <app-scroll class="content-x" :x="true" :y="false">
      <ul class="compo-wrap">
        <li
          class="compo-item"
          v-for="item in compoList"
          :key="item.id"
          :style="{ background: item.color }"
          @click="sendName(item.title, item.name)"
        >
          {{ item.title }}
        </li>
      </ul>
    </app-scroll>
    <h2 class="accent">当前位置：{{ accentName }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compoList: [
        { id: 1, name: '1', title: 'test1', color: this.getColor() },
        { id: 2, name: '2', title: 'test2', color: this.getColor() },
        { id: 3, name: '3', title: 'test3', color: this.getColor() },
        { id: 4, name: '4', title: 'test4', color: this.getColor() },
        { id: 5, name: '5', title: 'test5', color: this.getColor() },
        { id: 6, name: '6', title: 'test6', color: this.getColor() }
      ],
      accentName: 'app'
    }
  },
  created() {
    // 设置滚动的第一个元素的宽度
    this.$nextTick(() => {
      // console.log(this.$children)
      let width = this.compoList.length * 50
      this.$children[0].$refs.scrollItem.style.width = width + 'px'
    })
  },
  // 放在 mounted 或者放在 created 的 this.$nextTick 里都是可以的
  // mounted(){
  //     let width = this.compoList.length * 50;
  //     this.$children[0].$refs.scrollItem.style.width = width + 'px';
  // },
  methods: {
    // 定义随机生成颜色值得函数
    getColor() {
      let cArr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f'
      ]
      let c = '#'
      for (let i = 0; i < 6; i++) {
        let randNum = this.getRand(cArr.length - 1, 0)
        let str = cArr.find((item, index) => index === randNum)
        c += str
      }
      return c
    },
    getRand(max, min) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    // 接收点击路由时的事件，知道点击的哪一个
    sendName(title, name) {
      this.$router.push({ name })
      this.accentName = title
    }
  }
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  #app {
    width: 100%;
    .compo-wrap {
      display: flex;
      flex-wrap: nowrap;
      justify-content: start;
      list-style: none;
      align-items: center;
      text-align: center;
      margin: 0 5px;
      .compo-item {
        width: 50px;
        height: 30px;
        line-height: 30px;
        margin-right: 5px;
        float: left;
      }
    }
    .accent {
      width: 120px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      left: 0;
      top: 40px;
      font-size: 14px;
    }
    .page {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 80px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
.content-x {
  width: 100%;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #444;
  padding: 5px;
  box-sizing: border-box;
}
.router-link-active {
  color: #fff;
}
</style>
