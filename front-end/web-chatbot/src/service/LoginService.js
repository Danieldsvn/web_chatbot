export const fetchLogin = async (name, password) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  };

  const notFound = 404;
  const statusOk = 200;
  const badRequest = 400;

  try {
    const response = await fetch('http://localhost:3001/login', options);
    if (response.status === statusOk) {
      const data = await response.json();
      return data;
    }
    if (response.status === notFound || response.status == badRequest) {      
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};