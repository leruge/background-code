const Layout = () => import('@/layout/index.vue')

export default {
    path: '/admin',
    name: 'admin',
    component: Layout,
    redirect: '/admin/adminList',
    meta: {
        title: '管理员管理',
        icon: 'user'
    },
    children: [
        {
            path: 'adminList',
            name: 'adminList',
            component: () => import('@/views/admin/adminList.vue'),
            meta: {
                title: '管理员列表',
                auth: ['getAdminList']
            }
        },
        {
            path: 'addAdmin',
            component: () => import('@/views/admin/addAdmin.vue'),
            meta: {
                title: '添加管理员',
                sidebar: false,
                activeMenu: '/admin/adminList',
                auath: ['addAdmin']
            }
        },
        {
            path: 'updateAdmin',
            component: () => import('@/views/admin/updateAdmin.vue'),
            meta: {
                title: '更新管理员',
                sidebar: false,
                activeMenu: '/admin/adminList',
                auth: ['setAdminInfo']
            }
        },
        {
            path: 'groupList',
            name: 'groupList',
            component: () => import('@/views/admin/groupList.vue'),
            meta: {
                title: '角色列表',
                auth: ['getGroupList']
            }
        },
        {
            path: 'addGroup',
            name: 'addGroup',
            component: () => import('@/views/admin/addGroup.vue'),
            meta: {
                title: '添加角色',
                sidebar: false,
                activeMenu: '/admin/groupList',
                auth: ['addGroup']
            }
        },
        {
            path: 'updateGroup',
            component: () => import('@/views/admin/updateGroup.vue'),
            meta: {
                title: '更新角色',
                sidebar: false,
                activeMenu: '/admin/groupList',
                auth: ['updateGroup']
            }
        },
        {
            path: 'ruleList',
            name: 'ruleList',
            component: () => import('@/views/admin/ruleList.vue'),
            meta: {
                title: '权限列表',
                auth: ['getRuleList']
            }
        },
        {
            path: 'addRule',
            name: 'addRule',
            component: () => import('@/views/admin/addRule.vue'),
            meta: {
                title: '添加权限',
                sidebar: false,
                activeMenu: '/admin/ruleList',
                auth: ['addRule']
            }
        },
        {
            path: 'updateRule',
            component: () => import('@/views/admin/updateRule.vue'),
            meta: {
                title: '更新权限',
                sidebar: false,
                activeMenu: '/admin/ruleList',
                auath: ['updateRule']
            }
        }
    ]
}
