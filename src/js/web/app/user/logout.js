import {web_cache, browser_router} from 'global';

export default async () => {
    web_cache().remove('userId');
    browser_router().navigate('home');
};
