import { Route, Routes } from 'react-router-dom';
import { CasesList } from './components/cases/cases-list';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { PatientCards } from './components/patient-cards/patient-cards';
import { CaseDetail } from './components/case/case-detail';

export const App = () => {
  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>

      <div className="menu"><Menu /></div>
      <div className="content bg-blue-3">
        <Routes>
          <Route path="/" element={<CasesList />} />
          <Route path="/case" element={<CaseDetail />} />
          <Route path="/patientCards" element={<PatientCards />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
