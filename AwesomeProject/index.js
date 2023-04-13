/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {RNPushNotification} from './RNPushNotification.helper';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
RNPushNotification.config();
// PushNotification.localNotification({
//   channelId: 'default-channel-id',
//   autoCancel: true,
//   largeIcon: 'ic_launcher',
//   smallIcon: 'ic_notification',
//   color: 'green',
//   vibrate: true,
//   vibration: 300,
//   title: '34234',
//   message: '234234',
//   ongoing: true,
//   playSound: true,
//   soundName: 'default',
//   actions: ['Accept', 'Reject', 'Denied'],
//   invokeApp: false,
// });
// const client = new ApolloClient({
//   uri: 'https://flyby-router-demo.herokuapp.com/',
//   cache: new InMemoryCache(),
// });
AppRegistry.registerComponent(appName, () => App);
