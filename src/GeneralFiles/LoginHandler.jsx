import { useLocation } from 'react-router-dom';
import StudentLogin from '../User/StudentLogin';
import TeacherLogin from '../Admin/TeacherLogin';

const LoginHandler = () => {
 const location = useLocation();
 const urlParams = new URLSearchParams(location.search);
 const role = urlParams.get('role');

 switch (role) {
    case 'student':
      return <StudentLogin />;
    case 'teacher':
      return <TeacherLogin />;
    default:
      return null;
 }
};


export default LoginHandler;

