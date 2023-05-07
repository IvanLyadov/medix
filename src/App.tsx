import { Route, Routes } from 'react-router-dom';
import { CasesList } from './components/cases/cases-list';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { NewPatientCard } from './components/patient-card/new-patient-card';
import { PatientCardDetails } from './components/patient-card-details/patient-card-details';
import { CaseDetail } from './components/case/case-detail';
import { Calendar } from './components/calendar/calendar';
import { AddUser } from './components/add-user/add-user';
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { NewCase } from './components/case/new-case';
import { Login } from './components/login/login';
import { UsersList } from './components/users/users-list';
import { PatientCardsList } from './components/patient-cards/patient-cards-list';
import { useInterceptor } from './hooks/use-interceptor';
import { useCallback, useEffect } from 'react';
import { ACCESS_TOKEN_KEY, setTokenForHttpClient, USER_ID_KEY } from './services/auth.service';
import { useStore } from 'zustand';
import { sessionState } from './store/appState';
import { getUser } from './services/users.service';
import { Appointments } from './components/appointments/appointments';

export const App = () => {
  const sessionStore = useStore(sessionState);
  useInterceptor();

  const setToken = useCallback(async () => {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    var userId = localStorage.getItem(USER_ID_KEY);
    if (token && userId) {
      setTokenForHttpClient(token);
      const user = await getUser(userId);
      sessionStore.updateUser(user);
    }
  }, []);

  useEffect(() => {
    setToken();
  }, [])

  return (
    <div className="grid-container">
      <div className="header">
        <Header />
      </div>

      <div className="menu">
        {sessionStore.loggedInUser && <Menu />}
      </div>
      <div className="content bg-blue-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cases" element={<CasesList />} />
          <Route path="/cases/:caseId" element={<CaseDetail />} />
          <Route path="/cases/:caseId/appointments" element={<Appointments />} />
          <Route path="/calendar/:doctorId/:caseId/:patientCardId" element={<Calendar />} />
          <Route path="/patientCards" element={<PatientCardsList />} />
          <Route path="/patientCards/new" element={<NewPatientCard />} />
          <Route path="/patient-cards-details/:patientCardId" element={<PatientCardDetails />} />
          <Route path="/new-case/:patientCardId" element={<NewCase />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<AddUser />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
