import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Index from './Pages/Index';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='*' element={<Navigate to="/" replace={true}/>} exact={true}></Route>
      </Routes>
    </BrowserRouter>    
  );
}



export default App;
