/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'App';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Articles'>;
};

const Articles: FC<Props> = ({navigation}) => {
  const {data} = useQuery(gql`
    query getArticles {
      articles {
        id
        title
      }
    }
  `);
  return (
    <>
      {data?.articles && (
        <View>
          {data.articles.map(({id, title}: any) => (
            <Text key={id} onPress={() => navigation.navigate('Article', {id})}>
              {title}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default Articles;
