/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withSpring,
  withDelay,
  runOnJS,
  withSequence,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');
const LoginScreen = (): JSX.Element => {
  const [isRegister, setIsRegister] = useState(false);
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 1.9, 0],
    );
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 0]);
    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });
  const closeButtonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 100}),
      transform: [{rotate: withTiming(interpolation + 'deg', {duration: 100})}],
    };
  });
  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, {duration: 800}))
          : withTiming(0, {duration: 300}),
    };
  });
  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}],
    };
  });
  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegister) {
      runOnJS(setIsRegister)(false);
    }
  };
  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegister) {
      runOnJS(setIsRegister)(true);
    }
  };

  //   useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require('/Users/tan.tran2/Desktop/awesome-app/AwesomeProject/assets/images/login-background.jpg')}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="#clipPathId"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonAnimatedStyle]}>
          <TouchableOpacity
            onPress={() => (imagePosition.value = 1)}
            hitSlop={{
              left: 10,
              right: 10, // To increase press area on the right side
              bottom: 10,
              top: 10,
            }}>
            <Text>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          {isRegister && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable
              onPress={() =>
                (formButtonScale.value = withSequence(
                  withSpring(1.5),
                  withSpring(1),
                ))
              }>
              <Text style={styles.buttonText}>
                {isRegister ? 'REGISTER' : 'LOGIN'}
              </Text>
            </Pressable>
          </Animated.View>
          {!isRegister && (
            <View>
              <View style={styles.forgotPassword}>
                <Pressable style={styles.buttonForgot}>
                  <Text style={styles.textForgot}>Forgot password?</Text>
                </Pressable>
              </View>
              <View style={styles.social}>
                <View>
                  <MaterialCommunityIcons
                    name="facebook"
                    size={30}
                    color="#0080FF"
                  />
                </View>
                <View>
                  <MaterialCommunityIcons name="google" size={30} color="red" />
                </View>
                <View>
                  <MaterialCommunityIcons
                    name="apple"
                    size={30}
                    color="black"
                  />
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'rgba(123,104,238,0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  formButton: {
    backgroundColor: 'rgba(123,104,238,0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 70,
    zIndex: -1,
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    top: -20,
  },
  forgotPassword: {
    marginTop: 5,
  },
  buttonForgot: {
    alignItems: 'center',
  },
  textForgot: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    marginBottom: 15,
  },
  iconFacebook: {
    color: 'blue',
    width: 40,
    height: 40,
  },
});
export default LoginScreen;
