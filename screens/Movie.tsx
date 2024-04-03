import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movie = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ` // token 넣어주기
    }
  };

  const getNowPlaying = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    const {results} = await response.json();
    setNowPlaying(results)
    setLoading(false);
  }
  
  useEffect(() => {
    getNowPlaying();
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
        containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg style={StyleSheet.absoluteFill} source={{uri: makeImgPath(movie.backdrop_path)}}/>
            <BlurView 
              tint={isDark ? "dark" : "light"}
              intensity={100} 
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{uri: makeImgPath(movie.poster_path)}}/>
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview>{movie.overview.slice(0, 80)}...</Overview>
                  {movie.vote_average > 0 ? (<Votes>⭐️{movie.vote_average}/ 10</Votes>) : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  )
}

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const BgImg = styled.Image`
`

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`
const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255,255,255, 0.7);
`

const Votes = styled(Overview)`
  font-size: 12px;
`

export default Movie;