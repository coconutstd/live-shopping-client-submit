import React, { Suspense } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
const LiveEvent = React.lazy(() => import('./page/live-event'))
const LiveShoppingPage = React.lazy(() => import('./page/live-shopping-page'))
function App() {
  return (
      <Router>
          <Switch>
              <Route path="/live-event">
                  <Suspense fallback={'대시보드 불러오는 중..'}>
                    <LiveEvent/>
                  </Suspense>
              </Route>
              <Route path="/live-shopping-page">
                  <Suspense fallback={'라이브 쇼핑 불러오는 중..'}>
                    <LiveShoppingPage />
                  </Suspense>
              </Route>
              <Route exact path="/">
                  <Redirect to="/live-event" />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
