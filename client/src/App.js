import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import RestuarantDetail from "./Components/RestuarantDetail"
import UpdateRestuarants from "./Components/UpdateRestuarants"
import './App.css';

function App() {
  return (
    <div className="container" >
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route
              exact
              path="/restaurants/:id/update"
              component={UpdateRestuarants}
            />
            <Route
              exact
              path="/restaurants/:id"
              component={RestuarantDetail}
            />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
