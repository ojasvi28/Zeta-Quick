import React from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { BASE_URL } from '../../modules';
import './style.css'
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allProjects:this.props.allProjects || [],
            filterProjs: this.props.allProjects || []

        }
    }
    search = (val) => {
        console.log(val)
        let filterProjs = [...this.state.allProjects].filter((proj) => {
            return (val === "" || !val || proj.title.toLowerCase().includes(val.toLowerCase()))
        })
        this.setState({ filterProjs })
    }
    render() {
        return (
            <div className="container">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div class="text-center s009">
                            <form onSubmit={this.submit} class="text-center">
                                <div class="inner-form">
                                    <div class="basic-search">
                                        <div class="input-field">
                                            <input onChange={(e) => this.search(e.target.value)} id="search" type="text" placeholder="Search Projects" />
                                            <div class="icon-wrap">
                                                <svg class="svg-inline--fa fa-search fa-w-16" fill="#ccc" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div className="mt-5 container">
                    <div className="row">
                        {this.state.filterProjs.map((value, index) => {
                            return <div class="col-md-4">
                                <div class="card profile-card-3 mb-3">
                                    <div class="background-block">
                                        <img src="https://dummyimage.com/650x940/5C2EA9/fff.png&text=Cryptx" alt="profile-sample1" class="background" />
                                    </div>
                                    <div class="profile-thumb-block">
                                        <img src={value.logo} alt="profile-image" class="profile" />
                                    </div>
                                    <div class="card-content">
                                        <h2>{value.title}<small>{value.description}</small></h2>
                                        <div class="icon-block">
                                            <a href={BASE_URL+"/download/" + value.projId}><i className="i fa fa-download"></i></a>
                                            <a href={"#/project/" + value.projId}><i className="i fa fa-eye"></i></a>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        })}

                    </div>
                </div>


            </div>
        )
    }
}
export default Home;