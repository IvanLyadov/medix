import { Route, Routes } from 'react-router-dom';
import { Cases } from './components/cases/cases';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { PatientCards } from './components/patient-cards/patient-cards';

export const App = () => {
  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>

      <div className="menu"><Menu /></div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Cases />} />
          <Route path="/patientCards" element={<PatientCards />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
