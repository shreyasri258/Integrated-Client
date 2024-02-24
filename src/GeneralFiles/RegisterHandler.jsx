import { useLocation } from 'react-router-dom';
import StudentRegister from '../User/StudentRegister';
import AdminRegister from '../Admin/AdminRegister';
const RegisterHandler = () => {
 const location = useLocation();
 const urlParams = new URLSearchParams(location.search);
 const role = urlParams.get('role');

 switch (role) {
    case 'student':
      return <StudentRegister />;
    case 'teacher':
      return <AdminRegister />;
    default:
      return null;
 }
};


export default RegisterHandler;

