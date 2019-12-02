import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

import * as Actions from '../../redux/actions';

import Validations from '../../common/validations';

class SignIn extends Component {
  render() {
    return (
      <Formik
        validationSchema={Validations.SigninForm}
        validateOnBlur={true}
        validateOnChange={true}
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          this.props.login(values);
        }}>
        {props => (
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Email Address <Text style={styles.mandatory}>*</Text>
              </Text>
              <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                style={styles.inputField}
                value={props.values.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Password <Text style={styles.mandatory}>*</Text>
              </Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                style={styles.inputField}
                value={props.values.password}
              />
            </View>
            <TouchableOpacity
              onPress={props.submitForm}
              style={{marginTop: hp('6%')}}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Login</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text>New user ? </Text>
              <TouchableOpacity
                onPress={() => {
                  props.resetForm();
                  this.props.navigation.navigate('SignUp');
                }}>
                <Text style={styles.signUpText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mandatory: {
    color: 'red',
  },
  label: {
    fontSize: 14,
    marginBottom: 7,
  },
  inputContainer: {
    width: wp('80%'),
    marginTop: hp('3%'),
  },
  inputField: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: '100%',
    fontSize: 16,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  loginText: {
    fontSize: 16,
    color: 'white',
  },
  signUpContainer: {
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: 'blue',
  },
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(Actions.User.login(data)),
});

export default connect(null, mapDispatchToProps)(SignIn);
