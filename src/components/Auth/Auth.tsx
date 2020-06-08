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
import { FACEBOOK_COLOR, GOOGLE_COLOR } from '../../consts';

const styles = StyleSheet.create({
  view: {
    flex: 1,
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
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        resizeMode="cover"
        source={imgSrc}
        blurRadius={1}
      />
      <View style={styles.container}>
        <View style={[styles.flex, styles.title]}>
          <Text
            style={{
              color: theme.colors.surface,
              fontFamily: 'Pacifico',
              fontSize: 40,
            }}
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
        <View style={[styles.flex, { marginTop: 20 }]}>
          <Button
            onPress={() => navigation.navigate('Main')}
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
