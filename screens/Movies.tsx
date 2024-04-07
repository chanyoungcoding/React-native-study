import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Movie, moviesApi } from '../apis/api';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {

  const queryClient = useQueryClient();

  const {
    data: upcomingData, 
    error: upcomingError, 
    isPending: upcomingPending,
    isRefetching: isRefetchingUpcoming
    
  } = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: moviesApi.upcoming
  })

  const {
    data: trendingData, 
    error: trendingError, 
    isPending: trendingPending,
    isRefetching: isRefetchingTrending
  } = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: moviesApi.trending
  })

  const {
    data: nowPlayingData, 
    error: nowPlayingError, 
    isPending: nowPlayingPending,
    isRefetching: isRefetchingNowPlaying
  } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: moviesApi.nowPlaying
  })

  const renderVMedia = ({item} : {item: Movie}) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  )

  const renderHMedia = ({item} : {item: Movie}) => (
    <HMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  )

  const movieKeyExtractor = (item: Movie) => item.id.toString();

  const onRefresh = async () => {
    await queryClient.refetchQueries({ queryKey: ["movies"]})
  }
  const loading = upcomingPending || trendingPending || nowPlayingPending;
  const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming; 
  return loading ? (
    <Loader>
      <ActivityIndicator/>
    </Loader>
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing} 
      data={upcomingData}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
      ListHeaderComponent={
      <>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        style={{ marginBottom: 500 }}
        containerStyle={{ marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4}}
      >
        {nowPlayingData.map((movie: Movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}
          ItemSeparatorComponent={VSeparator}
          keyExtractor={movieKeyExtractor}
          data={trendingData}
          renderItem={renderVMedia}
        />
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      </>
      }
    />
  )
}

const Container = styled.FlatList`
  background-color: ${props => props.theme.mainBgColor};
`as unknown as typeof FlatList;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-left: 30px;
  color: white;
  font-size: 16px;
  font-weight:  600;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`

const VSeparator = styled.View`
  width: 20px;
`
const HSeparator = styled.View`
  width: 20px;
`


export default Movies;