import React from "react";
import ReactDOM from 'react-dom';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import ReactMarkdown from "react-markdown";
import Code from "./Code";
import lodash from 'lodash';
import ReactWebComponent from 'react-web-component';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    marginTop: "6px"
  },
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: '10px',
    color:'red',
    border:'2px solid red'
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class MCQ extends HTMLElement {
  constructor(props) {
    console.log("@###@@@@@@## in constructur props alue",props)
    super(props);
    this.state = {
      value: '',
      gilad: true,
      jason: false,
      antoine: false,
      selectedOption:'option1',
      selectedRadio:''
    };
  }
  handleRadioChange = event => {
    console.log("ON radio button select",event.target.value);
    this.setState({ value: event.target.value });
  };

  handleCheckBoxChange = name => event => {
    console.log("handle Checkbox select ",event.target.value);
    this.setState({ [name]: event.target.checked });
  };

  // handleOptionChange = changeEvent => {
  //   console.log("This is the radio button selected",changeEvent.target.value)
  //   this.setState({
  //     selectedOption: changeEvent.target.value
  //   });
  // }
  handleOptionChange = event => {
    console.log("#########Radio buuton click event called",event);
  }
  // handleOptionChange(changeEvent) {
  //  console.log("This is the radio button selected",changeEvent.target.value)
  //   this.setState({
  //     selectedOption: changeEvent.target.value
  //   });
  // }

  handleRadioChange = (event) => {
    this.setState({
      selectedRadio: event.currentTarget.value
    })
  };
  
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    this.getAttribute('value');
    console.log('#######@@@@@@#########',JSON.parse(this.getAttribute('question')));
    // const name = this.getAttribute('name');
    // const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    this.setAttribute("name",JSON.parse(this.getAttribute('question')).questionText);
    ReactDOM.render(
    <div>
    <Grid container>
          <Grid item>
            <Grid container>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography variant="h5" style={{ justifyItems: "start" }}>
                      {!lodash.isEmpty(JSON.parse(this.getAttribute('question')).questionText) ? (
                        // <MDReactComponent
                        //   text={this.props.question.metadata.explanation}
                        // />
                        <ReactMarkdown
                          source={JSON.parse(this.getAttribute('question')).questionText}
                          escapeHtml={false}
                          renderers={{ code: Code }}
                        />
                      ) : (
                        ""
                      )}
                      {/* <Highlight>
                        {`function foo() 
      { return 'bar' }`}
                      </Highlight> */}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item >
              {/* {JSON.parse(this.getAttribute('question')).options.map((data, index)=>{ */}
                {/* return(
                  console.log("this is the opstion for mcq componet",data) */}
                  {/* <FormControl
                    component="fieldset"
                    // class={this.style.formControl}
                   
                  >
                    <FormGroup> */}
                      {JSON.parse(this.getAttribute('question')).options.map((data, index) =>{
                         return (
                          console.log('#####@@@ in map function#########',data.optionText),
                            <div key={index}>
                          {/* <input key={index} type="radio" value={data.optionText} name={data.optionText} onChange={this.handleOptionChange} ></input>{data.optionText} */}
    
        <input type="radio" value={data.optionText} name={data.optionText}
                      // checked={this.state.selectedOption === 'option1'} 
                     onChange={(e) => this.handleOptionChange(e)}
                      // onChange={this.handleOptionChange}
                       />
        {data.optionText}

        <div className="radio-row">
        <div className="input-row">
          <input
            type="radio"
            name="public"
            value="public"
            checked={this.state.selectedRadio === 'public'}
            onChange={this.handleRadioChange}
          />
          <label htmlFor="public">Public</label>
        </div>
        <div className="input-row">
          <input
            type="radio"
            name="private"
            value="private"
            checked={this.state.selectedRadio === 'private'}
            onChange={this.handleRadioChange}
          />
          <label htmlFor="private">Private</label>
        </div>
      </div>

                          </div>
                              )}
                            )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    {/* <h2>this is in webcomponet</h2>
    <p>this is the p tag {JSON.parse(this.getAttribute("question")).questionText}</p> */}
    </div>
      , mountPoint);
  }
  // render(){
  //   return(
  //     <h4>this is in MCQ H4 tag</h4>
  //   )
  // }
}
export default withStyles(styles)(MCQ);
 customElements.define('x-search',MCQ);
// ReactWebComponent.create(<MCQ text={"kjfhgkj"}/>,'x-search')
