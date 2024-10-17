const BASE_URL = 'http://127.0.0.1:8000';

function request(
  url,
  method = 'GET',
  data,
) {
  const options = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
  
        resolve(response.json());
      })
      .catch(error => reject(error));
  });
  
}

export const client = {
  get: (url) => request(url),
  post: (url, data) => request(url, 'POST', data),
  patch: (url, data) => request(url, 'PATCH', data),
};
