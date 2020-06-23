import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { Button, Caption, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
import imgSrc from '../../../assets/imgSrc.jpg';

import { IState } from '../../state/reducers';
import {
  facebookSignInRequested,
  googleSignInRequested,
} from '../../state/actions/accountActions';
import { FACEBOOK_COLOR, GOOGLE_COLOR, RouteNames } from '../../consts';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  image: {
    position: 'absolute',
  },
  container: {
    marginTop: 20,
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: Dimensions.get('window').height / 2 - 200,
    marginBottom: 80,
  },
  titleText: {
    fontFamily: 'Pacifico',
    fontSize: 40,
  },
  button: {
    marginBottom: 20,
    width: 280,
  },
});

export default () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: IState) => state.account.data);

  if (!userData) {
    return <></>;
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.background }]}>
      <Image
        style={[
          styles.image,
          {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          },
        ]}
        resizeMode="cover"
        source={imgSrc}
        blurRadius={1}
      />
      <View style={styles.container}>
        <View style={[styles.flex, styles.title]}>
          <Text
            style={[
              styles.titleText,
              {
                color: theme.colors.surface,
              },
            ]}
          >
            SkateMapp
          </Text>
        </View>
        <View style={styles.flex}>
          <Button
            icon="facebook"
            mode="contained"
            color={FACEBOOK_COLOR}
            onPress={() => dispatch(facebookSignInRequested())}
            style={styles.button}
          >
            Continue with Facebook
          </Button>
          <Button
            icon="google"
            mode="contained"
            color={GOOGLE_COLOR}
            onPress={() => dispatch(googleSignInRequested())}
            style={styles.button}
          >
            Continue with Google
          </Button>
        </View>
        <View style={[styles.flex]}>
          <Caption style={{ color: theme.colors.surface }}>OR</Caption>
        </View>
        <View style={[styles.flex, styles.container]}>
          <Button
            onPress={() => navigation.navigate(RouteNames.MAIN)}
            style={styles.button}
            color={theme.colors.surface}
          >
            Skip
          </Button>
        </View>
      </View>
    </View>
  );
};
