import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';


console.log(JSON.stringify({name: "xiamo"}));//把一个对象序列化成一个json字符串
ReactDOM.render(<div><App /></div>, document.getElementById('root'));
