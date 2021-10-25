<template>
    <div>
        <page-header title="个人设置" content="每次更新都是需要重新登录哟~" />
        <page-main>
            <el-row>
                <el-col :md="24" :lg="12">
                    <el-form ref="form" :model="state.form" label-width="120px">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="state.form.username" clearable placeholder="用户名" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="state.form.password" show-password clearable placeholder="不填写则为不修改" />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary" :loading="!state.isClick" @click="onSubmit">更新</el-button>
        </fixed-action-bar>
    </div>
</template>

<script setup>
import api from '@/api'
import { ElMessage } from 'element-plus'
import store from '@/store'

let router = useRouter()
let state = reactive({
    form: {
        username: store.state.admin.username,
        password: ''
    },
    isClick: true
})
let onSubmit = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/lerugeUpdateSelf', state.form).then(res => {
            if (res.code == 1) {
                ElMessage.success({
                    message: res.msg + ',请重新登录',
                    onClose() {
                        store.dispatch('admin/logout').then(() => {
                            router.push({
                                path: '/login'
                            })
                        })
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
