/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import Image from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '@components/loading';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import SearchBar from '../../components/Search';
import TextEle from '../../components/TextEle';

const ITEM_HEIGHT = 100;

const FilterList = ({ route }) => {
  const { where, userId } = route.params;
  const { data, loading, error } = useInfiniteScroll({
    callback: coursesQuery,
    callbackProps: {
      sort: 'updated_at:DESC',
      where,
      userId,
    },
    limit: 10,
    response: 'courses',
  });
  const insets = useSafeAreaInsets();
  // const { data, isValidating, size, setSize } = useSWRInfinite((...props) =>
  //   getInfiniteFilteredCourses(...props, where, userId),
  // );

  // const { data, isValidating } = useSWR([coursesCategoryQuery(0, 5, 'updated_at:DESC', where)]);
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const onChangeText = val => {
    setText(val);
  };
  const keyExtractor = useCallback(item => `${item?.id}`, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          height: ITEM_HEIGHT,
        }}>
        <Image
          source={{ uri: item?.image?.formats?.thumbnail?.url || item?.image?.url }}
          style={{ height: ITEM_HEIGHT, width: ITEM_HEIGHT, borderRadius: 5 }}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <TextEle variant="body1">{item.name}</TextEle>
          <TextEle variant="body1">{item.caption}</TextEle>
        </View>
      </View>
    ),
    [],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  if (!loading && data.length === 0) {
    return (
      <View style={{ alignItems: 'center' }}>
        <LottieView
          source={require('@assets/lottie/9923-box-empty.json')}
          style={{ height: 600, width: 600 }}
          autoPlay
          loop
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
            bottom: 150,
          }}>
          <TextEle variant="error" style={{ color: colors.primary, textAlign: 'center' }}>
            Sorry!!
          </TextEle>
          <TextEle variant="error1" style={{ color: colors.primary, textAlign: 'center' }}>
            No data available
          </TextEle>
        </View>
      </View>
    );
  }

  if (loading && data.length === 0) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 10 }}>
        <SearchBar onChangeText={onChangeText} text={text} />
      </View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: insets.bottom + 15,
          marginHorizontal: 20,
        }}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        ListFooterComponent={() => {
          if (loading) {
            return <Loading />;
          }
          return null;
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              marginVertical: 10,
            }}
          />
        )}
        onEndReached={() => {
          // if (distanceFromEnd < 0) return;
          // setPage(page + 1);
        }}
        onEndReachedThreshold={0.9}
      />
    </View>
  );
};

export default FilterList;
