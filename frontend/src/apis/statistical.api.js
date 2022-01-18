import axios from "axios";

const getStatisticalPatient = async (typeDate="week") => {
  var statistical = [];
  var params = {
    type: typeDate
  }
  const promise = new Promise(async (res, rej) => {
    axios.get('/api/statistical/patients',{ params: params}).then(resData => {
      if (resData.status === 200) {
        res(resData.data);
      } else {
        rej(resData)
      }
    })
  });
  var statistical = await promise.then(data => data)
  return statistical;
}

const getStatisticalPrescription = async (typeDate="week") => {
  var statistical = [];
  var params = {
    type: typeDate
  }
  const promise = new Promise(async (res, rej) => {
    axios.get('/api/statistical/prescription',{ params: params}).then(resData => {
      if (resData.status === 200) {
        res(resData.data);
      } else {
        rej(resData)
      }
    })
  });
  var statistical = await promise.then(data => data)
  return statistical;
}

const statisticalService = {
  getStatisticalPatient,
  getStatisticalPrescription
}
export default statisticalService;
