import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet,Linking } from 'react-native'
import styled from 'styled-components/native'
import { Movie, TV, moviesApi, tvApi } from '../apis/api';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '../colors';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import * as WebBrowser from "expo-web-browser";

import {Ionicons} from "@expo/vector-icons";

type RootStackParamList = {
  Detail: Movie | TV
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Detail:React.FC<DetailScreenProps> = ({navigation: { setOptions }, route: { params }}) => {

  const isMovie = "original_title" in params;

  const {isPending, data} = useQuery({
    queryKey: [isMovie ? "movies" : "tv", params.id],
    queryFn: isMovie ? moviesApi.detail : tvApi.tvDetail,
    enabled: "original_title" in params
  })

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV"
    })
  }, [])

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  }

  return (
    <Container>
      <Header>
        <Background style={StyleSheet.absoluteFill} source={{uri: makeImgPath(params.backdrop_path || "")}}/>
        {/* <LinearGradient colors={["transparent", BLACK_COLOR]} style={StyleSheet.absoluteFill} /> */}
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params ? params.original_title : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isPending ? <Loader/> : null}
        {data?.videos?.results?.map(video => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name='logo-youtube' color="white" size={20}/>
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  )
}

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`

const Background = styled.Image`
  
`;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 20px 0px;
  padding: 0 20px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

export default Detail