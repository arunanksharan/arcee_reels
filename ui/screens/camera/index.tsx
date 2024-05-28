import {
  CameraRecordingOptions,
  CameraType,
  Camera,
  FlashMode,
} from 'expo-camera';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Feather from 'react-native-vector-icons/Feather';
import { StackNavigationProps } from '../../../lib/types/types';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>(CameraType.back);
  const [cameraPermissions, requestCameraPermissions] =
    Camera.useCameraPermissions();
  const [audioPermissions, requestAudioPermissions] = Audio.usePermissions();
  const [mediaLibraryPermissions, requestMediaLibraryPermissions] =
    MediaLibrary.usePermissions();

  const [hasCameraPermissions, setHasCameraPermissions] = useState<
    boolean | null
  >(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState<
    boolean | null
  >(false);
  const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState<
    boolean | null
  >(false);

  const [galleryMedia, setGalleryMedia] = useState<MediaLibrary.Asset[]>([]);
  const isFocussed = useIsFocused();
  const [cameraFlash, setCameraFlash] = useState<FlashMode>(FlashMode.off);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const navigation = useNavigation<StackNavigationProps>();
  const [image, setImage] = useState<string | null>(null);

  console.log('cameraPermissions', cameraPermissions);
  console.log('audioPermissions', audioPermissions);
  console.log('mediaLibraryPermissions', mediaLibraryPermissions);

  useEffect(() => {
    (async () => {
      const cameraStatus = await requestCameraPermissions();
      setHasCameraPermissions(cameraStatus.status === 'granted');

      const audioStatus = await requestAudioPermissions();
      setHasAudioPermissions(audioStatus.status === 'granted');

      const mediaLibraryStatus = await requestMediaLibraryPermissions();
      console.log('Media Library Status', mediaLibraryStatus);
      setHasMediaLibraryPermissions(mediaLibraryStatus.status === 'granted');

      if (mediaLibraryStatus.status === 'granted') {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: [MediaLibrary.SortBy.creationTime],
          mediaType: [MediaLibrary.MediaType.video],
        });
        setGalleryMedia(userGalleryMedia.assets);
      }
    })();
  }, []);

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (
    !hasCameraPermissions ||
    !hasAudioPermissions ||
    !hasMediaLibraryPermissions
  ) {
    return (
      <View>
        <Text>No Permission Granted</Text>
      </View>
    );
  }

  const recordVideo = async () => {
    console.log('Recording Video');
    if (cameraRef && isCameraReady) {
      console.log(
        'Recording Video inside if outside try, cameraRef::',
        cameraRef
      );
      try {
        const options: CameraRecordingOptions = {
          maxDuration: 60,
          quality: '720p',
        };
        // console.log('Recording Video inside try, options::', options);
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          console.log('Video Recording Started');
          const data = await videoRecordPromise;
          console.log('Video Recording Ended112');
          console.log('Video Data', data);
          const source = data?.uri;
          let sourceThumbnail = (await generateThumbnail(source)) || '';
          navigation.navigate('SavePost', { source, sourceThumbnail });

          console.log('Video Source', source);
        }
      } catch (error) {
        console.log('Error recording video::', error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      try {
        cameraRef.stopRecording();
        setIsVideoRecording(false);
      } catch (error) {
        console.log('Error recording video', error);
      }
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      let sourceThumbnail =
        (await generateThumbnail(result.assets[0].uri)) || '';
      navigation.navigate('SavePost', {
        source: result.assets[0].uri,
        sourceThumbnail,
      });
      console.log(result.assets[0].uri);
    }
  };

  const generateThumbnail = async (source: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 1000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      {isFocussed ? (
        <Camera
          style={styles.camera}
          type={facing}
          ref={(ref) => setCameraRef(ref)}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
          ratio="16:9"
        ></Camera>
      ) : (
        <Text>Camera is not Focussed</Text>
      )}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setFacing(
              facing === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={'white'} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === FlashMode.off ? FlashMode.on : FlashMode.off
            )
          }
        >
          <Feather name="zap" size={24} color={'white'} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            onLongPress={recordVideo}
            onPressOut={stopVideo}
            disabled={!isCameraReady}
          >
            <Text style={styles.text}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => pickFromGallery()}
          >
            {galleryMedia[0] === undefined ? (
              <></>
            ) : (
              <Image
                style={styles.galleryThumbnail}
                source={{ uri: galleryMedia[0].uri }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    backgroundColor: 'black',
    aspectRatio: 9 / 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 48,
    gap: 12,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  sideBarContainer: {
    top: 60,
    right: 0,
    marginHorizontal: 30,
    position: 'absolute',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    // backgroundColor: 'blue',
  },
  recordButtonContainer: {
    flex: 1,
    // marginHorizontal: 30,
    // backgroundColor: 'gray',
  },
  recordButton: {
    borderWidth: 8,
    borderColor: '#ff404087',
    backgroundColor: '#ff4040',
    borderRadius: 100,
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  galleryThumbnail: {
    width: 50,
    height: 50,
  },
  iconText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  sideBarButton: {
    alignItems: 'center',
    marginBottom: 25,
  },
});
