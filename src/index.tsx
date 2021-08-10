import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// inicia o firebase
import './services/firebase'

// posso importar arquivos css
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

