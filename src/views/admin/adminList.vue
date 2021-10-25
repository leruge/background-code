<template>
    <div>
        <page-header title="管理员列表" />
        <page-main>
            <search-bar>
                <template #default>
                    <el-form ref="search" :model="state.form" :inline="true">
                        <el-form-item label="用户名">
                            <el-input v-model="state.form.username" placeholder="用户名" clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" :loading="!state.isClick" @click="doSearch">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </search-bar>
            <el-button-group size="small">
                <el-button type="primary" @click="add">添加</el-button>
            </el-button-group>
            <el-table v-loading="!state.isClick" :data="state.list" stripe border>
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="group_name" label="角色" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" :disabled="scope.row.is_super" @change="setStatus(scope.row.status, scope.row.id)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template #default="scope">
                        <el-button-group v-if="!scope.row.is_super" size="mini">
                            <el-button v-auth="['setAdminInfo']" type="success" @click="update(scope.row.id)">更新</el-button>
                            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
                                <template #reference>
                                    <el-button v-auth="['delAdmin']" type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 10px;">
                <el-pagination background layout="prev, pager, next, total" :total="state.count" :disabled="!state.isClick" @current-change="changePage" />
            </div>
        </page-main>
    </div>
</template>

<script setup>
import api from '@/api'
import { ElMessage } from 'element-plus'

let router = useRouter()
let state = reactive({
    list: [],
    count: 0,
    isClick: true,
    form: {
        username: '',
        page: 1,
        limit: 10
    }
})
onMounted(() => {
    getAdminList()
})
let changePage = page => {
    state.form.page = page
    getAdminList()
}
let doSearch = () => {
    state.form.page = 1
    getAdminList()
}
let getAdminList = () => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/getAdminList', state.form).then(res => {
            state.isClick = true
            if (res.code == 1) {
                state.list = res.data.list
                state.count = res.data.count
            }
        })
    }
}
let setStatus = (status, id) => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/setAdminInfo', { id, status }).then(res => {
            state.isClick = true
            if (res.code == 1) {
                ElMessage.success(res.msg)
            } else {
                ElMessage.error(res.msg)
                getAdminList()
            }
        })
    }
}
let add = () => {
    router.push({
        path: '/admin/addAdmin'
    })
}
let update = adminId => {
    router.push({
        path: '/admin/updateAdmin',
        query: { adminId }
    })
}
let del = adminId => {
    if (state.isClick) {
        state.isClick = false
        api.post('admin/delAdmin', { admin_ids: adminId }).then(res => {
            state.isClick = true
            if (res.code == 1) {
                getAdminList()
                ElMessage.success(res.msg)
            } else {
                ElMessage.error(res.msg)
            }
        })
    }
}
</script>
