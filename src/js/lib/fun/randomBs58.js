import {Base58} from 'encoding/Base58';

export const randomBs58 = () => {
    const bs58 = new Base58();

    return bs58.encode((new Date()).getTime())
        + bs58.encode(Math.floor((Math.random() * Math.pow(10, 9)))).substr(0, 3);
};
