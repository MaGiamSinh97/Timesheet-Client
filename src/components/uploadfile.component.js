import React from "react";
import { post } from "axios";
class Fileupload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
    };
  }
  async submit(e) {
    e.preventDefault();
    const url = `https://localhost:44355/api/Uploadfiles/ImportFile`;
    const formData = new FormData();
    formData.append("file", this.state.file);
    if(this.state.file === ""){
      alert("please select file");
      return
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config).then((res) => {
      if (res.status === 200){
        alert("Import success");
        window.location.reload();
      }
      else{
        alert("Import fail");
      }

    });
  }
  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }
  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={(e) => this.submit(e)}>
          <div className="col-sm-12 btn btn-primary">File Upload</div>
          <h1>File Upload</h1>
          <input type="file" accept=".xlsx" onChange={(e) => this.setFile(e)} />
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>       
      </div>
    );
  }
}
export default Fileupload;
