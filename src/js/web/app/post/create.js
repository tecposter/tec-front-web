import {browser_router} from 'global';
//import {randomBs58} from 'fun/randomBs58';
import {web_client, setting} from 'global';

const cmd = setting().cmd;
const webClient = web_client();
webClient.receive(cmd.article.create, (data) => {
    if (!data || !data.pid) {
        throw new Error('cannot find pid');
    }

    browser_router().navigate(
        'article.edit',
        {pid: data.pid}
    );
});

export default async () => {
    webClient.send(cmd.article.create, {});
    /*
    browser_router().navigate(
        'commit',
        {articleId: randomBs58(), commitId: randomBs58()}
    );
    */
};
