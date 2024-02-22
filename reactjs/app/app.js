import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TrackingForm from './components/TrackingForm';
import TrackingInfo from './components/TrackingInfo';
import AdminPanel from './pages/AdminPanel';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TrackingForm />
        </Route>
        <Route path="/tracking/:trackingNumber" component={TrackingInfo} />
        <Route path="/admin" component={AdminPanel} />
      </Switch>
    </Router>
  );
};

export default App;
