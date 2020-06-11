<template>
    <div class="test4 page">
        <!-- 被新增的条目，肯定是遍历出来的 -->
        <div class="clumn" v-for="(item,index) in clumnList" :key="item.id">
            <span class="num">{{index+1}}</span>
            <input type="text" class="input" v-model="item.msg" />
            <span class="add" v-if="index === clumnList.length-1" @click="addHandle">+</span>
            <span
                class="del"
                v-if="index === clumnList.length-1 && index !== 0"
                @click="delHandle"
            >-</span>
        </div>


        <!-- demo 小案例,测试 key 值在有删除的情况下能不能让其为 index -->
        <div class="demo">
            <div class="demo-item" v-for="(item,index) in demoList" :key="index">
                <span class="txt-info">{{item.txt}}</span>
                <button class="btn-del" @click="delAction(index)">删除</button>
            </div>
        </div>

        <!-- 渐变蒙层 -->
        <div class="mask">
            <ul class="info-wrap">
                <li class="info-item" v-for="item in infoList" :key="item.id">{{item.info}}</li>
            </ul>
            <div class="mask-item"></div>
        </div>
        <h1>111111</h1>

    </div>
</template>

<script>
export default {
    name: "test4",
    data() {
        return {
            clumnList: [{ id: 1, msg: "" }],
            id: 1,
            demoList: [
                {id: 1, txt: '我是第一条'},
                {id: 2, txt: '我是第二条'},
                {id: 3, txt: '我是第三条'},
                {id: 4, txt: '我是第四条'}
            ],
            infoList: [
                {id: 1, info: 'I am first li'},
                {id: 2, info: 'I am second li'},
                {id: 3, info: 'I am thrid li'},
                {id: 4, info: 'I am fourth li'}
            ]
        };
    },
    methods: {
        // 新增条目
        addHandle() {
            this.clumnList.push({ id: ++this.id, msg: "" });
        },
        // 删除条目
        delHandle() {
            this.clumnList.pop();
        },
        // 删除事件
        delAction(i){
            const index = this.demoList.findIndex((k,index) => index === i);
            this.demoList.splice(index,1);
            console.log('this.demoList:',this.demoList)
        },
        dome(){

        }

    }
};
</script>

<style lang="scss" scoped>
.test4{
    background: #fff;
}
.clumn {
    display: flex;
    margin-top: 10px;
    .input {
        width: 200px;
        height: 20px;
        box-sizing: border-box;
    }
    .add,
    .del {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #333;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        box-sizing: border-box;
        margin-left: 10px;
    }
}
.mask{
    width: 400px;
    border-bottom: #333 1px solid;
    overflow: hidden;
    position: relative;
    .info-wrap{
        width: 100%;
        .info-item{
            line-height: 20px;
        }
    }
    .mask-item{
        width: 100%;
        height: 100px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: linear-gradient(transparent,#fff)
    }
}
</style>