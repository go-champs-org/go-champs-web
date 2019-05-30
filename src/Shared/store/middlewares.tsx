export const fetchMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action instanceof Function) {
    return next(action);
  }

  if (
    !action.type.startsWith('API') ||
    action.type.indexOf('ORGANIZATION') > 0
  ) {
    return next(action);
  }

  const { url, requestConfig } = action.payload;
  const successAction = `${action.type}_SUCCESS`;
  const errorAction = `${action.type}_FAILURE`;

  next(action);

  return fetch(url, requestConfig)
    .then(resolveResponse)
    .then(data => next({ type: successAction, payload: data }))
    .catch(error => next({ type: errorAction, payload: error }));
};

const resolveResponse = (response: any) => {
  if (response.status === 204) {
    const splittedUrl = response.url.split('/');
    return splittedUrl[splittedUrl.length - 1];
  }

  return response.json();
};
