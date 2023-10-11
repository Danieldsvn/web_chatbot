export const fetchRegister = async (name, password) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  };  

  try {
    const response = await fetch('http://localhost:3001/register', options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};