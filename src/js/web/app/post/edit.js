import {EditPage} from './page/EditPage';
import {CommitForm} from './form/CommitForm';
import {web_client, ctrl_panel_init, ctrl_panel, web_cache, setting} from 'global';

const editPage = new EditPage();
const commitForm = new CommitForm();
const commitPop = ctrl_panel().createPop(commitForm);


const cmd = setting().cmd;
const webClient = web_client();
webClient.receive(cmd.post.commit, (data) => {
    console.log(data)
});

commitForm.onSubmit(async (slug, isPublic) => {
    const content = editPage.getContent();
    webClient.send(cmd.post.commit, {
        slug,
        isPublic,
        content,
        pid: editPage.data.pid,
        cid: editPage.data.cid
    });
});

const savedraft = () => {
    webClient.send(cmd.post.saveDraft, {
        userId: web_cache().get('userId'),
        content: editPage.getContent(),
        pid: editPage.getPid(),
        cid: editPage.getCid()
    });
};

export default async (route) => {
    ctrl_panel_init()
        .register(cmd.post.saveDraft, () => savedraft())
        .register(cmd.post.commit, () => commitPop.show());

    editPage
        .setPid(route.params.pid)
        .setCid(route.params.cid)
        .setContent('');
    /*
    editPage.update({
        pid: route.params.pid,
        cid: route.params.cid,
        content: ''
    });
    */

    // todo reset ctrl_panel

    return editPage;
};
