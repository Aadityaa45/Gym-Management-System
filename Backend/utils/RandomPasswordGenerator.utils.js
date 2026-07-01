export const randomPasswordGenerator = (length = 8) =>{
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const passwordArray = new Array(length).fill(null).map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)));
    return passwordArray.join('');
}