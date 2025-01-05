import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Route,Routes,BrowserRouter } from 'react-router';
import Home from './components/Home';

function App() {  
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
