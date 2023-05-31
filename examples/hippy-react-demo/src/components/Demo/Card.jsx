import { View, Text, Image, ScrollView, Animation, StyleSheet } from '@hippy/react';
import React from 'react';

export default class Card extends React.Component {
  state = {
    spanTitle: '富文本第一段2',
    spanColor: 'red',
  };

  handleClick = () => {
    this.animationX.start()
    this.animationR.start()
  };

  componentWillMount() {
    this.animationX = new Animation({
      startValue: 0,
      toValue: 300,
      duration: 1000,
      mode: 'timing',
      timingFunction: 'linear', // 动画缓动函数
      repeatCount: 'loop',
    })
    this.animationR = new Animation({
      startValue: 0,
      toValue: 360,
      duration: 1000,
      valueType: 'deg',
      mode: 'timing',
      timingFunction: 'linear', // 动画缓动函数
      repeatCount: 'loop',
    })
  }

  componentWillUnmount() {
    if (this.animationX) {
      this.animationX.destroy()
    }
    if (this.animationR) {
      this.animationR.destroy()
    }
  }

  renderHeader = () => {
    const { item } = this.props;

    return (
      <View style={styles.headerContainer}>
        <Image
          ref={(ref) => (this.imageRef = ref)}
          style={[
            styles.avatar,
            {
              transform: [{
                translateX: this.animationX,
                rotate: this.animationR,
              }]
            },
          ]}
          source={{ uri: item.avatarUrl }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>2022-06-18 15:05</Text>
        </View>
        <Image
          style={styles.arrow}
          source={{
            uri:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASBAMAAAB/WzlGAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMAIN/PELVZAGcAAAAkSURBVAjXYwABQTDJqCQAooSCHUAcVROCHBiFECTMhVoEtRYA6UMHzQlOjQIAAAAASUVORK5CYII=',
          }}
        />
      </View>
    );
  };

  render() {
    const { index, item } = this.props;
    const { animated, spanTitle } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.cardContainer} onClick={this.handleClick}>
          {this.renderHeader()}
          <View style={styles.contentContainer}>
            <Text style={styles.richTextContainer} verticalAlign='middle'>
              <Text style={styles.spanTitle1}>{spanTitle}</Text>
              <Image
                style={styles.spanImage}
                resizeMode='cover'
                source={{
                  uri:
                    'https://imgs.qiubiaoqing.com/qiubiaoqing/imgs/61f566c9b11a5bEZ.gif',
                }}
              />
              <Text style={styles.spanTitle}>
                {'哈哈哈哈哈哈哈哈哈哈哈富文本第二段 index:' + index}
              </Text>
            </Text>
            <Text style={styles.detailText}>{item.detailInfo}</Text>
            {item.pictures && item.pictures.length > 0 && (
              <ScrollView horizontal={true}>
                <View style={styles.pictureContainer}>
                  {item.pictures.map((picture, index) => (
                    <Image
                      key={index}
                      style={styles.picture}
                      source={{ uri: picture }}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 0xFFF5F5F6,
  },
  cardContainer: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 0xff999999,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: 'black',
  },
  arrow: {
    width: 10,
    height: 17,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 82,
    marginRight: 16,
  },
  richTextContainer: {
    backgroundColor: 'yellow',
    marginRight: 10,
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spanTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  spanTitle1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },
  spanImage: {
    width: 60,
    height: 40,
    borderRadius: 5,
  },
  detailText: {
    marginTop: 15,
    marginRight: 50,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 'normal',
    color: 0xff999999,
    lineHeight: 19,
  },
  pictureContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  picture: {
    width: 92,
    height: 92,
    marginRight: 8,
    backgroundColor: 0xff999999,
    borderRadius: 4,
  },
});
