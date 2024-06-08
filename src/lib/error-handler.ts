export const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("error.response.data", error.response.data);
    console.log(error.response.status);

    return {
      message: error.response.data?.message || error.response.data?.error || error.response.data,
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.log(error.request);
    return {
      message: "server time out",
      status: 503,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    return {
      message: error.message,
    };
  }
};
