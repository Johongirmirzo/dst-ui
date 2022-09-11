import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

/**
 *  1. Define what the app does - DONE
 *    DST is the app which lets users to track their weekly sleeping patterns which include
 *    their sleep time, wakup time, and sleep duration for each day. User can see graph for his
 *    sleeping pattern and table display data. User can also add, delete, edit and their sleep entries.
 *    User can add new sleep entry by clicking Sleep Entry button which pops modal and user enters required
 *    data to create sleep entry for the given day
 *
 *  2. Create API
 *    1. Install all the packages
 * const user = {
 *  username: "John",
 *  email: "john@gmail.com",
 *  password: "123"
 * }
 * const sleepEntries = [
 *  {sleepDate: "02-09-2022" timeOfSleep: "23:00", wakeupTime: "08:00", sleepDuration: "9 HRS", user: "User ID" }
 * ]
 *
 *    2. Define the data structure and relationship between them - DONE
 *    3. Define user flow - DONE
 *
 *    4. Create the folder structure - DONE
 *
 *    5. Set up the server - DONE
 *
 *    6. Create the modals - DONE
 *
 *    7. Set up routes - DONE
 *
 *    8. Set up controllers - DONE

 *  3. Create UI
 *    1. Install all the packages
 *  
 *    2. User Flow
 *      - Register
 *          - user submits the data, data is validated if valid sent to the server else error messages are displayed
 *          - server validates the data if valid successful message is sent else error message sent to display in UI
 *          - user can also register with Google, Facebook, and Linkedin 3rd party services
 *            - if authenticated successfuly access and refresh token returned with newly generated user id,  
 *              else error message is displayed on UI     
 *          - once user sent validated data to the user loader is displayed in place of register button instead of register text
 *                            
 *      - Login
 *          - user logges in with email and password
 *          - if submitted data is invalid error message is displayed else server returns tokens and user id all of which
 *            is stored in localstorage
 *           - user can also register with Google, Facebook, and Linkedin 3rd party services
 *            - if authenticated successfuly access and refresh token returned with newly generated user id,  
 *              else error message is displayed on UI     
 *          - once user sent validated data to the user loader is displayed in place of login button instead of login text
 *      
 *      - SleepEntry
 * 
 *      - AddEntry Modal
 * 
 * 
 *  4. Host
 *
 *
 */
