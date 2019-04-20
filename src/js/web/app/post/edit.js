import {CommitPage} from './page/CommitPage';
import {PublishForm} from './form/PublishForm';
import {web_client, ctrl_panel_init, ctrl_panel, web_cache, setting} from 'global';

const commitPage = new CommitPage();
const publishForm = new PublishForm();
const publishPop = ctrl_panel().createPop(publishForm);


const cmd = setting().cmd;
const webClient = web_client();
webClient.receive(cmd.post.publish, (data) => {
    console.log(data)
});

publishForm.onSubmit(async (slug, isPublic) => {
    const content = commitPage.getContent();
    webClient.send(cmd.post.publish, {
        slug,
        isPublic,
        content,
        pid: commitPage.data.pid,
        cid: commitPage.data.cid
    });
});

const postCommit = () => {
    webClient.send(cmd.post.commit, {
        userId: web_cache().get('userId'),
        content: commitPage.getContent(),
        pid: commitPage.getPid(),
        cid: commitPage.getCid()
    });
};

export default async (route) => {
    ctrl_panel_init()
        .register(cmd.post.publish, () => publishPop.show())
        .register(cmd.post.commit, () => postCommit());

    commitPage
        .setPid(route.params.pid)
        .setCid(route.params.cid)
        .setContent('');
    /*
    commitPage.update({
        pid: route.params.pid,
        cid: route.params.cid,
        content: ''
    });
    */

    // todo reset ctrl_panel

    return commitPage;
};
