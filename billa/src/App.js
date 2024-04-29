import {Route, Routes} from 'react-router-dom';
//import Register from './Pages/Register';
import Prisoner  from './Pages/Prisoner';
import Personnel from './Pages/Personnel.js';
import MoreInfo from './Pages/MoreInfo.js';
import Layout from './Components/Layout';

function App() {
  return (
    
    <div className='page01'>
      <Layout/>
      <Routes>
        <Route path='/' element={<Prisoner />}/>
        <Route path='/Prisoner' element={<Prisoner />}/>
        <Route path='/Personnel' element={<Personnel />}/>
        <Route path='/MoreInfo' element={<MoreInfo />}/>
      </Routes>
    </div>
  );
}

export default App;
