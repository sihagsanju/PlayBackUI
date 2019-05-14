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

import Highlight from "react-highlight";
import MediaQuery from "react-responsive";
import lodash from "lodash";
import MDReactComponent from "markdown-react-js";
import ReactMarkdown from "react-markdown";
import Code from "./Code";

const styles = theme => ({
  container: {
    marginTop: "6px"
  },
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class McqQuestion extends HTMLElement {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      gilad: true,
      jason: false,
      antoine: false,
      size:''
      // concepts: this.props.question.metadata
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleRadioChange = event => {
    this.setState({ value: event.target.value });
  };

  handleCheckBoxChange = name => event => {
    console.log('This is the event event call',event.target.value);
    this.setState({ [name]: event.target.checked });
  };
  // componentDidMount(){
  //   console.log('#########In componet DIdMount',this.props.question)
  // }

  handleChange(event) {
    console.log('#########In Radio Button changed',this.props.question)
    this.setState({
      size: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("This i the selected data",this.state.size);
    alert(`You chose the ${this.state.size} pizza.`);
  }
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    console.log("Question data componet is++++++",this.getAttribute('question'));
    ReactDOM.render(
      <div >
      <Grid container>
        <Grid item>
          <Grid container>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography variant="h5" style={{ justifyItems: "start" }}>
                    {!lodash.isEmpty(JSON.parse(this.getAttribute('question')).metadata) ? (
                      <ReactMarkdown
                        source={JSON.parse(this.getAttribute('question')).metadata.explanation}
                        escapeHtml={false}
                        renderers={{ code: Code }}
                      />
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              {JSON.parse(this.getAttribute('question')).questionPlayer === "mcq" ? (
                // <FormControl
                //   component="fieldset"
                //   // className={classes.formControl}
                // >
                //   <FormGroup>
                //     {JSON.parse(this.getAttribute('question')).options.map((data, index) => {
                //       return (
                //         <FormControlLabel
                //           key={index}
                //           control={
                //             <Checkbox
                //               onChange={this.handleCheckBoxChange("gilad")}
                //               value={data.optionText}
                //             />
                //           }
                //           label={data.optionText}
                //         />
                //       );
                //     })}
                //   </FormGroup>
                // </FormControl>
                JSON.parse(this.getAttribute('question')).options.map((data, index) => {
                // <form onSubmit={this.handleSubmit}>
                // <p>Select a pizza size:</p>
                return(
                <ul>
                  <li>
                    <label>
                      <input
                        key={index}
                        type="radio"
                        name={data.optionText}
                        value={data.optionText}
                        // checked={this.state.size === "small"}
                        onClick={this.handleChange}
                        onChange={this.handleChange}
                      />
                      {data.optionText}
                    </label>
                  </li>
                </ul>
                )})
                //  <button type="submit">Make Your Choice</button>
                // </form>
                ) : JSON.parse(this.getAttribute('question')).questionPlayer === "mmcq" ? (
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    // className={classes.group}
                    value={this.state.value}
                    onChange={this.handleRadioChange}
                  >
                    {JSON.parse(this.getAttribute('question')).options.map((data, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          // value={this.state.value}
                          control={<Radio  color="primary" />}
                          label={data.optionText}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>,mountPoint)
  }
}
  // render() {
  //   console.log("########in MCQ Question Componet", this.props.question);
  //   const { classes } = this.props;
  //   const { gilad, jason, antoine } = this.state;
  //   return (
      // <div className={classes.container}>
      //   <Grid container>
      //     <Grid item>
      //       <Grid container>
      //         <Grid item>
      //           <Grid container>
      //             <Grid item>
      //               <Typography variant="h5" style={{ justifyItems: "start" }}>
      //                 {!lodash.isEmpty(this.props.question.metadata) ? (
      //                   <ReactMarkdown
      //                     source={this.props.question.metadata.explanation}
      //                     escapeHtml={false}
      //                     renderers={{ code: Code }}
      //                   />
      //                 ) : (
      //                   ""
      //                 )}
      //               </Typography>
      //             </Grid>
      //           </Grid>
      //         </Grid>
      //       </Grid>
      //       <Grid container>
      //         <Grid item>
      //           {this.props.question.questionPlayer === "mcq" ? (
      //             <FormControl
      //               component="fieldset"
      //               className={classes.formControl}
      //             >
      //               <FormGroup>
      //                 {this.props.question.options.map((data, index) => {
      //                   return (
      //                     <FormControlLabel
      //                       key={index}
      //                       control={
      //                         <Checkbox
      //                           onChange={this.handleCheckBoxChange("gilad")}
      //                           value={data.optionText}
      //                         />
      //                       }
      //                       label={data.optionText}
      //                     />
      //                   );
      //                 })}
      //               </FormGroup>
      //             </FormControl>
      //           ) : this.props.question.questionPlayer === "mmcq" ? (
      //             <FormControl component="fieldset">
      //               <RadioGroup
      //                 aria-label="Gender"
      //                 name="gender1"
      //                 // className={classes.group}
      //                 value={this.state.value}
      //                 onChange={this.handleRadioChange}
      //               >
      //                 {this.props.question.options.map((data, index) => {
      //                   return (
      //                     <FormControlLabel
      //                       key={index}
      //                       // value={this.state.value}
      //                       control={<Radio  color="primary" />}
      //                       label={data.optionText}
      //                     />
      //                   );
      //                 })}
      //               </RadioGroup>
      //             </FormControl>
      //           ) : (
      //             ""
      //           )}
      //         </Grid>
      //       </Grid>
      //     </Grid>
      //   </Grid>
      // </div>
//     );
//   }
// }
export default withStyles(styles)(McqQuestion);
customElements.define('x-question',McqQuestion);
