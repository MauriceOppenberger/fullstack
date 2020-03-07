const validator = (field, value) => {
  let valid;
  switch (field) {
    case "firstName":
      valid = value.trim().length > 0 && value.length < 5 ? false : true;
      break;
    case "lastName":
      valid = value.trim().length > 0 && value.length < 5 ? false : true;
      break;
    case "email":
      return value.trim().length <= 0
        ? false
        : value.trim().length > 0 &&
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ? false
        : true;

      break;
    case "password":
      valid = !value.match(/^(?=.*\d)(?=.*[a-z])\w{5,}$/) ? false : true;
      break;

    default:
      break;
  }
  return valid;
};

export default validator;
