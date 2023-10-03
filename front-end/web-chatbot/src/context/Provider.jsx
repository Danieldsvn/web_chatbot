import PropTypes from 'prop-types';
import { useState } from 'react';
import MyContext from './Context.js';

function Provider({ children }) {
  const [histories, setHistories] = useState([]);
  
  const INITIAL_STATE = {
    histories,
    setHistories,    
  };

  return (
    <MyContext.Provider value={ INITIAL_STATE }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
