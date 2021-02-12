import './App.scss';
import { Provider } from 'react-redux';
import store from './Redux/store'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React from 'react';


function App() {

  const loading = (
    <div className="loader">Loading...</div>
  )

  const LogIn = React.lazy(() => import("./Components/LogIn"))
  const Dashboard = React.lazy(() => import("./Components/Dashboard"))

  return (
    <React.Suspense fallback={loading}>
      <Provider store={store}>

        <Router >

          <Switch>
            <Route exact path="/" component={LogIn} />

            <Route path="/dashboard/dashboard-content" component={Dashboard}/>

          </Switch>
          
        </Router>
      </Provider>
    </React.Suspense>
  );
}


export default App;
