import {web_client, ctrl_panel_init, browser_router, setting} from 'global';
import {HomePage} from './page/HomePage';
import {randomBs58} from 'fun/randomBs58';

const webClient = web_client();
const homePage = new HomePage();
const cmd = setting().cmd;

export default async () => {
    ctrl_panel_init()
        .register(cmd.post.create, () => createPost());

    webClient.send(cmd.post.list);
    return homePage;
    //console.log(route);
    //const homePage = new HomePage();
    //return homePage;
    //return new HomePage();
};

webClient.receive(cmd.post.create, (data) => {
    if (!data || !data.pid) {
        throw new Error('cannot find pid');
    }

    browser_router().navigate(
        'post.edit',
        {pid: data.pid}
    );
});

const createPost = () => {
    webClient.send(cmd.post.create, {});
};
