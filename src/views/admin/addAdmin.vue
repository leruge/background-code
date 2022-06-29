<template>
    <div v-loading="!state.isClick">
        <page-header title="添加管理员" />
        <page-main>
            <el-row>
                <el-col :xl="12" :lg="12">
                    <el-form ref="form" :model="state.form" :rules="state.rules" label-width="80px">
                        <el-form-item label="用户名" prop="username" required="true">
                            <el-input v-model="state.form.username" placeholder="用户名" clearable />
                        </el-form-item>
                        <el-form-item label="密码" prop="password" required="true">
                            <el-input v-model="state.form.password" placeholder="密码" show-password clearable />
                        </el-form-item>
                        <el-form-item label="角色" prop="group_id">
                            <el-select v-model="state.form.group_id" clearable placeholder="选择角色">
                                <el-option v-for="item in state.groupList" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button v-auth="['addAdmin']" type="primary" :loading="!state.isClick" @click="onSubmit">添加</el-button>
        </fixed-action-bar>
    </div>
</template>

<script setup>
import api from '@/api'
import { ElMessage } from 'element-plus'
let reload = inject('reload')

let form = ref(null)
let state = reactive({
    isClick: true,
    form: {
        username: '',
        password: '',
        group_id: ''
    },
    rules: {
        username: { required: true, message: '用户名必须填写', trigger: ['blur', 'change'] },
        password: { required: true, message: '密码必须填写', trigger: ['blur', 'change'] }
    },
    groupList: []
})
onMounted(() => {
    getGroupList()
})
let onSubmit = () => {
    form.value.validate(valid => {
        if (valid) {
            if (state.isClick) {
                state.isClick = false
                api.post('admin/addAdmin', state.form).then(res => {
                    if (res.code == 1) {
                        ElMessage.success({
                            message: res.msg,
                            onClose() {
                                reload()
                            }
                        })
                    } else {
                        state.isClick = true
                        ElMessage.error(res.msg)
                    }
                })
            }
        }
    })
}
let getGroupList = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/lerugeGetGroupList').then(res => {
            state.isClick = true
            if (res.code == 1) {
                state.groupList = res.data.list
            }
        })
    }
}
</script>
