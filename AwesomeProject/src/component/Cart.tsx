/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Order} from '../type/Order';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
import {deleteOrder} from '../redux/order-saga/order.slice';

const {width, height} = Dimensions.get('screen');
const SPACING = 20;
const IMAGE_SIZE = 70;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;
const renderRightActions = (
  progress: Animated.AnimatedInterpolation<any>,
  dragX: Animated.AnimatedInterpolation<any>,
) => {
  const opacity = dragX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.swipedRow}>
      <View style={styles.swipedConfirmationContainer}>
        <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
      </View>
      <Animated.View style={[styles.deleteButton, {opacity}]}>
        <TouchableOpacity>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
const CartScreen = (): JSX.Element => {
  const isFocused = useIsFocused();
  const [data, setData] = useState<Order[]>([]);
  const dispatch = useDispatch();
  const orders: Order[] = useSelector(
    (state: RootState) => state.orderReducer.order,
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isFocused) {
      console.log('Cart Screen');
    }
    getOrders();
  }, [isFocused]);
  const getOrders = (id?: number) => {
    const orderList: Order[] = [];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].quantity > 0) {
        if (id && orders[i].id === id) {
          orders[i].quantity = 0;
          orderList.push(orders[i]);
        }
        orderList.push(orders[i]);
      }
    }
    setData(orderList);
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
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

          function setIdSwiped(
            id: number,
          ):
            | ((
                event: import('react-native-gesture-handler').HandlerStateChangeEvent<
                  Record<string, any>
                >,
              ) => void)
            | undefined {
            return event => {
              const nativeEvent = event.nativeEvent;
              if (
                nativeEvent.translationX < -150 ||
                nativeEvent.x < 50 ||
                nativeEvent.absoluteX < 60 ||
                nativeEvent.translationX === 0
              ) {
                dispatch(deleteOrder(id));
                getOrders(id);
              }
            };
          }

          return (
            <Swipeable
              renderRightActions={renderRightActions}
              onEnded={setIdSwiped(item.id)}>
              <Animated.View
                style={[
                  styles.animatedView,
                  {
                    opacity: opacity,
                    transform: [{scale}],
                  },
                ]}>
                <Image source={{uri: item.image}} style={styles.image} />
                {/* <View style={styles.order}>
                <TouchableOpacity
                  activeOpacity={0.1}
                  style={styles.button}
                >
                  <Text style={styles.text}>-</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: '#FFF'}}>
                  <Text style={styles.text}>0</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    increase(item);
                  }}>
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
              </View> */}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  </View>

                  <Text style={styles.ingredients}>{item.quantity}</Text>
                </View>
              </Animated.View>
            </Swipeable>
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
    // color: '#464cc2',
    textAlign: 'center',
  },
  button: {
    // // borderRadius: 15,
    // // padding: 10,
    // // margin: 10,
    // // width: width / 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  ingredients: {
    fontSize: 22,
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
    backgroundColor: 'gray',
  },
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // paddingLeft: 5,
    backgroundColor: '#818181',
    marginBottom: 20,
    borderRadius: 15,
    // minHeight: 50,
    opacity: 0,
  },
  swipedConfirmationContainer: {
    flex: 1,
    alignItems: 'center',
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '90%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

export default CartScreen;
