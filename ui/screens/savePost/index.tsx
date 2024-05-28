import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SavePostScreenProps } from '../../../lib/types/types';
import Feather from 'react-native-vector-icons/Feather';
import { uploadVideoToSupabase } from '../../../lib/supabaseStorage';
import { createPost } from '../../../server/post/post';
import { supabase } from '../../../lib/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { FileObject } from '@supabase/storage-js';
import uuid from 'uuid-random';
import { set } from '@project-serum/anchor/dist/cjs/utils/features';

const SavePostScreen = ({ route, navigation }: SavePostScreenProps) => {
  const [description, setDescription] = useState<string>('');
  const [requestRunning, setRequestRunning] = useState<boolean>(false);
  // console.log('SavePostScreen::route', route.params?.source);

  // const imageFilename = `${user_id}-${Date.now()}.png`;
  // uploadVideoToSupabase(route.params?.source, description);
  console.log('SavePostScreen::description', description);

  const uploadVideo = async () => {
    // Todo: Setup Stoage Buckets with auth - user.id such that each user can only CRUD into their folder in the bucket
    // Todo: Move this to arweave or Pinata - IPFS & decentralised
    // Todo: Post Uplaod, add 'arcee/${sbFilepath}' to database as posts by given user
    // Todo: Up[load thumbnail as well to the bucket next to the video
    const localFilepath = route.params?.source || '';
    const sourceThumbnail = route.params?.sourceThumbnail || '';
    setRequestRunning(true);

    console.log('uploadVideo::localFilepath', localFilepath);

    const base64 = await FileSystem.readAsStringAsync(localFilepath, {
      encoding: 'base64',
    });
    console.log('uploadVideo::base64', base64);

    const fileId = uuid();
    console.log('fileId', fileId);

    const sbFilePath = `${fileId}.mp4`; // `${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
    const contentType = 'video/mp4'; // img.type === 'image' ? 'image/png' : 'video/mp4';
    const { data, error } = await supabase.storage
      .from('arcee')
      .upload(sbFilePath, decode(base64), { contentType });
    setRequestRunning(false);

    console.log('uploadVideo::data', data);
    console.log('uploadVideo::error', error);
  };

  const uploadImage = async () => {
    console.log('line 39');
    const localFilepath = route.params?.source || '';
    console.log('line 41');
    const imgFile = await fetch(localFilepath);
    console.log('line 42');
    const blob = await imgFile.blob();
    console.log('line 43');
    const { data: b, error: be } = await supabase.storage.listBuckets();
    console.log('buckets:', b);
    const { data, error } = await supabase.storage
      .from('arcee')
      .upload(`videos/${'9876.png'}`, blob);
    console.log('data:', data);
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator size="large" color="#ff4040" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Describe your video"
          multiline
          maxLength={300}
          style={styles.inputText}
          onChangeText={(text) => {
            setDescription(text);
          }}
        ></TextInput>
        <Image
          source={{ uri: route.params?.source }}
          style={styles.mediaPreview}
        />
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={uploadVideo}>
          <Feather name="arrow-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  uploadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: { flex: 1 },

  formContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 10,
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: 'black',
    width: 60,
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    borderColor: '#ff4040',
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
  },
  postButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ff4040',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10,
  },
  cancelButtonText: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
