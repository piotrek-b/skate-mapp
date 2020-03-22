import React from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  fab: {
    backgroundColor: '#5067FF'
  },
  whatsapp: {
    backgroundColor: '#34A34F'
  },
  facebook: {
    backgroundColor: '#3B5998'
  },
  mail: {
    backgroundColor: '#DD5144'
  }
});

export default () => {
  const [active, setActive] = React.useState(false);
  return (
    <Container>
      <Header />
      <View style={styles.view}>
        <Fab
          active={active}
          direction="up"
          style={styles.fab}
          position="bottomRight"
          onPress={() => setActive(!active)}
        >
          <Icon name="share" />
          <Button style={styles.whatsapp}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={styles.facebook}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={styles.mail}>
            <Icon name="mail" />
          </Button>
        </Fab>
      </View>
    </Container>
  );
};
