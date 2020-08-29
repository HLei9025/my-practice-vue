<template>
  <div class="test1 page">
    <button @click="addInputActive">input</button>
    <button @click="addImgActive">img</button>
    <ul>
      <li v-for="(item, index) in inputAndImgList" :key="index">
        <input type="text" v-if="item.isIpt" v-model="item.iptValue" />
        <img :src="item.src" alt v-if="item.isImg" />
      </li>
    </ul>
    <button @click="getData">确定</button>
    <hr />
    <button @click="testAdd">+1</button>
    <h3>{{ abc }}</h3>
    <h1>{{ eee }}</h1>
  </div>
</template>

<script>
export default {
  name: 'test1',
  data() {
    return {
      inputAndImgList: [],
      srcList: [
        {
          id: 1,
          src:
            'https://p1.meituan.net/movie/967b253953bc7e660cfadbf9d78f67b62852693.jpg@160w_220h_1e_1c',
        },
        {
          id: 2,
          src:
            'https://p1.meituan.net/moviemachine/f4df6f9c2c55e347266e35027da415251124290.jpg@160w_220h_1e_1c',
        },
        {
          id: 3,
          src:
            'https://p0.meituan.net/movie/4bfb08bfe0b8dd20776c6efc4015de6d995158.jpg@160w_220h_1e_1c',
        },
      ],
      count: 0,
      imgId: 0,
      iptId: 0,
      allData: {},
      abc: 0,
      eee: 1,
    }
  },
  updated() {
    console.log('updated执行了~~~')
    // this.eee++  在 updated 里修改 data 里的数据的话，只要这个数据结构里有用到，就会触发无限循环，一直会执行更新，类似于死循环，页面会慢慢卡死
  },
  methods: {
    testAdd() {
      this.abc++
    },
    addInputActive() {
      this.iptId++
      this.inputAndImgList.push({
        isIpt: true,
        isImg: false,
        iptValue: '',
        iptId: this.iptId,
      })
    },
    addImgActive() {
      // this.count++;
      this.imgId++
      if (this.imgId > this.srcList.length) {
        this.imgId = this.srcList.length
        alert('已没有更多图片资源')
        return
      }
      let src = this.srcList.find((item) => this.imgId == item.id)
      this.inputAndImgList.push({
        isIpt: false,
        isImg: true,
        src: src.src,
        imgId: this.imgId,
      })
    },
    getData() {
      if (this.inputAndImgList.length > 0) {
        let iptData = []
        let imgData = []
        this.inputAndImgList.forEach((item) => {
          if (item.isIpt == true) {
            iptData.push({ iptId: item.iptId, iptValue: item.iptValue })
          } else if (item.isImg == true) {
            imgData.push({ imgId: item.imgId, src: item.src })
          }
        })
        let allData = {
          iptData,
          imgData,
        }
        // console.log('allData:',allData)

        this.allData = allData

        console.log('this.allData:', this.allData)
      } else {
        alert('列表还未新增任何内容！')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
