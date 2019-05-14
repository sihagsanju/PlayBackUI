import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/styles/prism";

export default class Code extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <SyntaxHighlighter style={coy}>
        {this.props.value}
      </SyntaxHighlighter>
    )
  }
}
