import axios from "axios";
import moment from "moment";

const getSchedules = async (perPage = 10, pagerIndex = 1) => {
  var schedules = [];
  const params = {
    per_page: perPage,
    page: pagerIndex,
  }
  const promise = new Promise(async (rej, res) => {
    axios.get('/api/schedules', { params: params }).then(resData => {
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
    axios.put(`/api/schedules/${id}`, { ...dataBody }).then(resData => {
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
    axios.delete(`/api/schedules/${id}`).then(resData => {
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

const schedulesService = {
  getSchedules,
  upadteSchedules,
  deleteSchedules
}
export default schedulesService;
