import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

type EntypoIconName = React.ComponentProps<typeof Entypo>['name'];

const IconButton = ({
  name,
  color,
  size,
  onPress,
}: {
  name: EntypoIconName;
  color: string;
  size: number;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.iconContainer}>
        <Entypo name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    // backgroundColor: 'white',
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default IconButton;
