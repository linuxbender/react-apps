import * as React from 'react'

export interface IButton {
  title: string
}

const Button = (props: IButton) => <div>{props.title}</div>;

export default Button;
