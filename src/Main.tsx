import React from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';

export default () => {
  const [active, setActive] = React.useState(false);
  return (
    <Container>
      <Header />
      <View style={{ flex: 1 }}>
        <Fab
          active={active}
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => setActive(!active)}
        >
          <Icon name="share" />
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon name="mail" />
          </Button>
        </Fab>
      </View>
    </Container>
  );
};
