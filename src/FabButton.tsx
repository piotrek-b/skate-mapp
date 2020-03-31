import React, { useState } from 'react';
import { Button, Icon, Fab } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  fab: {
    backgroundColor: '#5067FF',
  },
  locationButton: {
    backgroundColor: '#fff',
    bottom: 70,
    position: 'absolute',
  },
  locationButtonIcon: {
    color: '#888',
  },
  whatsapp: {
    backgroundColor: '#34A34F',
  },
  facebook: {
    backgroundColor: '#3B5998',
  },
  mail: {
    backgroundColor: '#DD5144',
  },
});

interface IFabButtonProps {
  onClick: () => void;
}

export default ({ onClick }: IFabButtonProps) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Fab
        active={active}
        direction="up"
        style={styles.fab}
        position="bottomRight"
        onPress={() => setActive(!active)}
      >
        <Icon name="star" />
        <Button onPress={onClick} style={styles.whatsapp}>
          <Icon name="logo-whatsapp" />
        </Button>
        <Button style={styles.facebook}>
          <Icon name="logo-facebook" />
        </Button>
        <Button disabled style={styles.mail}>
          <Icon name="mail" />
        </Button>
      </Fab>
      {!active && (
        <Fab
          active={false}
          direction="up"
          style={styles.locationButton}
          position="bottomRight"
        >
          <Icon
            name="md-locate"
            android="md-locate"
            ios="ios-locate"
            style={styles.locationButtonIcon}
          />
        </Fab>
      )}
    </>
  );
};
