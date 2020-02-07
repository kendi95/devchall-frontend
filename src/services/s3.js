import S3 from 'react-aws-s3';
import s3Config from '../config/s3.config';

const s3 = async (dirName, file, fileName) => {
    const ReactS3Client = new S3(s3Config(dirName));

    try{
        const data = await ReactS3Client.uploadFile(file, fileName);
        return data;
    }catch(err){
        return err;
    }
    
}

export default  s3;