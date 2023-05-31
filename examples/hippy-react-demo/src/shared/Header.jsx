import React from 'react';
import { withRouter } from 'react-router-dom';
import HippyReact, {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from '@hippy/react';

import BACK_ICON from './back-icon.png';

const SKIN_COLOR = {
  mainLight: '#4c9afa',
  otherLight: '#f44837',
  textWhite: '#fff',
};

const styles = StyleSheet.create({
  container: {
    height: 34,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  backIcon: {
    width: 10,
    height: 17,
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    position: 'absolute',
  },
  headerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    color: 'black',
    lineHeight: 24,
    fontWeight: 'bold',
  },
});

const Header = ({ history, route }) => {
  // home page Navigator
  if (history.index === 0) {
    return (
      <View style={[styles.container]}>
        <View style={{ backgroundColor: styles.title.backgroundColor, marginLeft: 12 }}>
          <Text numberOfLines={1} style={[styles.title, { fontWeight: 'bold' }]}>
            {route.name}
          </Text>
        </View>
        <View style={styles.headerButton}>
          <Text numberOfLines={1} style={styles.title}>
            ver: {HippyReact.version !== 'unspecified' ? `${HippyReact.version}` : 'master'}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <Image
        style={styles.backIcon}
        onClick={() => history.goBack()}
        source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAASBAMAAAB/WzlGAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMAIN/PELVZAGcAAAAkSURBVAjXYwABQTDJqCQAooSCHUAcVROCHBiFECTMhVoEtRYA6UMHzQlOjQIAAAAASUVORK5CYII=" }}
      />
      <Text numberOfLines={1} style={styles.title}>
        {route.name}
      </Text>
    </View>
  );
};

export default withRouter(Header);
