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
import {Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import {RootStackParamList} from 'App';
import {RouteProp} from '@react-navigation/native';

type Props = {
  route: RouteProp<RootStackParamList, 'Article'>;
};

const Articles: FC<Props> = ({route}) => {
  const {id} = route.params;
  const {data} = useQuery(
    gql`
      query getArticle($id: String!) {
        article(id: $id) {
          id
          title
          author {
            id
            name
          }
        }
      }
    `,
    {
      variables: {id},
      returnPartialData: true,
    },
  );
  return (
    <>
      {data.article.title && <Text>Title: {data.article.title}</Text>}
      {data.article.author && <Text>Author: {data.article.author.name}</Text>}
    </>
  );
};

export default Articles;
