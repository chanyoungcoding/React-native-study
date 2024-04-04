import React from 'react'
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { makeImgPath } from '../utils';
import { StyleSheet, useColorScheme } from 'react-native';
import Poster from './Poster';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide:React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {

  const isDark = useColorScheme() === "dark";

  return (
    <View>
      <BgImg style={StyleSheet.absoluteFill} source={{uri: makeImgPath(backdropPath)}}/>
      <BlurView 
        tint={isDark ? "dark" : "light"}
        intensity={85} 
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            <Overview>{overview.slice(0, 80)}...</Overview>
            {voteAverage > 0 ? (<Votes>⭐️{Math.trunc(voteAverage)}/ 10</Votes>) : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  )
}

const View = styled.View`
  flex: 1;
`

const BgImg = styled.Image`
`

const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
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

export default Slide