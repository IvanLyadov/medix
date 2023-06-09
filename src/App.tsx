import { Route, Routes } from 'react-router-dom';
import { CasesList } from './components/cases/cases-list';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { NewPatientCard } from './components/patient-card/new-patient-card';
import { PatientCardDetails } from './components/patient-card/patient-card-details';
import { CaseDetail } from './components/case/case-detail';
import { Calendar } from './components/calendar/calendar';
import { AddUser } from './components/user/add-user';
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
import { Chat } from './components/chat/chat';
import { EditPatientCard } from './components/patient-card/edit-patient-card';
import { UserDetails } from './components/user/user-detail';
import { EditUser } from './components/user/edit-user';
import { CaseLogs } from './components/case-logs/case-logs';
import { CasesHistory } from './components/patient-card/cases-history';
import { Attachments } from './components/attachments/attachments';
import { AppointmentsEdit } from './components/appointments/appointments-edit';

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
          <Route path="/cases/:caseId/appointments/:patientCardId/:isActive" element={<Appointments />} />
          <Route path="/cases/:caseId/appointments/:appointmenID/edit" element={<AppointmentsEdit />} />
          <Route path="/cases/:caseId/case-logs" element={<CaseLogs />} />
          <Route path="/cases/:caseId/attachments" element={<Attachments />} />
          <Route path="/calendar/:doctorId/:caseId?/:patientCardId?" element={<Calendar />} />
          <Route path="/cases/:caseId/chat/:isActive" element={<Chat />} />
          <Route path="/patientCards" element={<PatientCardsList />} />
          <Route path="/patientCards/new" element={<NewPatientCard />} />
          <Route path="/patientCards/edit/:patientId" element={<EditPatientCard />} />
          <Route path="/patient-cards-details/:patientCardId" element={<PatientCardDetails />} />
          <Route path="/patient-cards-details/:patientCardId/cases-history" element={<CasesHistory />} />
          <Route path="/new-case/:patientCardId" element={<NewCase />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<AddUser />} />
          <Route path="/users-details/:userId" element={<UserDetails />} />
          <Route path="/users/edit/:userId" element={<EditUser />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

      </div>

      <div className="footer"><Footer /></div>
    </div>
  );
}
