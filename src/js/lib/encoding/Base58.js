/*
 * https://gist.github.com/inflammable/2929362
 * https://github.com/cryptocoinjs/base-x
 */
export class Base58 {
    constructor(alpha) {
        this.alphabet = alpha || '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
        this.baseLen = this.alphabet.length;
    }

    encode(enc) {
        if(typeof enc!=='number' || enc !== parseInt(enc))
            throw '"encode" only accepts integers.';
        let encoded = '';
        const base = this.baseLen;
        const alphabet = this.alphabet;

        while(enc) {
            let remainder = enc % base;
            enc = Math.floor(enc / base);
            encoded = alphabet[remainder].toString() + encoded;        
        }
        return encoded;
    }

    decode(dec) {
        if(typeof dec!=='string')
            throw '"decode" only accepts strings.';            
        let decoded = 0;
        const alphabet = this.alphabet;
        const base = this.baseLen;
        while(dec) {
            const alphabetPosition = alphabet.indexOf(dec[0]);
            if (alphabetPosition < 0)
                throw '"decode" can\'t find "' + dec[0] + '" in the alphabet: "' + alphabet + '"';
            const powerOf = dec.length - 1;
            decoded += alphabetPosition * (Math.pow(base, powerOf));
            dec = dec.substring(1);
        }
        return decoded;
    }
}
