const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*', // lazy cors config
  'Access-Control-Allow-Credentials': true
};

// 400 - unvalidate request (e.g. client ID not valid)
// 401 - wrong payload format
// 404 - no such route
// 403 - invalidate credentials
// 500 - internal server error

class ApiResponse {
  static success(code = 200, msg = '', payload = '') {
    return {
      statusCode: code,
      body: JSON.stringify({ msg, ...payload }),
      headers
    };
  }

  static reject(code = 500, msg = '', payload = '') {
    return {
      statusCode: code,
      body: JSON.stringify({ msg, ...payload }),
      headers
    };
  }
}

module.exports = ApiResponse;
