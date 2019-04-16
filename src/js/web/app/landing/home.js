import {web_client, ctrl_panel_init, browser_router, setting} from 'global';
import {HomePage} from './page/HomePage';
import {randomBs58} from 'fun/randomBs58';

const webClient = web_client();
const homePage = new HomePage();
const cmd = setting().cmd;

export default async () => {
    ctrl_panel_init()
        .register(cmd.article.create, () => createArticle());

    webClient.send(cmd.article.list);
    return homePage;
    //console.log(route);
    //const homePage = new HomePage();
    //return homePage;
    //return new HomePage();
};

const createArticle = () => {
    browser_router().navigate(
        'article.commit',
        {articleId: randomBs58(), commitId: randomBs58()}
    );
};
