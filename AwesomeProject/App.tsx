/* eslint-disable react/no-unstable-nested-components */

import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import BottomTab from './src/component/Bottom';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Platform, Text} from 'react-native';
import {useEffect} from 'react';
import {Box, Center, extendTheme, NativeBaseProvider} from 'native-base';
import {ColorMode} from 'native-base';
import type {StorageManager} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import LoginScreen from './src/component/Login';

function App({children, theme}: any): JSX.Element {
  useEffect(() => {
    checkNotifications().then(({status}: {status: string}) => {
      if (status === 'denied') {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          requestNotifications([]);
        } else {
          requestNotifications(['alert', 'badge']);
        }
      }
    });
  }, []);
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        if (value) {
          await AsyncStorage.setItem('@my-app-color-mode', value);
        }
      } catch (e) {
        console.log(e);
      }
    },
  };
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
  });
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({message, path}) => {
        console.error(`[GraphQL error]: Message: ${message}, path: ${path}`);
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
    // if (networkError && networkError. === 404) {
    //   console.error('[404 error]: The requested resource could not be found.');
    // }
  });
  const client = new ApolloClient({
    // uri: 'http://localhost:8080/graphiql/',
    // link: errorLink.concat(httpLink),
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy(currentPolicy) {
          if (
            currentPolicy === 'network-only' ||
            currentPolicy === 'cache-and-network'
          ) {
            return 'cache-first';
          }
          return currentPolicy;
        },
      },
    },
  });
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NativeBaseProvider
          config={config}
          theme={theme}
          colorModeManager={colorModeManager}>
          <NavigationContainer>
            <LoginScreen />
          </NavigationContainer>
        </NativeBaseProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
