import React from 'react';
import * as authServices from './services/authApi';
const App = () => {

  const login42 = async () => {
    try {
      const data = await authServices.fortyTwoUrl();
      console.log("DATA", data);
      window.location = data.url;
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <h1>Hivesights</h1>
      <button onClick={login42}>Login</button>
    </div>
  );
};

export default App;