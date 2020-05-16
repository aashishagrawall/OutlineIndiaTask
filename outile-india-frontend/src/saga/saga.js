import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//   try {
//     const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
//   } catch (e) {
//     yield put({ type: "USER_FETCH_FAILED", message: e.message });
//   }
// }
function* loadInitialData() {
  const response = yield axios.get(
    "http://localhost:5000/allEmployessAndSurvey"
  );
  console.log(response);
  yield put({ type: "loadInitialData", data: response.data });
}

function* postToBackend(action) {
  const response = yield axios.post(
    "http://localhost:5000/surveyData",
    action.employeesSurveyMap
  );
  console.log(response);
  if (response.data.status == true) {
    alert("Posted to backend");
  } else {
    alert("Some error occured");
  }
}
function* mySaga() {
  yield takeLatest("loadInitialDataAsync", loadInitialData);
  yield takeLatest("postTobackend", postToBackend);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

export default mySaga;
