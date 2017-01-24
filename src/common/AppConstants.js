export const GDS_API = process.env.GDS_API || 'http://localhost:8080/gds';
export const FILE_SERVICE = GDS_API + '/fileServicePort';
export const UPLOAD_SINGLE_FILE = FILE_SERVICE + '/uploadSingleFile';
export const UPLOAD_BASE_URL = UPLOAD_SINGLE_FILE + '?multipart=true&multipartField=uploadFile';