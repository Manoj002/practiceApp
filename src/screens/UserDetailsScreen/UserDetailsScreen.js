import React, {useRef, useEffect} from 'react';
import {Animated, Image, View, Text, StyleSheet} from 'react-native';

const UserDetailsScreen = ({route}) => {
  const {item} = route.params;
  const translationImage = useRef(new Animated.Value(0)).current;
  const translationView = useRef(new Animated.Value(0)).current;

  const transformImageStyle = {
    transform: [
      {
        translateY: translationImage.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 80],
        }),
      },
    ],
  };

  const transformViewStyle = {
    transform: [
      {
        translateY: translationView.interpolate({
          inputRange: [0, 1],
          outputRange: [1000, 1],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.timing(translationView, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(translationImage, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.imageWrapper, transformImageStyle]}>
        <Image source={{uri: item?.picture}} style={styles.image} />
      </Animated.View>
      <Animated.View style={[styles.contentContainer, transformViewStyle]}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.title}>
            {item?.firstname} {item?.surname}
          </Text>
          <Text style={styles.email}>{item?.email}</Text>
          <Text style={styles.company}>{item?.company}</Text>
          <View style={styles.personalDetails}>
            <Text>{item?.phone}</Text>
            <View>
              <Text>
                {item?.gender.charAt(0).toUpperCase() + item?.gender.slice(1)}
                <Text> ({item?.age})</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, {'\n'}consectetur adipiscing elit, sed{' '}
            {'\n'} do eiusmod tempor incididunt {'\n'} ut labore et dolore{' '}
            {'\n'} magna aliqua.
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageWrapper: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    elevation: 1,
  },
  contentContainer: {
    marginTop: 80,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsWrapper: {
    marginTop: 60,
  },
  company: {
    color: '#007aff',
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  personalDetails: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  email: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  detail: {},
});

export default UserDetailsScreen;
