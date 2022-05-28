import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {LiveEventDashboard} from "./live-event-dashboard";
import React from "react";
import {LiveEventCreationPage} from "./live-event-creation-page";
import {AppProvider} from "@shopify/polaris";
import koTranslations from '@shopify/polaris/locales/ko.json'
import '@shopify/polaris/dist/styles.css'

export default function LiveEvent() {
    return (
        <AppProvider i18n={koTranslations}>
            <Router>
                <Switch>
                    <Route path="/live-event/list">
                        <LiveEventDashboard/>
                    </Route>
                    <Route path="/live-event/create-live-event">
                        <LiveEventCreationPage/>
                    </Route>
                    <Route exact path="/live-event">
                        <Redirect to="/live-event/list"/>
                    </Route>
                </Switch>
            </Router>
        </AppProvider>
    );
}
