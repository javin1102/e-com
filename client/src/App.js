import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import YourStore from "./pages/YourStore";
import YourCart from "./pages/YourCart";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import { useDispatch } from "react-redux";
import { authAction } from "./redux/auth/auth-action";
import { useEffect } from "react";
import "./app.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("x-auth-token")) {
      dispatch(authAction(localStorage.getItem("x-auth-token").toString()));
      return;
    }

    if (sessionStorage.getItem("x-auth-token")) {
      dispatch(authAction(sessionStorage.getItem("x-auth-token")));
    }
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products" component={SearchPage} />
        <Route exact path="/yourCart">
          <YourCart searchBar={false} />
        </Route>
        <Route exact path="/yourStore">
          <YourStore searchBar={false} />
        </Route>
        <Route exact path="/yourStore/addProduct">
          <AddProduct />
        </Route>
        <Route exact path="/yourStore/updateProduct/:productId">
          <UpdateProduct />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
