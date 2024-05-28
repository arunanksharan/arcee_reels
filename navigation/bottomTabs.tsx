import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../ui/screens/home';
import SettingsScreen from '../ui/screens/settings';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../ui/atoms/IconButton';
import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import DiscoverScreen from '../ui/screens/discover';
import InboxScreen from '../ui/screens/inbox';
import ProfileScreen from '../ui/screens/profile';
import CameraScreen from '../ui/screens/camera';
import ImagePickerComponent from '../ui/components/new/ImagePicker';
import ImagePickerScreen from '../ui/screens/imagePicker';
import VideoScreen from '../ui/screens/gallery/video';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        // headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        // headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: '#fff',
        headerShown: false,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          title: 'Discover',
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CameraScreen}
        options={{
          title: 'Create',
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-square" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={ImagePickerScreen}
        options={{
          title: 'Inbox',
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-square" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
