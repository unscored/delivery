'use strict';

const {errors} = require('./constants');

const generate = (errorObject, message = null) => {
  return {
    code: errorObject.code,
    message: message || errorObject.message
  };
};

module.exports = {
  routeNotFound: () => generate(errors.ROUTE_NOT_FOUND),
  internalServerError: () => generate(errors.INTERNAL_SERVER_ERROR),
  invalidParams: message => generate(errors.INVALID_PARAMS, message),
  recordAlreadyExists: message => generate(errors.RECORD_ALREADY_EXISTS, message),
  recordNotFound: message => generate(errors.RECORD_NOT_FOUND, message),
  unauthorized: () => generate(errors.UNAUTHORIZED),
};
