import {browser_router, ctrl_panel_init, web_client, setting} from 'global';
import {ShowPage} from './page/ShowPage';

const showPage = new ShowPage();

const cmd = setting().cmd;
const webClient = web_client();
webClient
    .receive(cmd.post.fetch, (data) => {
        showPage.update({content: data.content, pid: data.pid, cid: data.cid});
    })
    .receive(cmd.post.edit, (data) => {
        if (!data || !data.pid) {
            throw new Error('cannot find pid');
        }

        browser_router().navigate(
            'post.edit',
            {pid: data.pid}
        );
    });

const triggerEdit = () => {
    //webClient.send(cmd.post.edit, {cid});

    webClient.send(cmd.post.edit, {cid: showPage.getCid()});
    /*
    const pid = showPage.getPid();

    browser_router().navigate(
        'post.edit',
        {pid}
    );
    */
};

export default async (route) => {
    ctrl_panel_init()
        .register(cmd.post.edit, () => triggerEdit());

    webClient.send(cmd.post.fetch, {cid: route.params.cid});
    return showPage;
};
