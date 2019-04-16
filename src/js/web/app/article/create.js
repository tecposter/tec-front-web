import {browser_router} from 'global';
import {randomBs58} from 'fun/randomBs58';

export default async () => {
    browser_router().navigate(
        'commit',
        {articleId: randomBs58(), commitId: randomBs58()}
    );
};
