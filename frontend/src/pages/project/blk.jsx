import React from "react";
import "./style.scss";
import ReactMarkdown from "react-markdown";
class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // allProjects: this.props.allProjects || [],
    };
  }
  title = "Imagine a Lengthy Name for Project Here";
  author = "Sarthak";
  techStack = "MERN";
  version = "1.01";
  render() {
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
                      {this.title}
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-3 logo-col">
                  <i className="fab fa-node-js text-info fa-6x"></i>
                </div>
                <div className="col-9 mt-2">
                  <div className="row">
                    <h3 className="title">{this.title}</h3>
                  </div>
                  <div className="row authorName">by {this.author}</div>
                  <div className="row version">
                    Version {this.version}
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm p-0 px-1 techStack"
                    >
                      {this.techStack}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <ReactMarkdown># MarkDown *here*!</ReactMarkdown>
            </div>
            <div className="col-3 right-menu mt-5 pt-4">
              <div className="row download-row">
                <button className="btn btn-primary">
                  Download Zip <i class="fas fa-download"></i>
                </button>
              </div>
              <div className="row mt-5">
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td>Downloads</td>
                      <td>150,00,000</td>
                    </tr>
                    <tr>
                      <td>Version</td>
                      <td>{this.version}</td>
                    </tr>
                    <tr>
                      <td>File Size</td>
                      <td>2 MB</td>
                    </tr>
                    <tr>
                      <td>Last Published</td>
                      <td>8 months ago</td>
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
