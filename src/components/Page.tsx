import { ISite } from '@power-cms/react-kit';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { PulseLoader } from 'react-spinners';
import { Container } from 'reactstrap';

interface IProps {
  data: ISite[];
  url: string;
  getData: () => void;
}

export class Page extends Component<IProps> {
  public componentDidMount() {
    this.props.getData();
  }

  public render() {
    const { data } = this.props;

    if (!data.length) {
      return <PulseLoader />;
    }

    const page = data.find((site: ISite) => site.url === this.props.url);

    if (!page) {
      return <Redirect to="/404" />;
    }

    return (
      <div className="page">
        <Container>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Container>
      </div>
    );
  }
}
