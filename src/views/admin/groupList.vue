<template>
    <div v-loading="!state.isClick">
        <page-header title="角色列表" />
        <page-main>
            <el-button-group size="small">
                <el-button v-auth="['addGroup']" type="primary" @click="add">添加</el-button>
            </el-button-group>
            <el-row>
                <el-col :lg="12" :xl="12">
                    <el-table v-loading="!state.isClick" :data="state.list" stripe border>
                        <el-table-column prop="name" label="角色名" />
                        <el-table-column prop="create_time" label="添加时间" />
                        <el-table-column label="操作" fixed="right">
                            <template #default="scope">
                                <el-button-group v-if="!scope.row.is_super" size="mini">
                                    <el-button v-auth="['updateGroup']" type="success" @click="update(scope.row.id)">更新</el-button>
                                    <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
                                        <template #reference>
                                            <el-button v-auth="['delGroup']" type="danger">删除</el-button>
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
    getGroupList()
})
let add = () => {
    router.push({
        path: '/admin/addGroup'
    })
}
let update = groupId => {
    router.push({
        path: '/admin/updateGroup',
        query: { groupId }
    })
}
let del = groupId => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/delGroup', { group_ids: groupId }).then(res => {
            state.isClick = true
            if (res.code == 1) {
                getGroupList()
                ElMessage.success(res.msg)
            } else {
                ElMessage.error(res.msg)
            }
        })
    }
}
let getGroupList = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/getGroupList').then(res => {
            state.isClick = true
            if (res.code == 1) {
                state.list = res.data.list
            }
        })
    }
}
</script>
