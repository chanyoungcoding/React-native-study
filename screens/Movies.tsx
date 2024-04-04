import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import Poster from '../components/Poster';

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies = () => {
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

  return loading ? (
    <Loader>
      <ActivityIndicator/>
    </Loader>
  ) : (
    <Container>
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
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 30}}
      >
        {trending.map(movie => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path}/>
            <Title>
              {movie.original_title.slice(0,13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes>
              {movie.vote_average > 0 ? (`⭐️ ${Math.trunc(movie.vote_average) } / 10`) : `Coming soon` }
            </Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  )
}

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ListTitle = styled.Text`
  margin-left: 30px;
  color: white;
  font-size: 16px;
  font-weight:  600;
`

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255,255,255, 0.8);
  font-size: 10px;
`;


export default Movies;