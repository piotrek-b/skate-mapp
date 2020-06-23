import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
  NavigationState,
} from '@react-navigation/native';
import { Caption, Chip, Appbar, useTheme } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';

import { IState } from '../../../state/reducers';
import Longboard from '../../shared/Longboard';
import BottomButtons from '../../shared/BottomButtons';

type RouteParamsType = {
  Categories: {
    categoriesIds: any[];
  };
};

type ScreenRouteProp = RouteProp<RouteParamsType, 'Categories'>;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    marginLeft: 2.5,
    marginRight: 2.5,
    width: (Dimensions.get('window').width - 10) / 2,
  },
  content: {
    margin: 20,
  },
});

export default () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState(
    route.params.categoriesIds || [],
  );
  const categoriesById = useSelector((state: IState) => state.categories.byId);
  const categoriesIds = useSelector((state: IState) => state.categories.ids);

  const onRightButtonPress = useCallback(() => {
    navigation.dispatch((state: NavigationState) => {
      const routes = state.routes.filter((r) => r.name !== 'AddCategories');
      const lastRoute = routes[routes.length - 1];
      lastRoute.params = {
        ...lastRoute.params,
        categories: selectedCategoriesIds,
      };

      return CommonActions.reset({
        ...state,
        stale: true,
        routes,
        index: routes.length - 1,
      });
    });
  }, [navigation, selectedCategoriesIds]);
  const onLeftButtonPress = useCallback(() => {
    setSelectedCategoriesIds([]);
  }, []);
  const onChipPress = useCallback(
    (isSelected, category) => {
      if (isSelected) {
        setSelectedCategoriesIds(
          selectedCategoriesIds.filter(
            (selectedCategoryId) => selectedCategoryId !== category.id,
          ),
        );
      } else {
        setSelectedCategoriesIds([...selectedCategoriesIds, category.id]);
      }
    },
    [selectedCategoriesIds],
  );

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Categories" />
      </Appbar.Header>
      <View style={styles.content}>
        <Caption>Longboard</Caption>
        <View style={styles.flex}>
          {categoriesIds.map((id) => {
            const category = categoriesById[id];
            const isSelected = selectedCategoriesIds.includes(category.id);
            return (
              <Chip
                key={category.id}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.background,
                  },
                ]}
                selectedColor={isSelected ? theme.colors.background : null}
                icon={({ color, size }) => (
                  <Longboard color={color} width={size} height={size} />
                )}
                onPress={() => onChipPress(isSelected, category)}
                selected={isSelected}
              >
                {category.title}
              </Chip>
            );
          })}
        </View>
      </View>
      <BottomButtons
        leftProps={{
          onPress: onLeftButtonPress,
        }}
        rightProps={{
          onPress: onRightButtonPress,
        }}
      />
    </View>
  );
};
