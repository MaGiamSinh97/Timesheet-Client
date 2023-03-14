import http from "../http-common";

class TimesheetDataService {
  getAll() {
    return http.get("/Employee/GetTimesheet");
  }

  get(id) {
    return http.get(`/employee/${id}`);
  }

  create(data) {
    return http.post("/employees", data);
  }
}

export default new TimesheetDataService();