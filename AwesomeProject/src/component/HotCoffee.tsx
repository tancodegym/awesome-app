/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Order} from '../type/Order';
import {getCoffee} from '../redux/hot-coffee/hotcoffee.slice';
import {putOrder} from '../redux/order-saga/order.slice';
import {RootState} from '../redux/store';
const {width, height} = Dimensions.get('screen');
const SPACING = 20;
const IMAGE_SIZE = 70;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;

const CoffeeScreen = (): JSX.Element => {
  // const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;

  const coffees: Order[] = useSelector(
    (state: RootState) => state.orderReducer.order,
  );

  const increase = (item: Order): void => {
    const objInc = {
      id: item.id,
      quantity: 1,
    };
    dispatch(putOrder(objInc));
  };

  const decrease = (item: Order): void => {
    const objDec = {
      id: item.id,
      quantity: -1,
    };
    dispatch(putOrder(objDec));
  };

  useEffect(() => {
    dispatch(getCoffee());
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={coffees}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => {
          return '' + item.id;
        }}
        contentContainerStyle={{
          padding: SPACING,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [0, 1, 1, 0],
          });
          return (
            <Animated.View
              style={[
                styles.animatedView,
                {
                  opacity: opacity,
                  transform: [{scale}],
                },
              ]}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.order}>
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={styles.button}
                  onPress={() => {
                    decrease(item);
                  }}>
                  <Text style={styles.text}>-</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: '#FFF'}}>
                  <Text style={styles.text}>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    increase(item);
                  }}>
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </View>

                <Text style={styles.ingredients}>
                  {item.ingredients.join(',  ')}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedView: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: '#464cc2',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 20,
    marginRight: SPACING,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    // color: '#',
    textAlign: 'center',
  },
  button: {
    // borderRadius: 5,
    // // padding: 10,
    // // margin: 10,
    // // width: width / 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  ingredients: {
    fontSize: 16,
    opacity: 0.7,
    color: '#f5ef79',
    width: width / 2,
  },
  order: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    width: width / 5,
    justifyContent: 'space-evenly',
    backgroundColor: 'rgb(0, 255, 255)',
  },
});

export default CoffeeScreen;
