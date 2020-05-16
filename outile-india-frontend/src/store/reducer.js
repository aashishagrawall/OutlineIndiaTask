const initialState = {
  surveys: [],
  employees: [],
  employeesSurveyMap: {},
  currentEmployeeId: "",
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === "loadInitialData") {
    return {
      ...state,
      surveys: action.data.surveys,
      employees: action.data.employees,
      currentEmployeeId: action.data.employees[0].id,
      employeesSurveyMap: action.data.employeesSurveyMap,
    };
  }
  // console.log(newState, action);

  if (action.type === "addSurveyToEmployee") {
    if (state.employeesSurveyMap[state.currentEmployeeId]) {
      const newemployeesSurveyMap = Object.assign({}, state.employeesSurveyMap);
      const ind = newemployeesSurveyMap[state.currentEmployeeId].findIndex(
        (val) => val.id == action.survey.id
      );
      if (ind >= 0) {
        alert("Already added");
        return newState;
      }

      newemployeesSurveyMap[state.currentEmployeeId].push(action.survey);
      return {
        ...state,
        employeesSurveyMap: newemployeesSurveyMap,
      };
    }
    if (!state.employeesSurveyMap[state.currentEmployeeId]) {
      const newemployeesSurveyMap = Object.assign({}, state.employeesSurveyMap);
      newemployeesSurveyMap[state.currentEmployeeId] = [action.survey];
      return {
        ...state,
        employeesSurveyMap: newemployeesSurveyMap,
      };
    }
  }

  if (action.type === "deleteSurveyFromEmployee") {
    const newemployeesSurveyMap = Object.assign({}, state.employeesSurveyMap);
    newemployeesSurveyMap[state.currentEmployeeId] = newemployeesSurveyMap[
      state.currentEmployeeId
    ].filter((val) => val.id !== action.surveyId);
    return {
      ...state,
      employeesSurveyMap: newemployeesSurveyMap,
    };
  }

  if (action.type === "changeEmployeeId") {
    return {
      ...state,
      currentEmployeeId: action.value,
    };
  }

  return newState;
};

export default reducer;
