import { settingsContainer, siteContainer, Store } from '@power-cms/react-kit';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Error404 } from './components/Error404';
import { Navigation } from './components/Navigation';
import { Page } from './components/Page';

export class App extends Component {
  public render() {
    const apiUrl = String(process.env.REACT_APP_BACKEND_ENDPOINT);
    const { renderRoute } = this;

    return (
      <Store reducers={['auth', 'site', 'settings']} apiUrl={apiUrl}>
        <Router>
          <Switch>
            <Route exact={true} path="/404" component={Error404} />
            <Route render={renderRoute} />
          </Switch>
        </Router>
      </Store>
    );
  }

  private renderRoute({ location: { pathname, key } }: any) {
    const NavigationComponent = settingsContainer.get(Navigation);
    const PageComponent = siteContainer.getAll(Page) as any;

    return [
      <NavigationComponent key="navigation" />,
      <TransitionGroup key="page">
        <CSSTransition key={key} classNames="fade" timeout={200}>
          <PageComponent url={pathname} />
        </CSSTransition>
      </TransitionGroup>,
    ];
  }
}
