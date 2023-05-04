import { Route, Routes } from 'react-router-dom';
import { CasesList } from './components/cases/cases-list';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { NewPatientCard } from './components/patient-card/new-patient-card';
import { CaseDetail } from './components/case/case-detail';
import { Calendar } from './components/calendar/calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useEffect } from 'react';
import { setTokenForHttpClient } from './services/cases.service';
import { NewCase } from './components/case/new-case';
import { Login } from './components/login/login';
import { UsersList } from './components/users/users-list';
import { PatientCardsList } from './components/patient-cards/patient-cards-list';

export const App = () => {
  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYjYxMWNhNTYtMWMwZC00YjZhLWEyMWUtN2UyZGUxYjlhZjkwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJ1c2VyIiwibmJmIjoxNjgyOTY3ODYzLCJleHAiOjE2ODI5NzE0NjMsImlzcyI6Ik15QXV0aFNlcnZlciIsImF1ZCI6Ik15QXV0aENsaWVudCJ9.nqfoCLRscEjr42Z0n6xjedhewqmWK4v_91vORwawLGQ"
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CasesList />} />
          <Route path="/case" element={<CaseDetail />} />
          <Route path="/patientCards" element={<PatientCardsList />} />
          <Route path="/patientCards/new" element={<NewPatientCard />} />
          <Route path="/new-case/:patientCardId" element={<NewCase />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
