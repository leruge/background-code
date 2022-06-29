<template>
    <div v-loading="!state.isClick">
        <page-header title="添加权限" />
        <page-main>
            <el-row>
                <el-col :xl="12" :lg="12">
                    <el-form ref="form" :model="state.form" :rules="state.rules" label-width="80px">
                        <el-form-item label="上级" prop="pid">
                            <el-select v-model="state.form.pid" clearable placeholder="选择上级">
                                <el-option v-for="item in state.oneRuleList" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="权限名" prop="name" :required="true">
                            <el-input v-model="state.form.name" placeholder="权限名" clearable />
                        </el-form-item>
                        <el-form-item label="规则" prop="rule">
                            <el-input v-model="state.form.rule" placeholder="无上级的权限可不填写" clearable />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button v-auth="['addRule']" type="primary" :loading="!state.isClick" @click="onSubmit">添加</el-button>
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
        pid: '',
        name: '',
        rule: ''
    },
    rules: {
        name: { required: true, message: '角色名必须填写', trigger: ['change', 'blur'] },
        rule: { validator: (rule, value, callback) => {
            if (state.form.pid && !value) {
                callback(new Error('选择了上级，就必须填写规则'))
            }
            callback()
        }, message: '规则必须填写', trigger: ['blur', 'change'] }
    },
    oneRuleList: []
})
onMounted(() => {
    getOneRuleList()
})
let onSubmit = () => {
    form.value.validate(valid => {
        if (valid) {
            if (state.isClick) {
                state.isClick = false
                api.post('admin/addRule', state.form).then(res => {
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
let getOneRuleList = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/lerugeGetOneRuleList').then(res => {
            state.isClick = true
            if (res.code == 1) {
                state.oneRuleList = res.data.list
            }
        })
    }
}
</script>
