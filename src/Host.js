import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import McqQuestion from "./McqQuestion.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MDReactComponent from 'markdown-react-js';

import ReactMarkdown from "react-markdown";
import lodash from 'lodash';

import {
  faForward,
  faBackward,
  faFlag,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: `0 ${theme.spacing.unit * 3}px`
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    marginTop: "10px",
    marginRight: "10px",
    marginLeft: "10px"
  },
  avatar: {
    margin: 10,
    width: "60px",
    height: "60px",

  },
  avatar1: {
    margin: 10,
    backgroundColor: "white",
    border: "2px solid black",
    width: "60px",
    height: "60px",
  },
  chip: {
    margin: theme.spacing.unit
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      response: "",
      questionNumber: 1,
      totalQuestion: "",
      questionIndex: "",
      open: false,
      vertical: 'top',
      horizontal: 'center',
      text:"this is text to pass"
    };
    this.data= {
      "id":1,
      "questionPlayer": "mcq",
      "questionEditor": "mcq",
      "questionTitle": "Question is for Mvn",
      "rawQuestionText": "Two spaces at the end of a line produces a **Heading level 1**",
      "questionText": "POM stands for", 
      "rawOptions": [
        { "id": "1", "optionText": "Project Object Model" },
        { "id": "2", "optionText": "Project object" }
      ],
      "options": [
        { "id": "1", "optionText": "<HTML>" },
        { "id": "2", "optionText": "<HTML>" }
      ],
      "correctOptionKey": "<OptionID>",
      "metadata": {
        "taxonomy": "<TaxonomyLevel>",
        "concepts": ["Java","MVN Build Tool","Java Concept"],
        "hint": "<String|Empty>",
        "explanation": "this is the QuestionExplation of **markdown support**  Question1  # contains code snippet ```function method(String name){ String name=name}```",
        "duration": "Milliseconds",
        "marks": "<Number>"
      },
    "insights" : {
      "totalAttemptsOfQuestion": "<Number>",
      "rightAttempts": "<Number>",
      "rightAttemptPercentage": "<Number>"
    }
  }
  }
  componentDidMount() {
    axios.get("http://localhost:3001/data").then(resp => {
      console.log("#########", resp.data.length);
      this.setState({
        response: resp.data,
        totalQuestion: resp.data.length,
        questionIndex: 1,
        question: resp.data[0]
      });
    });
  }
  handlePreviousChange = () => {
     if (this.state.questionNumber > 0) {
      console.log("INside next chage*****",this.state.questionNumber,this.state.totalQuestion);
      console.log("$$4Data Value In previous $$$$$",this.state.response[this.state.questionNumber]);
      this.setState({
        questionNumber: this.state.questionNumber - 1,
        question: this.state.response[this.state.questionNumber-2]
      });
     }
     if(this.state.questionNumber === 1){
       console.log("Inside 0 question number block")
      this.setState({
        questionNumber: this.state.questionNumber,
        question: this.state.response[this.state.questionNumber-1]
      });
     }
     if(this.state.questionNumber === this.state.totalQuestion)
     {
       console.log("*****Inside the questoin is equal to total number")
       this.setState({
        questionNumber: this.state.questionNumber-1,
        question: this.state.response[this.state.questionNumber-2]
       })
       console.log("$$$$$$$After state update$$",this.state.question)
     }
  };
  handleNextChange = () => {
    if (this.state.questionNumber < this.state.totalQuestion) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        question: this.state.response[this.state.questionNumber]
      });
    }
  };

  handleBarIconClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleBarIconClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container spacing={0}>
            <Grid item>
              <Grid item>
                <Avatar className={classes.avatar}>
                  {this.state.questionNumber}
                </Avatar>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar1}>
                  <FontAwesomeIcon style={{ color: "red" }} icon={faFlag} />
                </Avatar>
              </Grid>
            </Grid>
            <Grid item xs={11}>
            <Grid container>
              <Grid item>
                <Typography style={{marginTop:'-20px',marginBottom:'-30px'}} variant="h4">
                 {/* {this.state.question.questionTitle} */}
                 {!lodash.isEmpty(this.state.question.rawQuestionText) ?
                 <ReactMarkdown
                 source={this.state.question.rawQuestionText}
                 escapeHtml={false}
               />:""}
                  {/* <MDReactComponent  text="Two spaces at the end of a line produces a #Heading level 1" /> :""} */}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
                  <Grid item>
                  {(!lodash.isEmpty(this.state.question.metadata))?
                 this.state.question.metadata.concepts.map((data,index)=> {
                     return  <Chip key={index}
                       label={data  }
                       clickable
                       className={classes.chip}
                       color="primary"
                       variant="outlined"
                     />
                  }):""}
                  </Grid>
                </Grid>
                <Grid container>
                <Grid item>
                <Typography style={{color:'blue'}}>Insights for the Question % %</Typography>
                </Grid>
                </Grid>  
              {/* <McqQuestion question={this.state.question} /> */}
              <x-question question={JSON.stringify(this.data)}></x-question>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16}>
                <Grid item>
                  <Button variant="contained" className={classes.button}>
                    Assist
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Finish Quiz
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" className={classes.button}>
                    Pause
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16}>
                <Grid item>
                  <Button onClick={this.handlePreviousChange}>
                    <FontAwesomeIcon
                      style={{ color: "blue", fontSize: "30px" }}
                      icon={faBackward}
                    />
                  </Button>
                </Grid>
                <Grid item style={{marginTop:'15px',width:'400px'}}>
                  <Button onClick={this.handleBarIconClick({ vertical: 'bottom', horizontal: 'center' })}>
                  <FontAwesomeIcon style={{fontSize:'30px'}} icon={faBars}/>
        </Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleBarIconClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Question Sequences Come here</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleBarIconClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
                </Grid>
                <Grid item>
                  <Button onClick={this.handleNextChange}>
                    <FontAwesomeIcon
                      style={{ color: "blue", fontSize: "30px" }}
                      icon={faForward}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {/* <h1>IN host Componet</h1> */}
        {/* {console.log("%%%%%%%DataVAlue is",this.state.question)} */}
        {/* <x-search  question={JSON.stringify(this.data)}></x-search> */}
      </div>
    );
  }
}
export default withStyles(styles)(Host);
