import React from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Separator,
  ListItem
} from 'native-base';

export default () => {
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content>
        <Separator bordered>
          <Text>MIDFIELD</Text>
        </Separator>
        <ListItem>
          <Text>Caroline Aaron</Text>
        </ListItem>
        <ListItem last>
          <Text>Lee Allen</Text>
        </ListItem>
        <Separator bordered>
          <Text>MIDFIELD</Text>
        </Separator>
        <ListItem>
          <Text>Caroline Aaron</Text>
        </ListItem>
        <ListItem last>
          <Text>Lee Allen</Text>
        </ListItem>
      </Content>
    </Container>
  );
};
