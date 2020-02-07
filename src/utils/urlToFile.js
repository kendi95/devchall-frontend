import base64ToBlob from './base64ToBlob';

const urltoFile = async (editor) => {
    const url = await editor.getImageScaledToCanvas().toDataURL();
    const blob = await base64ToBlob(url);
    const file = await new File([blob], id, {type: blob.type});

    return file;
}

export default urltoFile;