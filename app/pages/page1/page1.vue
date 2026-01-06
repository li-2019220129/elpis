<template>
    <div class="page1">
        <h1>{{ content }}</h1>
        <h1>{{ content1 }}</h1>
        <el-input v-model="content" type="text" placeholder="请输入内容" />

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import utils from '$common/utils';
import curl from '$common/curl';
const content = ref('page1');
const tableData = ref([

]);

onMounted(async () => {
    const res = await curl({
        url: '/api/project/list',
        method: 'get',
        query: {
            proj_key: 'page1',
        },
    });
    console.log(res);
    tableData.value = res.data || [];
});
const content1 = ref('page3474');
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
