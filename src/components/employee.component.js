import React, { Component } from 'react';
import { variables } from '../common/variables';

export class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            modalTitle: "",
            employeeName: "",
            du: "",
            knoxId: "",
            accNo:"",
            employeeId: 0,

            employeeIdFilter: "",
            employeeNameFilter: "",
            duFilter: "",
            employeesWithoutFilter: []
        }
    }
    FilterFn() {
        var employeeIdFilter = this.state.employeeIdFilter;
        var employeeNameFilter = this.state.employeeNameFilter;
        var duFilter = this.state.duFilter;

        var filteredData = this.state.employeesWithoutFilter.filter(
            function (el) {
                return el.employeeId.toString().toLowerCase().includes(
                    employeeIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.employeeName.toString().toLowerCase().includes(
                        employeeNameFilter.toString().trim().toLowerCase()
                    )
                    &&
                    el.du.toString().toLowerCase().includes(
                        duFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ employees: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.employeesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ employees: sortedData });
    }

    changeemployeeIdFilter = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.employeeIdFilter = e.target.value;
        this.FilterFn();
    }
    changeemployeeNameFilter = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.employeeNameFilter = e.target.value;
        this.FilterFn();
    }

    changeduFilter = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.duFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'Employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data, employeesWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeemployeeName = (e) => {
        this.setState({ employeeName: e.target.value });
    }

    changeDu = (e) => {
        this.setState({ du: e.target.value });
    }

    changeKnoxId = (e) => {
        this.setState({ knoxId: e.target.value });
    }
    changeAccNo = (e) => {
        this.setState({ accNo: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            employeeId: 0,
            employeeName: "",
            du: "",
            knoxId: "",
            accNo:"",
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Employee",
            employeeId: dep.employeeId,
            employeeName: dep.employeeName,
            du: dep.du,
            knoxId: dep.knoxId,
            accNo: dep.accNo
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FullName: this.state.employeeName,
                du: this.state.du,
                knoxId: this.state.knoxId,
                accNo:this.state.accNo
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    updateClick() {
        fetch(variables.API_URL + 'Employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.employeeId,
                FullName: this.state.employeeName,
                du: this.state.du,
                knoxId: this.state.knoxId,
                accNo:this.state.accNo
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    deleteClick(id) {
        if (window.confirm('Are you sure delete this employee?')) {
            fetch(variables.API_URL + 'Employee/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            employees,
            modalTitle,
            employeeId,
            employeeName,
            du,
            knoxId,
            accNo
        } = this.state;
        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add employee
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">

                                    <input className="form-control m-2"
                                        onChange={this.changeemployeeIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('employeeId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('employeeId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>
                                Employee Id
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeemployeeNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('employeeName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('employeeName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Employee Name

                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeduFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('Du', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('Du', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Du

                            </th>
                            <th style={{width: '15%'}}>
                                Options                    
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(dep =>
                            <tr key={dep.employeeId}>
                                <td>{dep.employeeId}</td>
                                <td>{dep.employeeName}</td>
                                <td>{dep.du}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.employeeId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Name</span>
                                    <input type="text" className="form-control"
                                        value={employeeName}
                                        onChange={this.changeemployeeName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Du</span>
                                    <input type="text" className="form-control"
                                        value={du}
                                        onChange={this.changeDu} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">KnoxId</span>
                                    <input type="text" className="form-control"
                                        value={knoxId}
                                        onChange={this.changeKnoxId} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">AccNo</span>
                                    <input type="text" className="form-control"
                                        value={accNo}
                                        onChange={this.changeAccNo} />
                                </div>

                                {employeeId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {employeeId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}