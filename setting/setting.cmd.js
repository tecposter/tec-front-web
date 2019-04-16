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
        article: {
            commit: {
                name: 'article.commit',
                desc: 'Submit a commit of article',
                shortKeys: 'ctrl-s',
            },
            publish: {
                name: 'article.publish',
                desc: 'Publish the commit of article'
            },
            create: {
                name: 'article.create',
                desc: 'Creae a article'
            },
            list: {
                name: 'article.list',
                desc: 'List articles'
            }
        }
    }
};
