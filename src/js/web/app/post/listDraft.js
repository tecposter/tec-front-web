import {browser_router, web_client, ctrl_panel_init, setting} from 'global';
import {ListDraftPage} from './page/ListDraftPage';

const listDraftPage = new ListDraftPage();
listDraftPage.onEdit((pid) => {
    browser_router().navigate(
        'post.edit',
        {pid}
    );
});

const webClient = web_client();
const cmd = setting().cmd;

webClient.receive(cmd.post.listDraft, (data) => {
    if (!data || !data.list) {
        throw new Error('cannot get list');
    }

    listDraftPage.update({list: data.list});
});

export default async () => {
    ctrl_panel_init();

    webClient.send(cmd.post.listDraft);

    return listDraftPage;
};
