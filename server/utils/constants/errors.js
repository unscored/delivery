/**
 * There are error codes which extend standard HTTP status codes. If you need to
 * get a some detailed description you should specify constant code with exact
 * unique number.
 *
 * What it means:
 *
 * 40103 - the first "401" part is the standard HTTP status code which means
 * ^^^     that user is unauthorized.
 *
 * 40103 - the second "01" part is just sequential number. In case of this
 *    ^^   project is the invalid authorization token. So that is why user
 *         can't login. It can help to get valid error on client side.
 *
 * If you will have another issue for the 401 HTTP status code (for example,
 * when current user session is over) you should specify next sequential number.
 * In this case it will be 02 and full code will be 40102.
 */
module.exports = {
  UNAUTHORIZED: {
    code: 40101,
    message: 'User is not authorized'
  },
  AUTH_TOKEN_EXPIRED: {
    code: 40102,
    message: 'Session expired'
  },
  INVALID_TOKEN: {
    code: 40103,
    message: 'Invalid token'
  },
  ROUTE_NOT_FOUND: {
    code: 40401,
    message: 'Route not found'
  },
  INTERNAL_SERVER_ERROR: {
    code: 50001,
    message: 'Internal server error'
  },
  INVALID_PARAMS: {
    code: 50002,
    message: 'Invalid parameters'
  },
  RECORD_ALREADY_EXISTS: {
    code: 50003,
    message: 'Record already exists'
  },
  RECORD_NOT_FOUND: {
    code: 50003,
    message: 'Record not found'
  }
};