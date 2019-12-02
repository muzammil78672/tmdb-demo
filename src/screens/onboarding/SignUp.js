import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

import * as Actions from '../../redux/actions';

import Validations from '../../common/validations';

class SignUp extends Component {
  openPicker = props => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        props.setFieldValue(
          'profileImage',
          `data:${response.type};base64,${response.data}`,
        );
      }
    });
  };

  render() {
    return (
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <Formik
          validationSchema={Validations.SigninForm}
          validateOnBlur={true}
          validateOnChange={true}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            profileImage: '',
          }}
          onSubmit={values => {
            this.props.register(values);
          }}>
          {props => (
            <>
              <TouchableOpacity onPress={() => this.openPicker(props)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: 'gray',
                    overflow: 'hidden',
                  }}>
                  {props.values.profileImage ? (
                    <Image
                      style={{height: 100, width: 100}}
                      source={{uri: props.values.profileImage}}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Upload Image
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  First Name <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  onChangeText={props.handleChange('firstName')}
                  onBlur={props.handleBlur('firstName')}
                  style={styles.inputField}
                  value={props.values.firstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Last Name <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  onChangeText={props.handleChange('lastName')}
                  onBlur={props.handleBlur('lastName')}
                  style={styles.inputField}
                  value={props.values.lastName}
                />
              </View>
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
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>SignUp</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text>Already registered ? </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.resetForm();
                    this.props.navigation.navigate('SignIn');
                  }}>
                  <Text style={styles.loginText}>SignIn</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
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
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  signUpText: {
    fontSize: 16,
    color: 'white',
  },
  loginContainer: {
    marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: 'blue',
  },
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(Actions.User.register(data)),
});

export default connect(null, mapDispatchToProps)(SignUp);
