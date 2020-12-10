import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

import React, { useCallback, useMemo, useRef } from 'react';
import { View, Dimensions, Image } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import Preparation from '../../components/Preparation';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const RecipeDetail = ({ route, navigation }) => {
  const { colors } = useTheme();

  const { img } = route.params;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%', '98%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Image
        style={{
          height: windowHeight * 0.5,
          width: windowWidth,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={img}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView contentContainerStyle={{ backgroundColor: colors.background }}>
          <Preparation
            onWatchVideoPress={() => {
              navigation.navigate('RecipeVideo');
            }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
      {/* <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,

          height: windowHeight * 0.65,
          backgroundColor: '#FFF',
          zIndex: 1,
        }}>
      </View> */}
    </View>
  );
};

RecipeDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      img: PropTypes.number,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default RecipeDetail;
