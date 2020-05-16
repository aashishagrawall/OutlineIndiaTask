import React, { Component } from "react";
import "bulma/css/bulma.css";
import "./App.css";

import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    this.props.loadInitialDataAsync();
  }
  render() {
    const renderMap = this.props.employeesSurveyMap[
      this.props.currentEmployeeId
    ]
      ? this.props.employeesSurveyMap[this.props.currentEmployeeId]
      : [];
    console.log(renderMap);
    return (
      <div>
        <section className="employee-select">
          <div className="container">
            <h2 className="title text-align">Select Employee</h2>
            <div className="align-center">
              <div className="select">
                <select
                  value={this.props.currentEmployeeId}
                  onChange={this.props.changeEmployeeId}
                >
                  {this.props.employees.map((employee) => {
                    return (
                      <option value={employee.id} key={employee.id}>
                        {employee.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="employee-survey">
          <div className="container ">
            <div className="columns">
              <div className="column is-half">
                <div className="column-margin">
                  <div className="column-wrapper">
                    <h1 className="survey-title title  is-4">Survey List</h1>
                    <div className="elements-wrapper" id="scrollbar">
                      <ul className="li-wrapper">
                        {this.props.surveys.map((survey) => {
                          return (
                            <li
                              className="list-style subtitle is-5"
                              key={survey.id}
                            >
                              <div className="columns is-mobile">
                                <div className="column is-8">
                                  <div className="survey-heading">
                                    {survey.details}
                                  </div>
                                </div>
                                <div className="column is-4">
                                  <button
                                    className="button survey-button is-primary"
                                    onClick={() =>
                                      this.props.addSurveyToEmployee(survey)
                                    }
                                  >
                                    ADD
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="column-margin">
                  <div className="column-wrapper">
                    <h1 className="survey-title title  is-4">Survey List</h1>
                    <div className="elements-wrapper" id="scrollbar">
                      <ul className="li-wrapper">
                        {renderMap.length > 0 ? (
                          renderMap.map((survey) => {
                            return (
                              <li
                                className="list-style subtitle is-5"
                                key={survey.id}
                              >
                                <div className="columns is-mobile">
                                  <div className="column is-8">
                                    <div className="survey-heading">
                                      {survey.details}
                                    </div>
                                  </div>
                                  <div className="column is-4">
                                    <button
                                      className="button survey-button is-primary"
                                      onClick={() =>
                                        this.props.deleteSurveyFromEmployee(
                                          survey.id
                                        )
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <h1 className="subtitle text-align">Add Something</h1>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="done-button">
              <button
                className="button is-success"
                onClick={() =>
                  this.props.postTobackend(this.props.employeesSurveyMap)
                }
              >
                Done
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
    employees: state.employees,
    employeesSurveyMap: state.employeesSurveyMap,
    currentEmployeeId: state.currentEmployeeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialDataAsync: () => {
      dispatch({ type: "loadInitialDataAsync" });
    },
    addSurveyToEmployee: (survey) => {
      dispatch({ type: "addSurveyToEmployee", survey: survey });
    },
    deleteSurveyFromEmployee: (id) => {
      dispatch({ type: "deleteSurveyFromEmployee", surveyId: id });
    },
    changeEmployeeId: (event) => {
      dispatch({ type: "changeEmployeeId", value: event.target.value });
    },
    postTobackend: (employeesSurveyMap) => {
      dispatch({
        type: "postTobackend",
        employeesSurveyMap: employeesSurveyMap,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
