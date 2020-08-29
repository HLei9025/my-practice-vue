<template>
  <div class="scroll-wrap" ref="scroll">
    <div class="scroll-content" ref="scrollItem">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'app-scroll',
  props: {
    x: {
      type: Boolean,
      default: false
    },
    y: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    console.log(this.x, this.y)
    //构建滚动视图
    let scroll = (this.scroll = new BScroll(this.$refs.scroll, {
      click: true,
      tap: true,
      scrollX: this.x,
      scrollY: this.y
    }))
    scroll.on('beforeScrollStart', () => {
      scroll.refresh()
    })
  },
  methods: {
    scrollTop() {
      this.scroll.scrollTo(0, 0, 0)
    }
  }
}
</script>

<style>
.scroll-wrap {
  overflow: hidden;
}
</style>
