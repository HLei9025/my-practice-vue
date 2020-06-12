<template>
  <div class="not-find page">
      <img src="../assets/images/404.jpg" alt="123">
      <p>The page you visited does not exist, please confirm whether the URL is correct</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.not-find{
    background: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 300px;
        margin-top: 50px;
    }
    p{
        font-size: 18px;
        color: #666;
    }
}
</style>