import {Route, Routes} from 'react-router-dom';
import Register from './Pages/Register';
import ViewRecord from './Pages/View_Record';
import Sort from './Pages/Sort';
import AboutUs from './Pages/About_us';


function App() {
  return (
    
    <div>
      <Routes>
        <Route path='/' element={<Register />}/>
        <Route path='/ViewRecord' element={<ViewRecord />}/>
        <Route path='/Sort' element={<Sort />}/>
        <Route path='/AboutUs' element={<AboutUs />}/>
      </Routes>
    </div>
  );
}

export default App;
