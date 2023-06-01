import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import ForgotPassPage from './pages/ForgotPass';
import StaffList from './pages/StaffList';
import AllTeaching from './pages/teachingList';
import CourseList from './pages/CourseList';
import ThesisList from './pages/ThesisList';
import ResearchList from './pages/ResearchList';
import ScientificArticles from './pages/ScientificArticles';
import LicenseInvention from './pages/LicenseInvention';
import TextBook from './pages/TextBook';
import IntructionList from './pages/IntructionList';
import BuildProgramList from './pages/BuildProgramList';
import AddThesis from './pages/FormAdd/AddThesis.jsx';
import EditAccount from './pages/EditAccount';
import AddStaff from './pages/FormAdd/Addstaff';
import AddTeaching from './pages/FormAdd/AddTeaching';
import AddTermExam from './pages/FormAdd/AddTermExam';
import AddResearch from './pages/FormAdd/AddResearch';
import AddMaterialCompilation from './pages/FormAdd/AddMaterialCompilation';
import AddTextBook from './pages/FormAdd/AddTextBook';
import AddInstruction from './pages/FormAdd/AddInstruction';
import AddInvention from './pages/FormAdd/AddInvention';
import AddScientificArticles from './pages/FormAdd/AddScientificArticles';
import AddBuildProgram from './pages/FormAdd/AddBuildProgram';
import AddCoach from './pages/FormAdd/AddCoach'
import FormAddMaterialCompilation from './pages/ListMaterialCompilation'
import ClassList from './pages/ClassList';
import SubjectList from './pages/SubjectList';
import ExamList from './pages/ExamList';
import RoomList from './pages/RoomList';
import AddSubject from './pages/FormAdd/AddSubject';
import AddClass from './pages/FormAdd/AddClass';
import AddExam from './pages/FormAdd/AddExam';
import AddRoom from './pages/FormAdd/AddRoom';
import MarkList from './pages/MarkList';
import AddMark from './pages/FormAdd/AddMark';
import ResetPassword from './partials/actions/ResetPassword';
import YearList from './pages/YearList';
import AddYear from './pages/FormAdd/AddYear';
const Test = () => {
  return <div>test</div>;
}

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassPage />} />
        <Route path="/list-staff" element={<StaffList />} />
        <Route path="/list-year" element={<YearList />} />
        <Route path="/list-class" element={<ClassList />} />
        <Route path="/list-subject" element={<SubjectList />} />
        <Route path="/list-exam" element={<ExamList />} />
        <Route path="/list-room" element={<RoomList />} />
        <Route path="/list-mark" element={<MarkList />} />
        <Route path="/list-teach" element={<AllTeaching />} />
        <Route path="/list-course" element={<CourseList />} />
        <Route path="/list-thesis" element={<ThesisList />} />
        <Route path="/list-topic" element={<ResearchList />} />
        <Route path="/list-article" element={<ScientificArticles />} />
        <Route path="/book-list" element={<TextBook />} />
        <Route path="/invention-list" element={<LicenseInvention />} />
        <Route path="/instruction-list" element={<IntructionList />} />
        <Route path="/add-compilation" element={<AddMaterialCompilation />} />
        <Route path="/build-program-list" element={<BuildProgramList />} />
        <Route path="/personal-infor" element={<EditAccount />} />
        <Route path="/ecommerce/customers" element={<Test />} />
        <Route path="/list-compilation" element={<FormAddMaterialCompilation />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/add-year" element={<AddYear />} />
        <Route path="/add-class" element={<AddClass />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/add-exam" element={<AddExam />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/add-mark" element={<AddMark />} />
        <Route path="/add-teaching" element={<AddTeaching />} />
        <Route path="/add-term-exam" element={<AddTermExam />} />
        <Route path="/add-topic" element={<AddResearch />} />
        <Route path="/add-article" element={<AddScientificArticles />} />
        <Route path="/add-thesis" element={<AddThesis />} />
        <Route path="/add-book" element={<AddTextBook />} />
        <Route path="/add-instructions" element={<AddInstruction />} />
        <Route path="/add-invention" element={<AddInvention />} />
        <Route path="/add-build-program" element={<AddBuildProgram />} />
        <Route path="/add-coach" element={<AddCoach />} />
        <Route path="/edit-subject" element={<AddSubject />} />
        <Route path="/edit-class" element={<AddClass />} />
        <Route path="/edit-exam" element={<AddExam />} />
        <Route path="/edit-room" element={<AddRoom />} />
        <Route path="/edit-mark" element={<AddMark />} />
        <Route path="/edit-staff" element={<AddStaff />} />
        <Route path="/edit-topic" element={<AddResearch />} />
        <Route path="/edit-article" element={<AddScientificArticles />} />
        <Route path="/edit-book" element={<AddTextBook />} />
        <Route path="/edit-invention" element={<AddInvention />} />
        <Route path="/edit-scientific" element={<AddInstruction />} />
        <Route path="/edit-compilation" element={<AddMaterialCompilation />} />
        <Route path="/edit-program" element={<AddBuildProgram />} />
        <Route path="/edit-thesis" element={<AddThesis />} />
        <Route path="/edit-coach" element={<AddCoach />} />
        <Route path="/edit-year" element={<AddYear />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
