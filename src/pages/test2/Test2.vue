<template>
    <div class="test2 page">
        <app-scroll class="content">
            <ul>
                <!-- <li v-for="num in 100" :key="num">{{num}}</li> -->
                <li v-for="item in list" :key="item.id">{{item.name}}</li>
                <!-- <li v-for="item in lists" :key="item.id">{{item.name}}</li> -->
                <!-- <li v-for="item in listItem" :key="item.id">{{item.name}}</li> -->
            </ul>
        </app-scroll>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "test2",
    computed: {
        ...mapState({
            list: state => state.listInfo // 可以直接用辅助函数获取全局的状态，转化为组件的计算属性
        })
        // lists(){
        //     return this.$store.state.listInfo  // 用辅助函数或者直接这样用计算属性获取全局的状态
        // }
    },
    data() {
        return {
            listItem: []
        };
    },
    created() {
        this.$store.dispatch("getListInfo");

        let state = this.$store.state; // 这种方法不行，获取的是一个空的数组，看来只能用计算属性来获取全局的状态
        console.log("state:", state); // 【这样获取的全局的状态对象在控制台查看里面是有值的】
        let list = state.listInfo; // 【奇怪，这样一点就没有值】
        console.log("list:", list); // 【此处打印的是一个空数组】

        // this.listItem = list

        // console.log('store::',store)// 报错。组件中要用this.$store访问
        console.log("this.$store", this.$store);
    }
};
</script>

<style>
</style>