import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { buttonStyles } from '../../../../styles';

const ProfileHeader = ({ user }: { user: any }) => {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon={'account'} />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity style={buttonStyles.grayOutlinedButton}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    alignItems: 'center',
  },
  emailText: {
    padding: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  counterItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  counterNumberText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  counterLabelText: {
    color: 'gray',
    fontSize: 12,
  },
});
