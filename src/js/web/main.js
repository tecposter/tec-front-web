import {ready, oneElem} from 'gap/web';
import {bootstrap, browser_router, ctrl_panel} from 'global';
import {setting as settingObj} from './../../../setting/setting';
import {localSetting} from './../../../setting/setting.local';
import {cmdSetting} from './../../../setting/setting.cmd';

bootstrap(settingObj, localSetting, cmdSetting);

const browserRouter = browser_router();
browserRouter
    .add('/', 'home', 'landing/home')
    .add('/logout', 'user.logout', 'user/logout')
    .add('/login', 'user.login', 'user/login')
    .add('/reg', 'user.reg', 'user/reg')
    .add('/article/commit/{articleId:[0-9a-z-]+}/{commitId:[0-9a-z-]+}', 'article.commit', 'article/commit');


const mainElem = oneElem('.page .main');
browserRouter.onDispatch(async (route) => {
    const module = await import('./app/' + route.action);
    const pageView = await module.default(route);
    if (pageView) {
        mainElem.innerHTML = '';
        pageView.appendTo(mainElem);
    }
});

ready(() => {
    ctrl_panel().appendTo(oneElem('.page'));
    browserRouter.refresh();
});
