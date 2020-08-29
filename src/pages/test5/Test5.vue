<template>
  <div class="todo-wrapper page">
    <div class="input-wrapper input-or-btn">
      <input
        type="text"
        placeholder="Please input content ..."
        v-model="editContent"
      />
      <button @click="addAction">Add</button>
    </div>
    <div v-if="hasList" class="content-wrapper">
      <div class="input-or-btn">
        <input
          type="text"
          placeholder="Please input keywords ..."
          v-model="searchWord"
        />
        <!-- <button @click="searchAction">查找</button> -->
      </div>
      <ul class="list-content">
        <li v-for="item in showList" :key="item.id" class="input-or-btn">
          <span :class="{ 'text-content': item.finished }">
            {{ item.text }}
          </span>
          <button @click="finishAction(item.id)">Finish</button>
          <button v-if="!item.finished" @click="editAction(item)">Edit</button>
          <button @click="deleteAction(item.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-if="hasList" class="menu-wrapper">
      <button
        v-for="item in btnState"
        :key="item"
        @click="checkStatus(item)"
        :class="{ btnBg: item === currentState }"
      >
        {{ getStateName(item) }}
      </button>
    </div>
    <div v-if="!hasList" class="tip-content">
      <p>no data</p>
    </div>
    <div v-if="showMask" class="mask" @click.self="closeMask">
      <div class="edit-dialog">
        <p>Content describe:</p>
        <textarea
          class="text-area"
          placeholder="Please input content ..."
          v-model="editCon"
        ></textarea>
        <div class="btn">
          <button @click="cancelEditAction">Cancel</button>
          <button @click="confirmEditAction">Ok</button>
        </div>
      </div>
    </div>
    <div class="column-wrap">
      <div class="column-text" v-for="item in columnList" :key="item.id">
        <img :src="item.image" alt="" />
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 按钮状态
const MAP_BTN_STATE = {
  0: 'All', // 0 表示全部
  1: 'Finished', // 1 表示已完成
  2: 'Unfinished' // 2 表示未完成
}
export default {
  name: 'test5',
  components: {},
  data() {
    return {
      todoList: [],
      editContent: '',
      id: 1,
      searchWord: '',
      // showList: [], // 【有‘查找’按钮时需要解封此行代码】
      editCon: '',
      editId: null,
      showMask: false,
      btnState: [0, 1, 2],
      currentState: 0
    }
  },
  computed: {
    ...mapState({
      columnList: (state) => state.columnList
    }),
    showList() {
      //【有‘查找’按钮时此计算属性注释掉，不需要用】
      let tempList = []
      switch (this.currentState) {
        case 0:
          tempList = this.todoList
          break
        case 1:
          tempList = this.todoList.filter((item) => item.finished)
          break
        case 2:
          tempList = this.todoList.filter((item) => !item.finished)
          break
      }
      return this.searchWord
        ? this.searchInfoFromObjectArr(this.searchWord, tempList)
        : tempList
    },
    hasList() {
      return this.todoList.length > 0
    }
  },
  created() {
    this.$store.dispatch('getColumnList')
  },
  methods: {
    // 添加事件
    addAction() {
      if (!this.editContent) return
      this.todoList.push({
        id: this.id,
        text: this.editContent,
        finished: false
      })
      this.editContent = ''
      this.id++
      // this.showList = this.todoList // 【有‘查找’按钮时需要解封此行代码】
    },
    // 删除事件
    deleteAction(id) {
      const index = this.findIdFromObjectArr(id, this.todoList)
      this.todoList.splice(index, 1)
      // this.showList = this.todoList // 【有‘查找’按钮时需要解封此行代码】
    },
    // 完成待办事件
    finishAction(id) {
      const index = this.findIdFromObjectArr(id, this.todoList)
      this.todoList.splice(index, 1, {
        ...this.todoList[index],
        finished: true
      })
      // this.showList = this.todoList // 【有‘查找’按钮时需要解封此行代码】
    },
    // 编辑待办事件
    editAction(item) {
      this.showMask = true
      this.editCon = item.text
      this.editId = item.id
    },

    // 搜索按钮  【有‘查找’按钮时需要解封此行代码】
    // searchAction(){
    //     this.showList = this.searchWord ? this.searchInfoFromObjectArr(this.todoList) : this.todoList
    // },

    // 点击空白处关闭蒙版
    closeMask() {
      this.showMask = false
    },
    // 编辑取消按钮
    cancelEditAction() {
      this.showMask = false
    },
    // 编辑确定按钮
    confirmEditAction() {
      this.todoList.forEach((item) => {
        if (item.id === this.editId) {
          item.text = this.editCon
        }
      })
      this.showMask = false
    },
    // 切换状态
    checkStatus(state) {
      this.currentState = state
    },
    // 获得状态名
    getStateName(item) {
      return MAP_BTN_STATE[item]
    },

    // 查找对应 id 所在的下标位置
    findIdFromObjectArr(id, arr) {
      return arr.findIndex((item) => id === item.id)
    },
    // 根据关键字查找代办信息
    searchInfoFromObjectArr(word, arr) {
      if (arr.length === 0) return arr
      let newArr = []
      arr.forEach((item) => {
        const index = item.text.indexOf(word)
        if (index !== -1) {
          newArr.push(item)
        }
      })
      return newArr
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-wrapper {
  .input-wrapper,
  .content-wrapper,
  .menu-wrapper,
  .tip-content {
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .input-or-btn {
    display: flex;
    input {
      width: 500px;
      outline: none;
      padding: 3px 5px;
    }
    button {
      margin-left: 10px;
    }
  }
  .menu-wrapper {
    display: flex;
    justify-content: space-around;
    button {
      background: transparent;
      border: 1px solid #333;
      color: #000;
    }
    .btnBg {
      background: #099;
      color: #fff;
    }
  }
  .content-wrapper {
    .text-content {
      text-decoration: line-through;
      text-decoration-color: red;
      color: #666;
    }
    .list-content {
      margin-top: 10px;
      li {
        margin-bottom: 5px;
      }
    }
  }
  .tip-content {
    text-align: center;
    color: #777;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.4);
    .edit-dialog {
      width: 300px;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 0 8px 3px #666;
      overflow: hidden;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .text-area {
        width: 100%;
        min-height: 50px;
        padding: 5px;
        margin: 5px 0;
        box-sizing: border-box;
        outline: none;
      }
      .btn {
        float: right;
        button {
          margin-left: 20px;
          &:nth-child(1) {
            background: #c66;
            &:active {
              background: #c60;
            }
          }
        }
      }
    }
  }
  button {
    padding: 3px 5px;
    background: #099;
    color: #fff;
    border: none;
    border-radius: 3px;
    outline: none;
    &:hover {
      cursor: pointer;
    }
    &:active {
      background: #093;
    }
  }
}
.column-wrap {
  width: 100%;
  column-count: 2;
  column-span: none;
  .column-text {
    break-inside: avoid;
    img {
      width: 100%;
    }
  }
}
</style>
