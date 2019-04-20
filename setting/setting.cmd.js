export const cmdSetting = {
    cmd: {
        esc: {
            name: 'esc',
            desc: 'Close control panel',
            shortKeys: 'esc'
        },
        cmd: {
            name: 'cmd',
            desc: 'Open control panel',
            shortKeys: 'ctrl-;'
        },
        home: {
            name: 'home',
            desc: 'Goto home page',
            shortKeys: 'ctrl-shift-h'
        },
        user: {
            reg: {
                name: 'user.reg',
                desc: 'Reg',
            },
            login: {
                name: 'user.login',
                desc: 'Login',
            },
            logout: {
                name: 'user.logout',
                desc: 'Logout'
            },
        },
        post: {
            commit: {
                name: 'post.commit',
                desc: 'Submit a commit of post',
                shortKeys: 'ctrl-s',
            },
            publish: {
                name: 'post.publish',
                desc: 'Publish the commit of post'
            },
            create: {
                name: 'post.create',
                desc: 'Creae a post'
            },
            list: {
                name: 'post.list',
                desc: 'List posts'
            }
        }
    }
};
