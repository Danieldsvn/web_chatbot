/* eslint-disable require-jsdoc */


export function userValid(data) {
  if (!data.name || data.name.length === 0) {
    return {statusCode: 400, message: 'Name field is empty'};
  }
  if (!data.password || data.password.length === 0) {
    return {statusCode: 400, message: 'Password field is empty'};
  }

  const nameOk = nameValid(data.name);
  if (nameOk !== true) return nameOk;

  const passwordOk = passwordValid(data.password);
  if (passwordOk !== true) return passwordOk;

  return true;
}

function nameValid(name) {
  const NAME_LENGTH = 10;
  if (name.length > NAME_LENGTH) {
    return {
      statusCode: 400,
      message: `Name is too long. ${NAME_LENGTH} characters maximum`};
  }

  return true;
}

function passwordValid(password) {
  const PASSWORD_LENGTH = 8;
  if (password.length < PASSWORD_LENGTH) {
    return {
      statusCode: 400,
      message: `Password is too short. ${PASSWORD_LENGTH} characters minimum`};
  }

  return true;
}
