import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from './WithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import { About as AboutView, NotFoundCover as NotFoundCoverView, ReviewSubmission as ReviewSubmissionView} from './views'
import { Troubleshoot as TroubleshootView} from './views'

const Routes = () => (
    <Switch>
        <Route exact path="/" render={matchProps => (
            <WithLayout
                {...matchProps}
                component={AboutView}
                layout={MainLayout}
            />
        )}
        />
        <Route path="/submission/:id" render={matchProps => ( 
            <WithLayout
                {...matchProps}
                component={ReviewSubmissionView}
                layout={MinimalLayout}
            />
        )}
        />
        <Route exact path="/not-found-cover"
            render={matchProps => (
                <WithLayout
                    {...matchProps}
                    component={NotFoundCoverView}
                    layout={MinimalLayout}
                />
            )}
        />
        <Route exact path="/troubleshoot"
            render={matchProps => (
                <WithLayout
                    {...matchProps}
                    component={TroubleshootView}
                    layout={MinimalLayout}
                />
            )}
        />
        <Redirect to="/not-found-cover" />
    </Switch>

)

export default Routes

