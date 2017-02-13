export const GDS_API = process.env.GDS_API || 'http://localhost:9080/gds';
export const FILE_SERVICE = GDS_API + '/fileServicePort';
export const UPLOAD_SINGLE_FILE = FILE_SERVICE + '/uploadSingleFile';
export const UPLOAD_BASE_URL = UPLOAD_SINGLE_FILE + '?multipart=true&multipartField=uploadFile';
export const READ_FILE = FILE_SERVICE + '/readFile?isFile=true&param=fileId:';
export const FILE_DOMAIN = process.env.FILE_DOMAIN || 'Files';
export const CATEGORY_DOMAIN = process.env.CATEGORY_DOMAIN || 'Category';
export const ITEM_DOMAIN = process.env.ITEM_DOMAIN || 'Items';