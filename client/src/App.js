import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Saved from "./pages/Saved"
import Search from "./pages/Search"
import NoMatch from "./pages/NoMatch"
import NavBar from "./components/Nav/nav"
import Jumbotron from "./components/Jumbotron/jumbotron"

function App() {
  return (
    <BrowserRouter>
    <div className="container">

      <NavBar />

         <Jumbotron/>

      <Switch>
      <Route exact path={["/", "/search"]}>
      <Search />
      </Route>

      <Route path={"/search/:id"}>
        <Saved/>
        </Route>

      <Route path={"/saved"}>
        <Saved/>
        </Route>
        
      <Route path={"*"}>
      <NoMatch/>
      </Route>

    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
