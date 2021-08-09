import React from "react";
import "./style.scss";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../../modules";
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       allProjects: this.props.allProjects || [],
       currProj:this.props.allProjects.filter((proj)=>proj.projId === this.props.match.params.id)[0]
    };
  }
  
  title = "Imagine a Lengthy Name for Project Here";
  author = "Sarthak";
  techStack = "MERN";
  version = "1.01";
  render() {
    let {currProj} = this.state
    return (
      <div className="proj mt-5">
        <div className="container p-0">
          <div className="row">
            <div className="col-9 left-menu">
              <div className="row">
                <nav aria-label="breadcrumb" className="col-12 mx-1">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">All Projects </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {currProj.title}
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-3 logo-col">
                  <img src = {currProj.logo}  className="fab fa-node-js text-info fa-6x"></img>
                </div>
                <div className="col-9 mt-2">
                  <div className="row">
                    <h3 className="title">{currProj.title}</h3>
                  </div>
                  <div className="row authorName">by {currProj.author}</div>
                  <div className="row version">
                    Version {currProj.version}
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm p-0 px-1 techStack"
                    >
                      {currProj.techStack}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <ReactMarkdown>{currProj.readme}</ReactMarkdown>
            </div>
            <div className="col-3 right-menu mt-5 pt-4">
              <div className="row download-row">
                <a href = {`${BASE_URL}/download/${currProj.projId}`} className="btn btn-primary">
                  Download Zip <i class="fas fa-download"></i>
                </a>
              </div>
              <div className="row mt-5">
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td>Downloads</td>
                      <td>{currProj.totalDownloads}</td>
                    </tr>
                    <tr>
                      <td>Version</td>
                      <td>{currProj.version}</td>
                    </tr>
                    <tr>
                      <td>File Size</td>
                      <td>{currProj.fileSize}</td>
                    </tr>
                    <tr>
                      <td>Last Published</td>
                      <td>{currProj.updatedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>
      </div>
    );
  }
}
export default Project;
