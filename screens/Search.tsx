import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../apis/api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Search = () => {
  const [query, setQuery] = useState("");
  
  const { isPending: moviesPending, data: moviesData, refetch: searchMovies} = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: moviesApi.search,
    enabled: false
  })
  
  const { isPending: tvPending, data: tvData, refetch: searchTv} = useQuery({
    queryKey: ["searchTv", query],
    queryFn: tvApi.tvSearch,
    enabled: false
  })

  console.log(moviesPending)
  
  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if(query === "") return;
    searchMovies();
    searchTv();
  }

  return (
    <Container>
      <SearchBar 
        placeholder='Search for Movie or TV Show' 
        placeholderTextColor="grey"
        returnKeyType='search'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesPending || tvPending ? <Loader/> : null}
      {moviesData ? <HList title='Movie Results' data={moviesData}/> : null }
      {tvData ? <HList title='Tv Results' data={tvData}/> : null }
    </Container>
  )
}

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  width: 90%;
  margin: 10px auto 40px;
  padding: 10px 15px;
  background-color: white;
  border-radius: 15px;
`;

export default Search;