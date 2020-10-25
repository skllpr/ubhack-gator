import React from 'react';
import './App.css';
import {Form, Button} from 'react-bootstrap'
import { PieChart } from 'react-minimal-pie-chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: 0,
      age: 0,
      loc: 0,
      loans: 0,
      costs: 0,
      income: 0,
      responded: false,
      probability: 0

    };

    this.handleChangeChildren = this.handleChangeChildren.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeLoc = this.handleChangeLoc.bind(this);
    this.handleChangeLoans = this.handleChangeLoans.bind(this);
    this.handleChangeCosts = this.handleChangeCosts.bind(this);
    this.handleChangeIncome = this.handleChangeIncome.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeChildren(event) {
    this.setState({children : event.target.value});
  }
  handleChangeAge(event) {
    this.setState({age : event.target.value});
  }
  handleChangeLoc(event) {
    this.setState({loc : event.target.value});
  }
  handleChangeLoans(event) {
    this.setState({loans : event.target.value});
  }
  handleChangeCosts(event) {
    this.setState({costs : event.target.value});
  }
  handleChangeIncome(event) {
    this.setState({income : event.target.value});
  }
  handleProbability() {
    if (this.state.probability > 1) {
      this.setState({probability: .95});
    }
    else if (this.state.probability < 0) {
      this.setState({probability: .05});
    }
  }

  handleSubmit(event) {
    this.setState({responded: true});
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer z0ibpfCpODHY3nihhDrr5zx05gs9wjTX");
    myHeaders.append("Content-Type", "application/json");
    if (this.state.income === 0)
      this.setState({income: 1});
  var raw = JSON.stringify({"Inputs":{"WebServiceInput0":[{"ID":9,"SeriousDlqin2yrs":0,"RevolvingUtilizationOfUnsecuredLines":0,"Age":this.state.age,"NumberOfTime30-59DaysPastDueNotWorse":2,"DebtRatio":(this.state.costs/this.state.income),"MonthlyIncome":this.state.income,"NumberOfOpenCreditLinesAndLoans":this.state.loc,"NumberOfTimes90DaysLate":10,"NumberRealEstateLoansOrLines":this.state.loans,"NumberOfTime60-89DaysPastDueNotWorse":0,"NumberOfDependents":this.state.children}]}});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://cors-anywhere.herokuapp.com/http://52.254.82.215/api/v1/service/endpoint/score", requestOptions)
    .then(response => response.json())
    .then(result => this.setState({probability: result["Results"]["WebServiceOutput0"][0]["Scored Labels"]}))
    .then(this.handleProbability())
    .catch(error => console.log('error', error));

    event.preventDefault();

  }

  render() {
    if (this.state.probability > 1 || this.state.probability < 0)
      this.handleProbability();
    return (
      <>
      <div className = {"preamble"}>
      </div>
      <div>
        <div className = {"intro"}>
          <div className = {"vertically-centered-intro"}>
          <div className = {"inline"}>
          <p id="test" style ={{color: "white"}} className = {"fade-in"}> Hi...</p> <p style ={{color: "white"}} className = {"fade-in"}> I'm Henry </p>
          </div>
          <p style = {{color:"white"}} className = {"fade-in2"}>A modern approach to financial awareness </p>

          </div>
        </div>
      </div>
      <br></br>
      <div className = {"panel2"}>
        <div className = {"centered"}>
        <p> Are you in one of the following groups? </p>
        </div>
        <ul>
          <li> Feeling overwhelmed by uncertain future? </li>
          <li> Have a deeper insight into your financial risks? </li>
          <li> Struggling to pay bills? </li>
        </ul>
        <div className = {"centered"}>
        <p> Meet Henry: An AI-powered tool to help assess your risk of missing debt payments in the next 2 years </p>
        <br></br>
        </div>
      </div>
      <div className = {'panel3'}>
      <div className = {'panel3inner'}>
      {this.state.responded && this.state.probability > 0 && this.state.probability < 1 ? <>

        {(this.state.probability > .6) ?
          <p className = {"badCredit"}> Your risk of missing a debt payment is: {Math.trunc(100*this.state.probability)}%. Scroll down for resources to help reduce your risk. </p> :

            this.state.probability < .25 ?
            <p className = {"goodCredit"}> Your risk of missing a debt payment is: {Math.trunc(100*this.state.probability)}%. Take a look at some helpful resources for financial planning bellow. </p>
            :
            <p className = {"okCredit"}> Your risk of missing a debt payment is {Math.trunc(100*this.state.probability)}%. You might find some resources bellow to be useful. </p>

        }

        <PieChart
        data={[
            {title: 'probablilty', value: this.state.probability, color: '#FFCCCB'},
          {title: 'else', value: (1-this.state.probability), color: '#7FFFD4'},

        ]}
        lineWidth = {10}
        animate = {true}
        animationDuration = {1500}
        />
         </> :
         <>
         <br></br>

      <Form onSubmit={this.handleSubmit}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Number of Children:</Form.Label>
    <Form.Control value={this.state.children} onChange={this.handleChangeChildren} type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput2">
    <Form.Label>Age:</Form.Label>
    <Form.Control value={this.state.age} onChange={this.handleChangeAge} type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput3">
    <Form.Label>Outside Support (relatives/family/friends):</Form.Label>
    <Form.Control value={this.state.loc} onChange={this.handleChangeLoc} type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput4">
    <Form.Label>Number of Loans (Car/House/Student):</Form.Label>
    <Form.Control value={this.state.loans} onChange={this.handleChangeLoans}  type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput4">
    <Form.Label>Monthly Expenditure:</Form.Label>
    <Form.Control value={this.state.costs} onChange={this.handleChangeCosts}  type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput4">
    <Form.Label>Monthly Income:</Form.Label>
    <Form.Control value={this.state.income} onChange={this.handleChangeIncome} type="number" placeholder="0" />
  </Form.Group>
  <Button style = {{backgroundColor: "#7EC8E3", borderColor: "#7EC8E3"}} type="submit">Submit form</Button>
</Form>
</>
}
</div>
</div>
<div className = {"panel4"}>
<div className = {"panel4inner"}>
<p className = {"linkTitle"}> Some Useful links </p>
<a href="https://www3.mtb.com/personal-banking/online-mobile-services/money-smart"><p>M&T Bank's Personal Financial Management Calculator</p></a>
<a href="https://www.consumer.gov/debt"><p>Federal Trade Commission</p></a>
<a href="https://www.daveramsey.com/blog/the-truth-about-debt-management"><p>Dave Ramsey on Debt</p></a>


</div>
</div>
<div className = {"panel5"}>
Site, Machine Learning Model, Azure Resources by Sohil Kollipara
</div>
</>
    );
  }
}

export default App;
