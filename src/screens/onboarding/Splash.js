import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import * as Actions from '../../redux/actions';

import Helper from '../../common/helper';

class Splash extends Component {
  componentDidMount() {
    setTimeout(async () => {
      let token = await Helper.getData('token');
      if (token) {
        this.props.saveToken(token);
        this.props.saveUser(await Helper.getData('user'));
        this.props.navigation.navigate('Landing');
      } else {
        this.props.navigation.navigate('Onboarding');
      }
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>RN TMDB Demo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  h1: {
    fontSize: 30,
  },
});

const mapDispatchToProps = dispatch => ({
  saveUser: data => dispatch(Actions.User.saveUser(data)),
  saveToken: data => dispatch(Actions.User.saveToken(data)),
});

export default connect(null, mapDispatchToProps)(Splash);
