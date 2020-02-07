import 'dotenv/config';
const s3Config = (dirName) => {

    return {
        bucketName: process.env.BUCKET_NAME,
        dirName: dirName,
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
    
}

export default s3Config;