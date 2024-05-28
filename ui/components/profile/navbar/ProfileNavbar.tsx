import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const ProfileNavbar = ({ user }: { user: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>{`${user.name.first} ${user.name.last}`}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
