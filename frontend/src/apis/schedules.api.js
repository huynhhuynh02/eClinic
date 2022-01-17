import axios from "axios";
import moment from "moment";
import {API_END_POINT, API_SCHEDULE_URL} from '../utils/constants';

const getSchedules = async (perPage = 10, pagerIndex = 1) => {
  var schedules = [];
  const params = {
    per_page: perPage,
    page: pagerIndex,
  }
  const promise = new Promise(async (rej, res) => {
    axios.get(`${API_END_POINT}/${API_SCHEDULE_URL}`, { params: params }).then(resData => {
      if (resData.status === 200) {
        rej(resData.data);
      } else {
        res(resData)
      }
    })
  });
  var schedules = await promise.then(data => data)
  return schedules;
}

const upadteSchedules = async (id, scheduleTime, description) => {
  const dataBody = {
    schedule_time: moment(scheduleTime).format("YYYY-MM-DD h:mm:ss"),
    description: description
  }
  const promise = new Promise(async (rej, res) => {
    axios.put(`${API_END_POINT}/${API_SCHEDULE_URL}/${id}`, { ...dataBody }).then(resData => {
      if (resData.status === 200) {
        rej(resData.data);
      } else {
        res(resData)
      }
    })
  });
  var schedules = await promise.then(data => data)
  return schedules;
}

const deleteSchedules = async (id) => {
  const promise = new Promise(async (rej, res) => {
    axios.delete(`${API_END_POINT}/${API_SCHEDULE_URL}/${id}`).then(resData => {
      if (resData.status === 201) {
        rej(resData.data);
      } else {
        res(resData)
      }
    })
  });
  var schedules = await promise.then(data => data)
  return schedules;
}

export const addSchedules = async (formData) => {
  try {
      return await axios.post(`${API_END_POINT}/${API_SCHEDULE_URL}`, formData);
      
  } catch (error) {
      console.error(error);
  }
}

const schedulesService = {
  getSchedules,
  upadteSchedules,
  deleteSchedules,
  addSchedules
}
export default schedulesService;
