import React, { Component } from 'react';
import { variables } from '../common/variables';
import Select from 'react-select';

export class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            employees:[],
            dropEmployees:[],
            modalTitle: "",
            projectName: "",
            du: "",
            description: "",
            projectId: 0,
            memberId: 0,
            projectIdFilter: "",
            projectNameFilter: "",
            duFilter: "",
            projectsWithoutFilter: [],
        }
    }
    
    FilterFn() {
        var projectIdFilter = this.state.projectIdFilter;
        var projectNameFilter = this.state.projectNameFilter;
        var duFilter = this.state.duFilter;

        var filteredData = this.state.projectsWithoutFilter.filter(
            function (el) {
                return el.projectId.toString().toLowerCase().includes(
                    projectIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.projectName.toString().toLowerCase().includes(
                        projectNameFilter.toString().trim().toLowerCase()
                    )
                    &&
                    el.du.toString().toLowerCase().includes(
                        duFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ projects: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.projectsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ projects: sortedData });
    }

    changeprojectIdFilter = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.projectIdFilter = e.target.value;
        this.FilterFn();
    }
    changeprojectNameFilter = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.projectNameFilter = e.target.value;
        this.FilterFn();
    }

    changeduFilter = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.duFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'Project')
            .then(response => response.json())
            .then(data => {
                this.setState({ projects: data, projectsWithoutFilter: data });
            });
    }

    refreshListMember() {
        fetch(variables.API_URL + 'Project/GetMember/' +this.state.projectId)
        .then(response => response.json())
        .then(data => {
            this.setState({ employees: data });
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeprojectName = (e) => {
        this.setState({ projectName: e.target.value });
    }

    changeDu = (e) => {
        this.setState({ du: e.target.value });
    }

    changeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Project",
            projectId: 0,
            projectName: "",
            du: "",
            description: ""
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Project",
            projectId: dep.projectId,
            projectName: dep.projectName,
            du: dep.du,
            description: dep.description != null ? dep.description : ""
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Project', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.projectName,
                du: this.state.du,
                description: this.state.description
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
        fetch(variables.API_URL + 'Project', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.projectId,
                name: this.state.projectName,
                du: this.state.du,
                description: this.state.description
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
        if (window.confirm('Are you sure delete this project?')) {
            fetch(variables.API_URL + 'Project/' + id, {
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

    exportClick(id) {
        if (window.confirm('Do you want export timesheets for this project?')) {
            fetch(variables.API_URL + 'Uploadfiles/ExportFile/' + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res)=>{
                    const link = document.createElement('a');
                    link.href = res.url;
                    link.setAttribute('download', `${Date.now()}.xlsx`);
                    document.body.appendChild(link);
                    link.click();
                })
        }
    }

    exportAllClick(id) {
        if (window.confirm('Do you want export timesheets for all project?')) {
            id=0;
            fetch(variables.API_URL + 'Uploadfiles/ExportFile/' + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res)=>{
                    const link = document.createElement('a');
                    link.href = res.url;
                    link.setAttribute('download', `${Date.now()}.xlsx`);
                    document.body.appendChild(link);
                    link.click();
                })
        }
    }

    removeMember(id) {
        if (window.confirm('Are you sure remove member from this project?')) {
            fetch(variables.API_URL + 'Project/RemoveMember/' + this.state.projectId+ '/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshListMember();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    listClick(id) {
        this.setState({projectId:id});
        fetch(variables.API_URL + 'Project/GetMember/' +id)
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data });
            });
        fetch(variables.API_URL + 'Employee')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let mapdata= data.map(opt => ({ label: opt.employeeName, value: opt.employeeId }));
                this.setState({ dropEmployees: mapdata });
            });
    }
    addMemberClick(){
        fetch(variables.API_URL + 'Project/AddMember', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: this.state.memberId,
                ProjectId: this.state.projectId
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshListMember();
            }, (error) => {
                alert('Members already exist in the project');
            })
    }
    _renderMember() {
        return (
          <ul className='list-group'>
            { 
              this.state.employees.map(member => <li className='list-group-item' key={ member.id }><b>{ member.fullName }</b>  - {member.knoxId} - {member.du}<button type="button" className="btn btn-danger float-right" onClick={() => this.removeMember(member.id)}>Remove</button> </li>) 
            }
          </ul>
        );
      }
      
    render() {
        const {
            projects,
            modalTitle,
            projectId,
            projectName,
            du,
            description
        } = this.state;
        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add project
                </button>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    onClick={() => this.exportAllClick()}>
                    Export All
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">

                                    <input className="form-control m-2"
                                        onChange={this.changeprojectIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('projectId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('projectId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>
                                Project Id
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeprojectNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('projectName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('projectName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Project Name

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
                            <th style={{width: '19%'}}>
                                Options                    
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(dep =>
                            <tr key={dep.projectId}>
                                <td>{dep.projectId}</td>
                                <td>{dep.projectName}</td>
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
                                        onClick={() => this.deleteClick(dep.projectId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#listModal"
                                        onClick={() => this.listClick(dep.projectId)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16"> <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/> <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/> </svg>
                                    </button>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.exportClick(dep.projectId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 576 512"><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"/></svg>
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
                                    <span className="input-group-text">Project Name</span>
                                    <input type="text" className="form-control"
                                        value={projectName}
                                        onChange={this.changeprojectName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Du</span>
                                    <input type="text" className="form-control"
                                        value={du}
                                        onChange={this.changeDu} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Description</span>
                                    <input type="text" className="form-control"
                                        value={description}
                                        onChange={this.changeDescription} />
                                </div>

                                {projectId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {projectId !== 0 ?
                                    <button type="submit"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="listModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">List member of Project</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body overflow-auto">
                                <div className='row'>
                                <div className='col-sm-8'>
                                <Select
                                    options={this.state.dropEmployees}
                                    onChange={opt => {this.state.memberId = opt.value}}
                                    />
                                </div>
                                <div className='col-sm-4'>
                                    <button type="button" className="btn btn-primary" onClick={() => this.addMemberClick()}>Add</button>
                                </div>
                                </div>

                                <div className='overflow-auto' style={{height:'500px', marginTop:'30px'}}>
                                    { this.state.employees && this._renderMember() }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}