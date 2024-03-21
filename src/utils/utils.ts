const _GetSuccessResponse = (message: string, statusCode: number = 200) => {
  return { message, statusCode };
};

const _GetErrorResponse = (message: string, statusCode: number = 500) => {
  return { error: message, statusCode };
};

module.exports = {
  _GetErrorResponse,
  _GetSuccessResponse,
};
