import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number should contain only digits')
    .min(8, 'Phone number must be at least 8 digits'),
  country: yup.string().required('Country is required'),
  accountType: yup.string().required('Account type is required'),
});

const PickupSignup = () => {
  const [accountType, setAccountType] = useState('individual');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert(`Submitted! Name: ${data.name}, Email: ${data.email}`);
  };

  return (
    <div style={styles.container}>
      <h2>Pickup & Drop-off Signup</h2>
      <p>Let's create your profile so you can have a complete experience of the app</p>

      {/* Name Field */}
      <div style={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" placeholder="Enter your name" style={styles.input} />
          )}
        />
        {errors.name && <p style={styles.errorText}>{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div style={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="email" placeholder="Enter email" style={styles.input} />
          )}
        />
        {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div style={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="password" placeholder="Enter password" style={styles.input} />
          )}
        />
        {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}
      </div>

      {/* Confirm Password Field */}
      <div style={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="password" placeholder="Confirm your password" style={styles.input} />
          )}
        />
        {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword.message}</p>}
      </div>

      {/* Phone Number Field */}
      <div style={styles.formGroup}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              country={'fr'}
              value={value}
              onChange={onChange}
              inputStyle={styles.input}
              containerStyle={styles.phoneInputContainer}
              dropdownStyle={styles.dropdown}
              enableSearch
              searchPlaceholder="Search country"
              specialLabel=""
            />
          )}
        />
        {errors.phoneNumber && <p style={styles.errorText}>{errors.phoneNumber.message}</p>}
      </div>

      {/* Country Field */}
      <div style={styles.formGroup}>
        <label htmlFor="country">Country</label>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field} style={styles.input}>
              <option value="">Select a country</option>
              <option value="France">France</option>
              <option value="India">India</option>
              {/* Add more countries as needed */}
            </select>
          )}
        />
        {errors.country && <p style={styles.errorText}>{errors.country.message}</p>}
      </div>

      {/* Account Type Field */}
      <div style={styles.formGroup}>
        <label>Create account as:</label>
        <Controller
          name="accountType"
          control={control}
          defaultValue="individual"
          render={({ field }) => (
            <div style={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="individual"
                  checked={accountType === 'individual'}
                  onChange={() => setAccountType('individual')}
                  {...field}
                />
                Individual
              </label>
              <label>
                <input
                  type="radio"
                  value="company"
                  checked={accountType === 'company'}
                  onChange={() => setAccountType('company')}
                  {...field}
                />
                Company
              </label>
            </div>
          )}
        />
        {errors.accountType && <p style={styles.errorText}>{errors.accountType.message}</p>}
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit(onSubmit)} style={styles.button}>
        Continue
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
  },
  phoneInputContainer: {
    marginBottom: '20px',
  },
  dropdown: {
    borderColor: '#ccc',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#ffc107',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default PickupSignup;
