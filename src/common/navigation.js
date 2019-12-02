import {NavigationActions, StackActions} from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateAndReset(routeName, key, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: key,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

export default {
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
};
