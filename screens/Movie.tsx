import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movie = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjQyM2Y0MWNmNTY4YTY1NDJhMjAzYzA0M2JlMzI0MyIsInN1YiI6IjY0M2ZlOWJiN2U0MDNkMDJmYzI1OTk2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jry2V7IwAMEedIiBYhEXioFY3OokzRHqyKcDzdCdWdE'
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
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg style={StyleSheet.absoluteFill} source={{uri: makeImgPath(movie.backdrop_path)}}/>
            <BlurView intensity={100} style={StyleSheet.absoluteFill}>
              <Title>{movie.original_title}</Title>
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

const Title = styled.Text`
  
`

export default Movie;