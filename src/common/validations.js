import * as Yup from 'yup';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SignupForm = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, 'too short')
    .required('first name is required'),
  lastName: Yup.string()
    .trim()
    .min(2, 'too short')
    .required('last name is required'),
  email: Yup.string()
    .trim()
    .required('email address is required')
    .matches(emailRegex, 'Invalid email address'),
  password: Yup.string()
    .trim()
    .required('password is required'),
  profileImage: Yup.string()
    .trim()
    .required('profileImage is required'),
});

const SigninForm = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('email address is required')
    .matches(emailRegex, 'Invalid email address'),
  password: Yup.string()
    .trim()
    .required('password is required'),
});

export default {
  SigninForm,
  SignupForm,
};
