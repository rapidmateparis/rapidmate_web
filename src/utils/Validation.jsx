const validateDeliveryboyForm = (formData) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{9,15}$/;
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "First name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword.length < 6) {
      errors.confirmPassword =
        "Confirm password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords does not match";
    }
    if (!formData.number.trim()) {
      errors.number = "Number is required";
    } else if (isNaN(formData.number)) {
      errors.number = "Number should be numeric";
    }
    if (!formData.country) {
      errors.dropdownCountryValue = "Please select a country";
    }
    if (!formData.state) {
      errors.dropdownStateValue = "Please select a state";
    }
    if (!formData.city) {
      errors.dropdownCityValue = "Please select a city";
    }
    
    if (!formData.siret) {
      errors.siret = "Please enter siret";
    }
    if (!formData.termone) {
      errors.termone = "You must agree to the terms";
    }
    return errors;
  };

  export {
    validateDeliveryboyForm
  }