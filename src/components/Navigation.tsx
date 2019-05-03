import { IRoute, ISettings } from '@power-cms/react-kit';
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, Container } from 'reactstrap';

interface IProps {
  getData: () => void;
  data: ISettings;
}

interface IState {
  isOpen: boolean;
}

export class Navigation extends Component<IProps, IState> {
  public state = {
    isOpen: false,
  };

  public componentDidMount() {
    this.props.getData();
  }

  public render() {
    const { toggle } = this;
    const { isOpen } = this.state;
    const { data } = this.props;

    if (!data) {
      return null;
    }

    document.title = data.title;

    return (
      <Navbar color="light" light={true} expand="md">
        <Container>
          <Link className="navbar-brand" to="/">
            {data.title}
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              {data.routes.map((site: IRoute) => (
                <NavItem key={site.id}>
                  <NavLink to={site.url} className="nav-link">
                    {site.title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
}
