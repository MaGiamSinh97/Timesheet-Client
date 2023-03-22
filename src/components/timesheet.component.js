import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import React, { Component } from 'react';
import { variables } from '../common/variables';

export default class Timesheet extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
    }
  }
  componentDidMount(){
    this.refreshList();
  }

  refreshList() {
    fetch(variables.API_URL + 'Timesheet')
        .then(response => response.json())
        .then(data => {
            this.setState({ data: data });
        });
  }
  render(){
    const columns = [
      {
        Header: "KnoxId",
        accessor: "knoxId", 
      },
      {
        Header: "Name",
        accessor: "name", 
        minWidth:200
      },
      {
        Header: "Project",
        accessor: "project", 
        minWidth: 300
      },
      {
        Header: "Date",
        accessor: "date", 
      },
      {
        Header: "Time In",
        accessor: "timeIn", 
      },
      {
        Header: "Time Out",
        accessor: "timeOut", 
      },
      {
        Header: "Absent Time",
        accessor: "absentTime", 
      },
      {
        Header:"Explained",
        Cell:row=>(
          <button>{row.value}</button>
        )
      }
    ];
    return <ReactTable 
      data={this.state.data} 
      columns={columns} 
      defaultPageSize={15}
      noDataText="No Data!"
      className="-highlight"
       />;
  }
}


