const validator = (field, value) => {
  let valid;
  switch (field) {
    case "firstName":
      valid = value.trim().length > 0 && value.length < 0 ? false : true;
      break;
    case "lastName":
      valid = value.trim().length > 0 && value.length < 0 ? false : true;
      break;
    case "email":
      if (value.trim().length <= 0) {
        valid = false;
        break;
      }
      if (
        value.trim().length > 0 &&
        !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        valid = false;
        break;
      }
      valid = true;
      break;

    case "password":
      valid = !value.match(/^(?=.*\d)(?=.*[a-z])\w{5,}$/) ? false : true;
      break;
    case "title":
      valid = value.trim().length > 0 && value.length < 0 ? false : true;
      break;
    case "description":
      valid = value.trim().length > 0 && value.length < 15 ? false : true;
      break;
    default:
      break;
  }
  return valid;
};

export default validator;
