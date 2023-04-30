import { Route, Routes } from 'react-router-dom';
import { CasesList } from './components/cases/cases-list';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { PatientCards } from './components/patient-cards/patient-cards';
import { PatientCard } from './components/patient-card/patient-card';
import { CaseDetail } from './components/case/case-detail';
import { Calendar } from './components/calendar/calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { CreateCase } from './components/create-case/create-case';

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
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/patientCards" element={<PatientCards />} />
          <Route path="/newPatientCard" element={<PatientCard />} />
          <Route path="/newCase/:patientCardId" element={<CreateCase />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
