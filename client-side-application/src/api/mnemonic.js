import Mnemonic from 'bitcore-mnemonic'
import bitcore from 'bitcore-lib'
import { encrypt, decrypt } from 'bitcoin-encrypt';

export const generateSeed = () => {
    try{
        const code = new Mnemonic(Mnemonic.Words.ENGLISH);
        const mnemonic = code.toString();
        keyDerivation(mnemonic, "m/0'")
        return mnemonic;
    }
    catch (err){
        console.log(err)
    }
};

export const keyDerivation = (code, pp) => {
    const mnemonic = new Mnemonic(code)
    var xpriv = mnemonic.toHDPrivateKey(bitcore.Networks.livenet);
    var derived = xpriv.derive(pp);
    var privateKey = derived.privateKey;
    var pk = new bitcore.PrivateKey(privateKey.toString(), bitcore.Networks.livenet);

    var privateKeyStr = pk.toString();
    var publicKey = new bitcore.PublicKey(pk);
    var publicKeyStr = publicKey.toString();
    var address = new bitcore.Address(publicKey, bitcore.Networks.testnet);

    return {
        privateKeyStr: privateKeyStr,
        publicKeyStr: publicKeyStr
    };
}

export const asymEncryption = (publicKeyStr, privateKeyStr, message) =>{
    const encrypted = encrypt(publicKeyStr, privateKeyStr, message);
    return Buffer.from(encrypted).toString('base64');
};

export const asymDecryption = (publicKeyStr, privateKeyStr, encrypted) => {
    const decrypted = Buffer.from(encrypted, 'base64');
    return decrypt(publicKeyStr, privateKeyStr, decrypted).toString();
};