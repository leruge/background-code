export default [
    {
        url: '/mock/member/permission',
        method: 'get',
        response: () => {
            let permissions = []
            permissions = [
                'permission.browse',
                'permission.create',
                'permission.edit',
                'permission.remove',
                'demo'
            ]
            return {
                msg: '',
                code: 1,
                data: {
                    permissions
                }
            }
        }
    }
]
