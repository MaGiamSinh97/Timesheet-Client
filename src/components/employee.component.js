import React, { Component } from "react";
import { variables } from "../common/variables";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      modalTitle: "",
      employeeName: "",
      du: "",
      knoxId: "",
      accNo: "",
      role: "",
      passWord: "",
      employeeId: 0,
      employeeIdFilter: "",
      employeeNameFilter: "",
      duFilter: "",
      employeesWithoutFilter: [],
      timeIn: "08:00",
      timeOut: "17:00",
      timeFrom: "",
      timeTo: "",
      typeTime: 1,
      timeworks: [],
    };
  }
  FilterFn() {
    var employeeIdFilter = this.state.employeeIdFilter;
    var employeeNameFilter = this.state.employeeNameFilter;
    var duFilter = this.state.duFilter;

    var filteredData = this.state.employeesWithoutFilter.filter(function (el) {
      return (
        el.employeeId
          .toString()
          .toLowerCase()
          .includes(employeeIdFilter.toString().trim().toLowerCase()) &&
        el.employeeName
          .toString()
          .toLowerCase()
          .includes(employeeNameFilter.toString().trim().toLowerCase()) &&
        el.du
          .toString()
          .toLowerCase()
          .includes(duFilter.toString().trim().toLowerCase())
      );
    });
    this.setState({ employees: filteredData });
  }
  sortResult(prop, asc) {
    var sortedData = this.state.employeesWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
    this.setState({ employees: sortedData });
  }

  changeemployeeIdFilter = (e) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.employeeIdFilter = e.target.value;
    this.FilterFn();
  };
  changeemployeeNameFilter = (e) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.employeeNameFilter = e.target.value;
    this.FilterFn();
  };

  changeduFilter = (e) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.duFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch(variables.API_URL + "Employee")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data, employeesWithoutFilter: data });
      });
  }
  refreshListTimework(){
    fetch(variables.API_URL + "Timework/"+this.state.employeeId)
    .then((response) => response.json())
    .then((data) => {
      this.setState({ timeworks: data });
    });
  }
  componentDidMount() {
    this.refreshList();
  }

  changeemployeeName = (e) => {
    this.setState({ employeeName: e.target.value });
  };

  changeDu = (e) => {
    this.setState({ du: e.target.value });
  };

  changeKnoxId = (e) => {
    this.setState({ knoxId: e.target.value });
  };
  changeAccNo = (e) => {
    this.setState({ accNo: e.target.value });
  };
  changeRole = (e) => {
    this.setState({ role: e.target.value });
  };
  changePassWord = (e) => {
    this.setState({ passWord: e.target.value });
  };
  changeTypeTime = (e) => {
    this.setState({ typeTime: e.target.value });
  };
  changeTimeIn = (timeIn) => this.setState({ timeIn });
  changeTimeOut = (timeOut) => this.setState({ timeOut });
  changeFrom = (timeFrom) => this.setState({ timeFrom });
  changeTo = (timeTo) => this.setState({ timeTo });

  addClick() {
    this.setState({
      modalTitle: "Add Employee",
      employeeId: 0,
      employeeName: "",
      du: "",
      knoxId: "",
      accNo: "",
      role: 0,
      passWord: "",
    });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit Employee",
      employeeId: dep.employeeId,
      employeeName: dep.employeeName,
      du: dep.du,
      knoxId: dep.knoxId,
      accNo: dep.accNo,
      role: dep.role,
      passWord: "",
    });
  }

  createClick() {
    fetch(variables.API_URL + "Employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FullName: this.state.employeeName,
        du: this.state.du,
        knoxId: this.state.knoxId,
        accNo: this.state.accNo,
        role: this.state.role,
        encPass: this.state.passWord,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  updateClick() {
    fetch(variables.API_URL + "Employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: this.state.employeeId,
        FullName: this.state.employeeName,
        du: this.state.du,
        knoxId: this.state.knoxId,
        accNo: this.state.accNo,
        role: this.state.role,
        encPass: this.state.passWord,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  deleteClick(id) {
    if (window.confirm("Are you sure delete this employee?")) {
      fetch(variables.API_URL + "Employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }
  timeClick(dep) {
    this.setState({ typeTime: 1, employeeId: dep.employeeId });
    fetch(variables.API_URL + "Timework/" + dep.employeeId)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ timeworks: data });
      });
  }
  addTimeWorkClick() {
    fetch(variables.API_URL + "TimeWork", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: this.state.employeeId,
        type: this.state.typeTime,
        timeIn: this.state.timeIn,
        timeOut: this.state.timeOut,
        startApply: this.state.timeFrom,
        endApply: this.state.timeTo,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  removeTimework(id){
    if (window.confirm('Are you sure remove timework of this member?')) {
        fetch(variables.API_URL + 'Timework/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshListTimework();
            }, (error) => {
                alert('Failed');
            })
    }
  }

  _renderTimework() {
    return (
      <ul className="list-group">
        {this.state.timeworks.map((time) => (
          <li className="list-group-item" key={time.id}>
            <b>{time.type == 1 ? "Fixed" : "Flexible"}</b> - Time In:{" "}
            {time.timeIn} - Time Out: {time.timeOut} - From: {time.startApply} -
            To: {time.endApply}
            <button
              type="button"
              className="btn btn-danger float-right"
              onClick={() => this.removeTimework(time.id)}
            >
              Remove
            </button>{" "}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      employees,
      modalTitle,
      employeeId,
      employeeName,
      du,
      knoxId,
      accNo,
      role,
      typeTime,
      passWord,
    } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add employee
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeemployeeIdFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("employeeId", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("employeeId", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Employee Id
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeemployeeNameFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("employeeName", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("employeeName", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                KnoxId
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeduFilter}
                    placeholder="Filter"
                    autoComplete="off"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Du", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Du", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Du
              </th>
              <th style={{ width: "15%" }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((dep) => (
              <tr key={dep.employeeId}>
                <td>{dep.employeeId}</td>
                <td>{dep.knoxId}</td>
                <td>{dep.du}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(dep)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(dep.employeeId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#listTimeModal"
                    onClick={() => this.timeClick(dep)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 448 512"
                    >
                      <path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ width: "17%" }}>
                    Name
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={employeeName}
                    onChange={this.changeemployeeName}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ width: "17%" }}>
                    Du
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={du}
                    onChange={this.changeDu}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ width: "17%" }}>
                    KnoxId
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={knoxId}
                    onChange={this.changeKnoxId}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ width: "17%" }}>
                    AccNo
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={accNo}
                    onChange={this.changeAccNo}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ width: "17%" }}>
                    Password
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    value={passWord}
                    onChange={this.changePassWord}
                  />
                </div>
                <select
                  className="form-select"
                  aria-label="select role"
                  value={role}
                  onChange={this.changeRole}
                >
                  <option value="0">---Select---</option>
                  <option value="1">Admin</option>
                  <option value="2">PM</option>
                  <option value="3">Dev</option>
                </select>

                {employeeId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    style={{ marginTop: "25px" }}
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {employeeId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    style={{ marginTop: "25px" }}
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addTimeModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Working Time</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">Type working time</div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      aria-label="select role"
                      value={typeTime}
                      onChange={this.changeTypeTime}
                    >
                      <option value="1">Fixed</option>
                      <option value="2">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-md-4">
                    {this.state.typeTime == 1 ? "Time In" : "Flexi From"}
                  </div>
                  <div className="col-md-8">
                    <TimePicker
                      onChange={this.changeTimeIn}
                      value={this.state.timeIn}
                      locale="sv-sv"
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-md-4">
                    {this.state.typeTime == 1 ? "Time Out" : "Flexi To"}
                  </div>
                  <div className="col-md-8">
                    <TimePicker
                      onChange={this.changeTimeOut}
                      value={this.state.timeOut}
                      locale="sv-sv"
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-md-4">Apply From</div>
                  <div className="col-md-8">
                    <DatePicker
                      onChange={this.changeFrom}
                      value={this.state.timeFrom}
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-md-4">Apply To</div>
                  <div className="col-md-8">
                    <DatePicker
                      onChange={this.changeTo}
                      value={this.state.timeTo}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  style={{ marginTop: "25px" }}
                  onClick={() => this.addTimeWorkClick()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="listTimeModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">List timeworks of member</h5>
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  style={{ marginLeft: "10px" }}
                  data-bs-toggle="modal"
                  data-bs-target="#addTimeModal"
                >
                  Add Timeworks
                </button>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body overflow-auto">
                <div
                  className="overflow-auto"
                  style={{marginTop: "10px" }}
                >
                  {this.state.timeworks=="" &&
                    <b>No data!</b>
                   }       
                  {this.state.timeworks && this._renderTimework()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
