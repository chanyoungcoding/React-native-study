import React from 'react'
import styled from 'styled-components/native';
import VMedia from './VMedia';
import { FlatList } from 'react-native';

interface HListProps {
  title: string;
  data: any[];
}

const HList:React.FC<HListProps> = ({title, data}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
          horizontal
          data={data}
          contentContainerStyle={{paddingHorizontal: 30}}
          ItemSeparatorComponent={HListSeparator}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_title ?? item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        />
    </ListContainer>
  )
}

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  margin:  10px 0px 10px 30px;
  color: white;
  font-size: 16px;
  font-weight:  600;
`;

export const HListSeparator = styled.View`
  width: 20px;
`

export default HList