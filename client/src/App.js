import './App.css';
import Saved from "./pages/Saved"
import Search from "./pages/Search"
import NoMatch from "./pages/NoMatch"

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
        <Info/>
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
