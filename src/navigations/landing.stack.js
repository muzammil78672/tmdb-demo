import {createBottomTabNavigator} from 'react-navigation-tabs';

import {Movies, Profile} from '../screens';

export default createBottomTabNavigator(
  {
    Movies,
    Profile,
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 26,
        paddingBottom: 5,
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(228,228,228)',
      },
    },
  },
);
