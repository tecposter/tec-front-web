export const randomHex = () => {
    return (new Date()).getTime().toString(16).padStart(12, '0')
        + (Math.random() * Math.pow(10, 8)).toString(16).substr(0,4);
};
