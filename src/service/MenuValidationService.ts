export const validateUsername = (username) => {
  return username !== "";
};

export const validatePhoneNum = (phoneNum) => {
  // Nigerian phone numbers should start with "+234" or "0" and have a total length of 11 digits
  const nigerianRegex = /^(?:\+234|0)[789]\d{9}$/;

  return nigerianRegex.test(phoneNum);
};

export const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validateFirstName = (firstName) => {
  return firstName !== "" && firstName.length > 3;
};

export const validateLastName = (lastName) => {
  return lastName !== "" && lastName.length > 3;
};

export const validateDob = (dob) => {
  if (!dob) {
    return false; // DOB is empty
  }

  // Split the date string into day, month, and year components
  const [day, month, year] = dob.split("/").map(Number);

  // Check if the date components are valid numbers
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  // Create a new Date object with the components in "DD-MM-YYYY" format
  const date = new Date(year, month - 1, day);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return false;
  }

  // Check if the date is in the past
  const currentDate = new Date();
  if (date >= currentDate) {
    return false;
  }

  return true;
};
export const validateStudentId = (studentId) => {
  // return /^[A-Z]{1-2}\/[A-Z]{2-3}\/\d{2}\/\d{4}$/.test(studentId);
};

export const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
    password
  );
};
