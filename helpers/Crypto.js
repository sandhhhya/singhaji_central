var CryptoJS = require("crypto-js");
const encrypt = (msg) => {
    return CryptoJS.AES.encrypt(msg, 'SSISM').toString();
}

const decrypt = (msg) => {
    var bytes = CryptoJS.AES.decrypt(msg, 'SSISM');
    return bytes.toString(CryptoJS.enc.Utf8);
}
const storage = {
    setItem: (key, value) => {
        const encrypt_value = encrypt(value)//gjhgth5453ghhf
        localStorage.setItem(key, encrypt_value);
    },

    getItem: (key) => {
        const encrypt_value = localStorage.getItem(key);//hfhgfas5465
        if (!encrypt_value) {
            return false
        }
        return decrypt(encrypt_value);//A


    }


}

export default storage;