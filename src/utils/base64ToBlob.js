const toBlob = (realData, contentType) => {
    const sliceSize = 512;

    const byteChars = atob(realData);
    let byteArrays = [];

    for(let offset = 0; offset < byteChars.length; offset += sliceSize) {
        let slice = byteChars.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for(let i = 0; i < slice.length; i++){
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

const base64ToBlob = (imageURL) => {
    const block = imageURL.split(";");
    const contentType = block[0].split(":")[1];
    const realData = block[1].split(",")[1];

    const blob = toBlob(realData, contentType);
    return blob;
}

export default base64ToBlob;