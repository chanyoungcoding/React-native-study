import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

import { Movie, moviesApi } from '../apis/api';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import Loader from '../components/Loader';
import HList from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {

  const [refreshing, setRefreshing] = useState(false);

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

  const renderHMedia = ({item} : {item: Movie}) => (
    <HMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData = {item}
    />
  )

  const movieKeyExtractor = (item: Movie) => item.id.toString();

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({ queryKey: ["movies"]})
    setRefreshing(false);
  }
  const loading = upcomingPending || trendingPending || nowPlayingPending;

  return loading ? (
    <Loader/>
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
            fullData = {movie}
          />
        ))}
      </Swiper>
      <HList title='Trending Movies' data={trendingData}/>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      </>
      }
    />
  )
}

const Container = styled.FlatList`
  background-color: ${props => props.theme.mainBgColor};
`as unknown as typeof FlatList;

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