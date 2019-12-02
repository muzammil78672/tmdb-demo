import {createSwitchNavigator} from 'react-navigation';

import OnboardingStack from './onboarding.stack';

import LandingStack from './landing.stack';

import {Splash} from '../screens';

export default createSwitchNavigator({
  Splash,
  Onboarding: OnboardingStack,
  Landing: LandingStack,
});
