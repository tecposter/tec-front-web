import {ready, oneElem} from 'gap/web';
import {bootstrap, browser_router, ctrl_panel} from 'global';
import {setting as settingObj} from './../../../setting/setting';
import {localSetting} from './../../../setting/setting.local';
import {cmdSetting} from './../../../setting/setting.cmd';

bootstrap(settingObj, localSetting, cmdSetting);

//.add('/post/commit/{postId:[0-9a-z-]+}/{commitId:[0-9a-z-]+}', 'post.commit', 'post/commit');
const browserRouter = browser_router();
browserRouter
    .add('/', 'home', 'landing/home')
    .add('/logout', 'user.logout', 'user/logout')
    .add('/login', 'user.login', 'user/login')
    .add('/reg', 'user.reg', 'user/reg')
    .add('/list-draft', 'post.listDraft', 'post/listDraft')
    .add('/cid/{cid:[0-9a-zA-Z-%:]+}', 'post.show', 'post/show')
    .add('/edit/{pid:[0-9a-zA-Z-%:]+}', 'post.edit', 'post/edit');


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
