import React, { PureComponent } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextEle from '../TextEle';
// import styles from '../../../commonStyle';
const { width, height } = Dimensions.get('window');
class ImagePicker extends PureComponent {
  state = {
    isModalVisible: false,
  };

  openImageSelector = () => {
    this.setState(state => ({ isModalVisible: !state.isModalVisible }));
  };

  render() {
    const { children, colors, onSelectImage } = this.props;
    const { isModalVisible } = this.state;
    return (
      <>
        {children}
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                padding: 12,
                justifyContent: 'center',
                backgroundColor: colors.card,
                width: width * 0.9,
                height: height * 0.28,
                marginBottom: 20,
              }}>
              <View
                style={{
                  marginBottom: 20,
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'white',
                }}>
                <TextEle variant="title1" style={{ paddingVerticle: 8, color: colors.text }}>
                  Select Image
                </TextEle>
              </View>
              <Pressable
                style={{ paddingVerticle: 8 }}
                onPress={() =>
                  launchCamera(
                    {
                      mediaType: 'photo',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    response => {
                      this.openImageSelector(false);
                      onSelectImage(response);
                    },
                  )
                }>
                <View style={{ margingVerticle: 10 }}>
                  <TextEle variant="subTitle2" style={{ marginVerticle: 5 }}>
                    Take Photo
                  </TextEle>
                </View>
              </Pressable>
              <Pressable
                style={{ paddingVertical: 8 }}
                onPress={() =>
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    response => {
                      this.openImageSelector(false);
                      onSelectImage(response);
                    },
                  )
                }>
                <View style={{ margingVerticle: 10 }}>
                  <TextEle variant="subTitle2">Choose From Library</TextEle>
                </View>
              </Pressable>
              <Pressable
                style={{ paddingVertical: 3, alignSelf: 'flex-end' }}
                onPress={() => this.openImageSelector(false)}>
                <TextEle variant="h1" style={{ fontSize: 16 }}>
                  CANCEL
                </TextEle>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default ImagePicker;
