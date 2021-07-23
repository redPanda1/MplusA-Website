import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from './WithLayout';
import { Main as MainLayout, Minimal as MinimalLayout, Admin as AdminLayout } from './layouts';
import {
    About as AboutView, 
    NotFoundCover as NotFoundCoverView, 
    Placeholder as PlaceholderView, 
    ReviewSubmission as ReviewSubmissionView,    
    Troubleshoot as TroubleshootView,
    PasswordResetSimple as PasswordResetSimpleView,
    Test as TestView,
    SigninSimple as SigninSimpleView,
    AdminHome as AdminHomeView,
    CompanyList as CompanyListView,
    CompanyData as CompanyDataView
} from './views'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PrivateRoute';

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
        <PublicRoute
            exact
            path="/admin/login"
            render={matchProps => (
                <WithLayout
                    {...matchProps}
                    component={SigninSimpleView}
                    layout={MinimalLayout}
                />
            )}
        />
        <PublicRoute
            exact
            path="/admin/password-reset"
            render={matchProps => (
                <WithLayout
                    {...matchProps}
                    component={PasswordResetSimpleView}
                    layout={MinimalLayout}
                />
            )}
        />
        <PrivateRoute path="/admin" exact
            render={matchProps => (
                <WithLayout
                    {...matchProps}
                    component={AdminHomeView}
                    layout={AdminLayout}
                />
            )}
        />
        <PrivateRoute path="/admin/company/list" exact>
            <WithLayout
                component={CompanyListView}
                layout={AdminLayout}
            />
        </PrivateRoute>
        <PrivateRoute path="/admin/company/:id" >
            <WithLayout
                component={CompanyDataView}
                layout={AdminLayout} />
        </PrivateRoute>
        <PrivateRoute path="/admin/mysettings" exact>
            <WithLayout
                component={PlaceholderView}
                layout={AdminLayout}
            />
        </PrivateRoute>
        <PrivateRoute path="/admin/users" exact>
            <WithLayout
                component={PlaceholderView}
                layout={AdminLayout}
            />
        </PrivateRoute>
        <PrivateRoute path="/admin/settings" exact>
            <WithLayout
                component={PlaceholderView}
                layout={AdminLayout}
            />
        </PrivateRoute>
        <PrivateRoute path="/admin/events" exact>
            <WithLayout
                component={TestView}
                layout={AdminLayout}
            />
        </PrivateRoute>
        <PrivateRoute path="/admin/test" exact>
            <WithLayout
                component={TestView}
                layout={AdminLayout}
            />
        </PrivateRoute>

        <Redirect to="/not-found-cover" />
    </Switch>

)

export default Routes

