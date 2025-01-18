import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Route,Routes,BrowserRouter } from 'react-router';
import Home from './components/Home';
import Save from './components/Save';

function App() {  
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/save' element={<Save/>}/>
    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
