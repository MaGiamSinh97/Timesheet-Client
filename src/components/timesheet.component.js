import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import React, { useState, useEffect } from "react";
import { variables } from "../common/variables";

function App() {
  const [posts, setPosts] = useState([]);


  const getPosts = () => {
    fetch(variables.API_URL + "Timesheet")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  };

  const Process = (post)=>{
    console.log(post);
  }

  const DeletePost = (id) => {
    const _posts = posts.filter((post) => {
      return post.id === id;
    });
    Process(_posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const data = posts;

  const columns = [
    {
      Header: "KnoxId",
      accessor: "knoxId",
    },
    {
      Header: "Name",
      accessor: "name",
      minWidth: 200,
    },
    {
      Header: "Project",
      accessor: "project",
      minWidth: 300,
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
      Header: "Explained",
      Cell: (prop) => {
        <h1>prop</h1>
        return <input type="checkbox" />;
      },
      style: {
        textAlign: 'center',
      },
      width: 100,
    },
    {
      Header: 'Actions',
      filterable: true,
      ReactTable: true,
      ReacTablePagination: true,
      loading: false,
      Cell: (props) => {
        return (
          <div className="action-coloum">
            <button
              type="button"
              style={{ background: 'red', color: '#fefefe' }}
              onClick={(e) => DeletePost(props.original.id)}
            >
              Delete
            </button>
          </div>
        );
      },
      width: 150,
      textAlign: 'center',
    }
  ];

  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        noDataText="No Data!"
        className="-highlight"
      />     
    </div>
  )
}
export default App;
