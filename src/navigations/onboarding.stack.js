import {createStackNavigator} from 'react-navigation-stack';

import {SignIn, SignUp} from '../screens';

export default createStackNavigator(
  {
    SignIn,
    SignUp,
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);
