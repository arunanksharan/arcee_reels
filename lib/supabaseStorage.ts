import { supabase } from './supabase';

export const SUPABASE_BUCKET_NAME = 'arcee';
export const SUPABASE_FOLDER_NAME = 'videos';
export const SUPABASE_STORE_BASE_URL =
  'https://eiwspcnrtylvxisdtenr.supabase.co/storage/v1/object/public';

export const uploadVideoToSupabase = async (fileName: string, video: Blob) => {
  const imagePath = `${'videos'}/${fileName}.mp4`;
  console.log('uploadVideoToSupabase::imagePath', imagePath);

  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const { data: buckets, error: bucketErrorr } =
    await supabase.storage.listBuckets();

  //   const { data, error } = await supabase.storage.from('arcee').list('videos', {
  //     limit: 100,
  //     offset: 0,
  //     sortBy: { column: 'name', order: 'asc' },
  //   });
  console.log('buckets', buckets);

  try {
    console.log('-----------------------------');

    const { data, error } = await supabase.storage
      .from('arcee')
      .download('videos/sample.mp4');
    console.log('data downloaded', data);

    console.log('-----------------------------');
  } catch (error) {
    console.error('Error uploading video to supabase', error);
  }

  try {
    const { data: imageStoreData, error: imageStoreError } =
      await supabase.storage.from('arcee').upload(imagePath, video, {
        contentType: 'video/mp4', // Ensure you set the correct content type for your image
        upsert: true, // Set to true to overwrite an existing file with the same path
      });
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('imageStoreData', imageStoreData);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    if (imageStoreError) {
      console.error(
        'Error uploading video to supabase inside if block',
        imageStoreError
      );
    }
    console.log('Video uploaded to supabase', imageStoreData);
    return imageStoreData;
  } catch (error) {
    console.error('Error uploading video to supabase', error);
  }
};
