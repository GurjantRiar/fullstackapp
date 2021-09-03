import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { loadUser } from "./Actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/Editprofile";
import Addexperience from "./components/profile-forms/Addexperience";
import PrivateRoute from "./components/routing/PrivateRoute";
import Addeducation from "./components/profile-forms/Addeducation";
import Profiles from "./components/profiles/Profiles";
// import Profile from "./components/profile/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              {/* <Route exact path="/profile" component={profile} /> */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/Addexperience"
                component={Addexperience}
              />
              <PrivateRoute
                exact
                path="/Addeducation"
                component={Addeducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
