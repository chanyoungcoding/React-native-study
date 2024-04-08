import { useQuery, useQueryClient  } from '@tanstack/react-query';
import React, { useState } from 'react';

import { RefreshControl, ScrollView } from 'react-native';
import { tvApi } from '../apis/api';
import Loader from '../components/Loader';
import HList, { HListSeparator } from '../components/HList';

const Tv = () => {

  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const {data: trendingData, isPending: trendingPending, isRefetching: trendingRefetching} = useQuery({
    queryKey: ["tv", "tvTrending"],
    queryFn: tvApi.tvTrending
  })

  const {data: airingTodayData, isPending: ariringTodayPending, isRefetching: ariringTodayRefetching} = useQuery({
    queryKey: ["tv", "tvAiringToday"],
    queryFn: tvApi.tvAiringToday
  })

  const {data: topRatedData, isPending: topRatedPending, isRefetching: topRatedRefetching} = useQuery({
    queryKey: ["tv", "tvTopRated"],
    queryFn: tvApi.tvTopRated
  })

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({ queryKey: ["tv"]})
    setRefreshing(false);
  }

  const loading = trendingPending || ariringTodayPending || topRatedPending;
  
  return loading ? (<Loader/>) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } 
      contentContainerStyle={{paddingVertical: 30}}
    >
      <HList title='Trending TV' data={trendingData}/>
      <HList title='Today TV' data={airingTodayData}/>
      <HList title='Top TV' data={topRatedData}/>
    </ScrollView>
  )
}

export default Tv;