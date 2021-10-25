<template>
    <div>
        <page-header title="添加角色" />
        <page-main>
            <el-row>
                <el-col :xl="12" :lg="12">
                    <el-form ref="form" :model="state.form" :rules="state.rules" label-width="80px">
                        <el-form-item label="角色名" prop="name" :required="true">
                            <el-input v-model="state.form.name" placeholder="角色名" clearable />
                        </el-form-item>
                        <el-form-item label="权限" prop="rules">
                            <el-tree ref="tree" :data="state.ruleArray" :props="state.treeProps" show-checkbox :default-expand-all="true" node-key="id" />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button v-auth="['addGroup']" type="primary" :loading="!state.isClick" @click="onSubmit">添加</el-button>
        </fixed-action-bar>
    </div>
</template>

<script setup>
import api from '@/api'
import { ElMessage } from 'element-plus'
let reload = inject('reload')

let tree = ref(null)
let form = ref(null)
let state = reactive({
    isClick: true,
    form: {
        name: '',
        rules: ''
    },
    rules: {
        name: { required: true, message: '角色名必须填写', trigger: ['blur', 'change'] }
    },
    ruleArray: [],
    treeProps: {
        label: 'name',
        children: 'son_list'
    }
})
onMounted(() => {
    getRuleList()
})
let onSubmit = () => {
    form.value.validate(valid => {
        if (valid) {
            if (state.isClick) {
                state.isClick = false
                let selectedIdArray = tree.value.getCheckedKeys(true)
                state.form.rules = selectedIdArray.join(',')
                api.post('admin/addGroup', state.form).then(res => {
                    if (res.code == 1) {
                        ElMessage.success({
                            message: res.msg,
                            onClose() {
                                state.isClick = true
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
let getRuleList = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/lerugeGetRuleTree').then(res => {
            state.isClick = true
            if (res.code == 1) {
                state.ruleArray = res.data.rule_tree
            }
        })
    }
}
</script>
