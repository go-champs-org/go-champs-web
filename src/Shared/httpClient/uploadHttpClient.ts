import httpClient from './httpClient';
import { REACT_APP_API_HOST } from '../env';
import {
  ApiUploadDeleteRequest,
  ApiUploadPostRequest,
  ApiUploadPostResponse
} from './apiTypes';

const UPLOAD_API = `${REACT_APP_API_HOST}v1/upload`;

const postUploadPresignedUrl = async (uploadRequest: ApiUploadPostRequest) =>
  await httpClient.post<ApiUploadPostRequest, ApiUploadPostResponse>(
    `${UPLOAD_API}/presigned-url`,
    uploadRequest
  );

const deleteFile = async (url: string) => {
  await httpClient.delete<ApiUploadDeleteRequest>(UPLOAD_API, { url });

  return;
};

export default {
  deleteFile,
  postUploadPresignedUrl
};
