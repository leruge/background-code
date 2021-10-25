<template>
    <div>
        <page-header title="个人设置" />
        <page-main>
            <el-row>
                <el-col :xl="12" :lg="12" />
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary" :loading="!state.isClick" @click="onSubmit">更新</el-button>
        </fixed-action-bar>
    </div>
</template>

<script setup>
import api from '@/api'
let state = reactive({
    isClick: true
})
let onSubmit = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/lerugeUpdateSelf').then(() => {

        })
    }
}
</script>
