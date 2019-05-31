export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const resolveResponse = (response: any) => {
  if (response.status === 204) {
    const splittedUrl = response.url.split('/');
    return splittedUrl[splittedUrl.length - 1];
  }

  return response.json();
};