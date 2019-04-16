import {ctrl_panel_init, web_client, web_cache, browser_router, setting} from 'global';
import {LoginPage} from './page/LoginPage';

const cmd = setting().cmd;
const webClient = web_client();

const loginPage = new LoginPage();
loginPage.onSubmit((userId) => {
    webClient.send(cmd.user.login, {userId});
});

webClient.receive(cmd.user.login, (data) => {
    if (data && data.token) {
        web_cache().set('token', data.token);
        browser_router().navigate('home');
        return;
    }

    throw new Error(data);
});

export default async () => {
    ctrl_panel_init();


    return loginPage;
};
