import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Icon } from './ui/icon';
import { Cross } from 'lucide-react-native';

interface HalfScreenModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  data?: any;
  height?: number; // Optional height as percentage of screen (50% by default)
  children?: React.ReactNode;
}

const HalfScreenModal: React.FC<HalfScreenModalProps> = ({
  isVisible,
  onClose,
  title = '',
  data,
  height = 50,
  children,
}) => {
  const [animation] = useState(new Animated.Value(0));
  const { height: screenHeight } = Dimensions.get('window');
  const modalHeight = (height / 100) * screenHeight;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 0,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [modalHeight, 0],
  });

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType='slide'
    >
      <View style={styles.container}>
        <BlurView intensity={30} style={styles.blurView}>
          <Pressable style={styles.dismissArea} onPress={onClose} />
          <Animated.View
            style={[
              styles.modalContent,
              { height: modalHeight, transform: [{ translateY }] },
            ]}
          >
            <View style={styles.handle} />
            {title ? (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
            ) : null}

            <View style={styles.contentContainer}>
              {children ? children : (
                <Text>Modal content goes here. Received data: {JSON.stringify(data)}</Text>
              )}
            </View>
          </Animated.View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
});

export default HalfScreenModal;