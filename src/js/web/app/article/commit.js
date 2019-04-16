import {CommitPage} from './page/CommitPage';
import {PublishForm} from './form/PublishForm';
import {web_client, ctrl_panel_init, ctrl_panel, web_cache, setting} from 'global';

const commitPage = new CommitPage();
const publishForm = new PublishForm();
const publishPop = ctrl_panel().createPop(publishForm);


const cmd = setting().cmd;
const webClient = web_client();
webClient.receive(cmd.article.publish, (data) => {
    console.log(data)
});

publishForm.onSubmit(async (slug, isPublic) => {
    const content = commitPage.getContent();
    webClient.send(cmd.article.publish, {
        slug,
        isPublic,
        content,
        articleId: commitPage.data.articleId,
        commitId: commitPage.data.commitId
    });
});

const articleCommit = () => {
    webClient.send(cmd.article.commit, {
        userId: web_cache().get('userId'),
        content: commitPage.getContent(),
        articleId: commitPage.getArticleId(),
        commitId: commitPage.getCommitId()
    });
};

export default async (route) => {
    ctrl_panel_init()
        .register(cmd.article.publish, () => publishPop.show())
        .register(cmd.article.commit, () => articleCommit());

    commitPage
        .setArticleId(route.params.articleId)
        .setCommitId(route.params.commitId)
        .setContent('');
    /*
    commitPage.update({
        articleId: route.params.articleId,
        commitId: route.params.commitId,
        content: ''
    });
    */

    // todo reset ctrl_panel

    return commitPage;
};
