<template>
    <div class="page1">
        <h1>{{ content }}</h1>
        <input v-model="content" type="text" placeholder="请输入内容" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import utils from '$common/utils';
const content = ref('page1');
console.log(content.value);
</script>
<style lang="less" scoped>
.page1 {
    flex-direction: column;
    background-color: #f5f5f5;
}

.page1 h1 {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    color: pink;
}
</style>
