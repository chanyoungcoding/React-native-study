import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE ` // token 넣어주기
    }
  };
  
    const getUpcoming = async () => {
      const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      const {results} = await response.json();
      setUpcoming(results)
    }
  
    const getTrending = async () => {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/week', options)
      const {results} = await response.json();
      setTrending(results)
    }

  const getNowPlaying = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    const {results} = await response.json();
    setNowPlaying(results)
  }
  
  const getData = async () => {
    await Promise.all([
      getNowPlaying(),
      getUpcoming(),
      getTrending(),
    ])
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }

  const renderVMedia = ({item}) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  )

  const renderHMedia = ({item}) => (
    <HMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  )

  const movieKeyExtractor = item => item.id

  //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  return loading ? (
    <Loader>
      <ActivityIndicator/>
    </Loader>
  ) : (
    <Container
      refreshing={refreshing} 
      onRefresh={onRefresh}
      data={upcoming}
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
        {nowPlaying.map(movie => (
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
          data={trending}
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
`;

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
`;

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