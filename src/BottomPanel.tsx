import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Dimensions, Animated, StyleSheet } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Icon } from 'native-base';

import NearestSpotsList from './NearestSpotsList';
import FabButton from './FabButton';
import { IState } from './state/reducers';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreHeader: {
    height: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 28,
    color: '#888',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#2b8a3e',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },
});
const BottomPanel = () => {
  const draggedValue = useMemo(() => new Animated.Value(24), []);
  const selectedSpotId = useSelector((state: IState) => state.selected.spotId);
  const selectedSpot = useSelector(
    (state: IState) => state.spots.byId[selectedSpotId],
  );
  const panel = useRef(null);
  const { top, bottom } = { top: height, bottom: 24 };

  const backgroundOpacity = draggedValue.interpolate({
    inputRange: [360, height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const iconTranslateY = draggedValue.interpolate({
    inputRange: [height - 56, height, top],
    outputRange: [0, 56, 180 - 32],
    extrapolate: 'clamp',
  });

  return !selectedSpot ? (
    <SlidingUpPanel
      ref={panel}
      draggableRange={{ top, bottom }}
      animatedValue={draggedValue}
      snappingPoints={[60, 360]}
      height={height + 24}
      minimumDistanceThreshold={5}
    >
      <View style={styles.panel}>
        <Animated.View
          style={{
            opacity: backgroundOpacity,
            transform: [{ translateY: iconTranslateY }],
          }}
        >
          <FabButton onPress={() => {}} />
        </Animated.View>
        <View style={styles.panelHeader}>
          <Icon style={styles.textHeader} name="md-remove" />
        </View>
        <View style={styles.seeMoreHeader}>
          <Text>Nearest spots</Text>
        </View>
        <NearestSpotsList />
      </View>
    </SlidingUpPanel>
  ) : null;
};

export default BottomPanel;
