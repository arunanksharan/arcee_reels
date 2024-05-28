import { uploadVideoToSupabase } from '../../lib/supabaseStorage';
import uuid from 'uuid-random';
import * as FileSystem from 'expo-file-system';

const base64ToBlob = (base64: string, mime: string) => {
  const byteChars = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteChars.length; offset += 512) {
    const slice = byteChars.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mime });
};

export const createPost = async (localFilePath: string) => {
  // fetch video from localfilepath
  const fileUrl = new URL(localFilePath);
  console.log('inside createpost localFilePath', localFilePath);
  console.log('inside createpost fileUrl', fileUrl);
  //   const videoBase64 = await FileSystem.readAsStringAsync(localFilePath, {
  // encoding: FileSystem.EncodingType.Base64,
  //   });

  //   // Convert base64 to blob
  //   const videoBlob = base64ToBlob(videoBase64, 'video/mp4');

  const res = await fetch(fileUrl);
  console.log('res', res);
  //   console.log('videoBlob', videoBlob);
  const video = await res.blob();
  console.log('video', video);

  // Prepare filepath for supabase storage
  const fileId = uuid();
  console.log('fileId', fileId);
  const uploadRes = await uploadVideoToSupabase(`${fileId}`, video);
  console.log('uploadRes', 'uploadRes');
  return 'uploadRes';
};
