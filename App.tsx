/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  Reference,
} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Articles from './Articles';
import Article from './Article';
import unfetch from 'unfetch';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          article(
            existingDataFromCache: Reference | undefined,
            {args, toReference},
          ) {
            return (
              existingDataFromCache ||
              (args?.id &&
                toReference({
                  __typename: 'Article',
                  id: args.id,
                }))
            );
          },
        },
      },
    },
  }),
  link: new HttpLink({
    uri: 'https://metaphysics-production.artsy.net/',
    //Workaround react-native-debugger bug
    fetch: unfetch,
  }),
});

export type RootStackParamList = {
  Articles: undefined;
  Article: {id: string};
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Articles" component={Articles} />
            <RootStack.Screen name="Article" component={Article} />
          </RootStack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default App;
