import * as React from 'react';
import {Component} from 'react';
import Intro from './componnents/intro';
import Button from './componnents/button';

export interface AppProps {
  name: string;
  framework: string;
}

export default class App extends Component<AppProps> {
  public render() {
    return <h1>
      Hello from {this.props.name} with {this.props.framework}!
      <Intro name='..!'/><Button title='Foo Button :-)'/>
    </h1>;
  }
}
