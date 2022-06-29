<template>
    <div v-loading="!state.isClick">
        <page-header title="APP信息" />
        <page-main>
            <el-row>
                <el-col :lg="12" :xl="12">
                    <el-form ref="form" :model="state.form" label-width="120px">
                        <el-form-item label="安卓版本" prop="android_version">
                            <el-input v-model="state.form.android_version" clearable />
                        </el-form-item>
                        <el-form-item label="安卓地址" prop="android_url">
                            <el-input v-model="state.form.android_url" clearable />
                        </el-form-item>
                        <el-form-item label="苹果版本" prop="ios_version">
                            <el-input v-model="state.form.ios_version" clearable />
                        </el-form-item>
                        <el-form-item label="苹果地址" prop="ios_url">
                            <el-input v-model="state.form.ios_url" clearable />
                        </el-form-item>
                        <el-form-item label="更新描述" prop="update_desc">
                            <el-input v-model="state.form.update_desc" clearable />
                        </el-form-item>
                        <el-form-item label="苹果上架版本" prop="ios_up_version">
                            <el-input v-model="state.form.ios_up_version" clearable />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button v-auth="['updateAppInfo']" type="primary" :loading="!state.isClick" @click="onSubmit">更新</el-button>
        </fixed-action-bar>
    </div>
</template>

<script setup>
import api from '@/api'
import { ElMessage } from 'element-plus'

let state = reactive({
    form: {
        android_version: '',
        android_url: '',
        ios_version: '',
        ios_url: '',
        update_desc: '',
        ios_up_version: ''
    },
    isClick: true
})
onMounted(() => {
    state.isClick = false
    api.post('admin/lerugeGetAppInfo').then(res => {
        state.isClick = true
        if (res.code == 1) {
            state.form = res.data.appInfo
        }
    })
})
let onSubmit = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/updateAppInfo', state.form).then(res => {
            if (res.code == 1) {
                ElMessage.success({
                    message: res.msg,
                    onClose() {
                        state.isClick = true
                    }
                })
            } else {
                state.isClick = true
                ElMessage.error(res.msg)
            }
        })
    }
}
</script>
