import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,    
  Navigate,
  // useNavigate,
} from "react-router-dom";
// import { useParams } from 'react-router';
// import { Redirect } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
//import coreUireact js
import "@coreui/coreui/dist/css/coreui.min.css";
import AdminDashboard from "./components/superAdmin/AdminDashboard";
import StudentAdminDashboard from './components/studentAdmin/StudentAdminDashboard';
import AccountAdminDashboard from './components/accountAdmin/AccountAdminDashboard';
import SuperAdmin from "./helpers/SuperAdmin";
import AccountAdmin from "./helpers/AccountAdmin";
import StudentAdmin from "./helpers/StudentAdmin";
import SelfRegistration from "./components/auth/SelfRegistration";



import Offline from '../src/components/auth/OfflinePage';

function App() {
  const [is_online, setIs_online] = useState(true)  //online status
  window.addEventListener("online", function () {
    console.log("internet is ok!👍")
    setIs_online(true)
  });

  window.addEventListener("offline", function () {              //to check the internet connection

    setIs_online(false)

  });


  return (
    <Provider store={store}>

      <Router>
        {
          is_online ?
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/self_registration" element={<SelfRegistration />} />
              <Route exact path="/forgetpassword" element={<ForgotPassword />} />
              <Route
                exactF
                path="/create_new_password/:token"
                element={<ResetPassword />}
              />
              <Route element={<SuperAdmin />}>
                <Route path="/admin_dashboard/*" element={<AdminDashboard />} />
              </Route>
              <Route element={<AccountAdmin />}>
                <Route path="/account_admin_dashboard/*" element={<AccountAdminDashboard />} />
              </Route>
              <Route element={<StudentAdmin />}>
                <Route path="/student_admin_dashboard/*" element={<StudentAdminDashboard />} />
              </Route>
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
            :
            <Routes>
              <Route exact path="*" element={<Offline isFullPage={true} />} />
              {/*  passed a prop isFullPage to correct css for full page or to render in a component  */}
            </Routes>
        }
      </Router>
    </Provider>
  );
}

export default App;
