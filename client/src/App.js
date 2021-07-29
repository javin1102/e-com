import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { authAction } from "./redux/auth/auth-action";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("x-auth-token")) dispatch(authAction());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
