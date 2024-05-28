import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type DatabaseContextType = {};
export type RootStackParamList = {
  AppHome: undefined;
  Auth: undefined;
  SavePost: { source: string; sourceThumbnail: string } | undefined;
};

export type StackNavigationProps = NavigationProp<RootStackParamList>;
export type SavePostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SavePost'
>;
