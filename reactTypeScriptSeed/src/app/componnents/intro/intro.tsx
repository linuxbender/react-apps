import * as React from 'react';
import {Component} from 'react';

interface IntroProps {
  name: string;
}

export default class Intro extends Component<IntroProps> {

  private name: string;

  public constructor(introProbs: IntroProps) {
    super(introProbs);
    this.name = introProbs.name;
  }

  public render() {
    return <div>{this.name}</div>;
  }
}
