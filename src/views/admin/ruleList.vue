<template>
    <div>
        <page-header title="权限列表" />
        <page-main>
            <el-button-group size="small">
                <el-button v-auth="['addRule']" type="primary" @click="add">添加</el-button>
            </el-button-group>
            <el-row>
                <el-col :lg="12" :xl="12">
                    <el-table v-loading="!state.isClick" :data="state.list" :tree-props="{ children: 'son_list'}" row-key="id" stripe border default-expand-all>
                        <el-table-column prop="name" label="权限" />
                        <el-table-column prop="rule" label="规则" />
                        <el-table-column label="操作" fixed="right">
                            <template #default="scope">
                                <el-button-group size="mini">
                                    <el-button v-auth="['updateRule']" type="success" @click="update(scope.row.id)">更新</el-button>
                                    <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
                                        <template #reference>
                                            <el-button v-auth="['delRule']" type="danger">删除</el-button>
                                        </template>
                                    </el-popconfirm>
                                </el-button-group>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>

<script setup>
import api from '@/api'
import { ElMessage } from 'element-plus'

let router = useRouter()
let state = reactive({
    isClick: true,
    list: []
})
onMounted(() => {
    getRuleList()
})
let add = () => {
    router.push({
        path: '/admin/addRule'
    })
}
let update = ruleId => {
    router.push({
        path: '/admin/updateRule',
        query: { ruleId }
    })
}
let del = ruleId => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/delRule', { rule_ids: ruleId }).then(res => {
            state.isClick = true
            if (res.code == 1) {
                getRuleList()
                ElMessage.success(res.msg)
            } else {
                ElMessage.error(res.msg)
            }
        })
    }
}
let getRuleList = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/getRuleList').then(res => {
            state.isClick = true
            if (res.code == 1) {
                state.list = res.data.list
            }
        })
    }
}
</script>
