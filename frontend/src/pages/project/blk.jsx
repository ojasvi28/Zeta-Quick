import React from "react"
import "./style.scss"
import ReactMarkdown from 'react-markdown'
class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allProjects: this.props.allProjects || [],
        }
    }

    render() {
        return (
            <div className="proj mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <p><u className="h3">Project Title</u></p>
                                <p><span className="badge ml-5 mr-3 badge-success">1.0.1</span> •   Published 8 months ago •  <i style={{ fontSize: 30 }} class="fab ml-3  text-success fa-node-js"></i></p>
                            </div>
                            <hr />
                            <ReactMarkdown># Hello, *world*!</ReactMarkdown>
                        </div>
                        <div className="col-4">
                            <p><span> <button className="btn btn-primary">Download Zip</button></span><span className=" ml-2 text-muted">Total Downloads: 750</span></p>
                            {/* <p className="mt-2 text-muted">Total Downloads: 750</p> */}

                        </div>
                    </div>
                    <div className="row">
               
                    </div>
                </div>

            </div >
        )
    }
}
export default Project
