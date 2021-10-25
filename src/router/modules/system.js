const Layout = () => import('@/layout/index.vue')

export default {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/appInfo',
    meta: {
        title: '系统设置',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'appInfo',
            name: 'appInfo',
            component: () => import('@/views/system/appInfo.vue'),
            meta: {
                title: 'APP信息'
            }
        }
    ]
}
