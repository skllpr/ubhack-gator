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
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.age);
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
    .catch(error => console.log('error', error));
    if (this.state.probability > 1)
      this.setState({probability: 1});
    else if (this.state.probability < 1)
      this.setState({probability: 0});
    event.preventDefault();

  }

  render() {
    return (
      <>
      <div>
        <div className = {"intro"}>
          <div className = {"vertically-centered-intro"}>
          <div className = {"inline"}>
          <p id="test" style ={{color: "white"}} className = {"fade-in"}> Hi...</p> <p style ={{color: "white"}} className = {"fade-in"}> I'm Henry </p>
          </div>
          <p style = {{color:"white"}} className = {"fade-in2"}>A modern alternative to credit </p>

          </div>
        </div>
      </div>
      <br></br>
      <div className = {"panel2"}>
        <div className = {"centered"}>
        <p> Are you in one of the following groups? </p>
        </div>
        <ul>
          <li> Never Owned A Credit Card? </li>
          <li> Just recently started developing credit? </li>
          <li> Are looking for a better way to measure your risk? </li>
        </ul>
        <div className = {"centered"}>
        <p> Meet Henry: A-AI powered tool to help assess your risk of defaulting in the next 2 years </p>
        <br></br>
        </div>
      </div>
      <div className = {'panel3'}>
      <div className = {'panel3inner'}>
      {this.state.responded ? <>


        <PieChart
        data={[
          {title: 'probablilty', value: this.state.probability, color: '#E38627'},
          {title: 'else', value: (1-this.state.probability), color: '#C13C37'},

        ]}
        lineWidth = {10}
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
    <Form.Label>Lines of Credit (relatives/family/friends):</Form.Label>
    <Form.Control value={this.state.loc} onChange={this.handleChangeLoc} type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput4">
    <Form.Label>Number of Loans:</Form.Label>
    <Form.Control value={this.state.loans} onChange={this.handleChangeLoans}  type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput4">
    <Form.Label>Monthly Costs:</Form.Label>
    <Form.Control value={this.state.costs} onChange={this.handleChangeCosts}  type="number" placeholder="0" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput4">
    <Form.Label>Monthly Income:</Form.Label>
    <Form.Control value={this.state.income} onChange={this.handleChangeIncome} type="number" placeholder="0" />
  </Form.Group>
  <Button type="submit">Submit form</Button>
</Form>
</>
}
</div>
</div>
</>
    );
  }
}

export default App;
