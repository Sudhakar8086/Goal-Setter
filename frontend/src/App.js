import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/DashBoard'
import Register from './pages/Register';
import Login from './pages/Login'


function App() {
  return (
    <>
    <Router>
    <div className='container' >
    <Header/>
      <Routes>
        <Route  path='/' element={<Dashboard/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/register' element={<Register/>} />
      </Routes>
    </div>
    </Router>     
    </>

  );
}

export default App;
