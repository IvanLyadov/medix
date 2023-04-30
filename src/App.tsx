import { Route, Routes } from 'react-router-dom';
import { CasesList } from './components/cases/cases-list';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { PatientCards } from './components/patient-cards/patient-cards';
import { NewPatientCard } from './components/patient-card/new-patient-card';
import { CaseDetail } from './components/case/case-detail';
import { Calendar } from './components/calendar/calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useEffect } from 'react';
import { setTokenForHttpClient } from './services/cases.service';
import { NewCase } from './components/case/new-case';

export const App = () => {
  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYjYxMWNhNTYtMWMwZC00YjZhLWEyMWUtN2UyZGUxYjlhZjkwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJ1c2VyIiwibmJmIjoxNjgyODc3MDU5LCJleHAiOjE2ODI4ODA2NTksImlzcyI6Ik15QXV0aFNlcnZlciIsImF1ZCI6Ik15QXV0aENsaWVudCJ9.VeVxyx6JrN6b-MSsXBTMBU5AVs5lhmxf79vhx09BHt4"
    setTokenForHttpClient(token);
  }, []);

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
          <Route path="/patientCards/new" element={<NewPatientCard />} />
          <Route path="/new-case/:patientCardId" element={<NewCase />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
