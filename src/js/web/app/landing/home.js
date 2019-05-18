import {web_client, ctrl_panel_init, browser_router, setting} from 'global';
import {HomePage} from './page/HomePage';
//import {randomBs58} from 'fun/randomBs58';

const homePage = new HomePage();
homePage.onPostShow((cid) => {
    browser_router().navigate('post.show', {cid});
    //console.log(cid);
    //webClient.send(cmd.post.edit, {cid});
});

const cmd = setting().cmd;
const webClient = web_client();
webClient.receive(cmd.post.list, (data) => {
    if (!data || !data.list) {
        throw new Error('cannot get list');
    }

    homePage.update({list: data.list});
});

webClient.receive(cmd.post.create, (data) => {
    gotoEdit(data.pid);
});

/*
webClient.receive(cmd.post.edit, (data) => {
    gotoEdit(data.pid);
});
*/

const gotoEdit = (pid) => {
    if (!pid) {
        throw new Error('cannot find pid');
    }

    browser_router().navigate(
        'post.edit',
        {pid}
    );
};

const createPost = () => {
    webClient.send(cmd.post.create, {});
};
const listDraft = () => {
    browser_router().navigate(
        'post.listDraft',
    );
};

export default async () => {
    ctrl_panel_init()
        .register(cmd.post.listDraft, () => listDraft())
        .register(cmd.post.create, () => createPost());

    webClient.send(cmd.post.list);
    return homePage;
    //console.log(route);
    //const homePage = new HomePage();
    //return homePage;
    //return new HomePage();
};
