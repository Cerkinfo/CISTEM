import * as Yup from 'yup';

export const signup = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too short! Minimum 6 characters required')
    .required('Required'),
  first_name: Yup.string()
    .min(2, 'Too short! Minimum 2 characters required')
    .max(50, 'Too long! Maximum 50 characters allowed')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too short! Minimum 2 characters required')
    .max(50, 'Too long! Maximum 50 characters allowed')
    .required('Required'),
  pseudo: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Pseudo can only contain letters, numbers, dots, underscores and hyphens"
    )
    .min(4, "Pseudo must be at least 4 characters")
    .max(30, "Pseudo must be at most 30 characters")
    .required("Pseudo is required"),
});