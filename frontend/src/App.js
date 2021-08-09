import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import Home from "./pages/home/blk"
import Preloader from "./components/loader/blk"
import "./App.scss"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/blk';
import { fetchData } from './modules';
import { ToastContainer, toast } from 'react-toastify';
import Project from './pages/project/blk';




class App extends React.Component {
  state = {
    allProjects: [],
    isInitialLoading: false,
  }

  componentDidMount() {

    // fetchData("/api/checkLogin").then((res) => {
    //   if (res.status === "ok") {
    //     this.setState({ userInfo: res.userInfo }, () => {
    //       fetchData("/api/allServerDetails").then((res) => {
    //         console.log(res.serverDetails)
    //         res.serverDetails.forEach((server) => {
    //           server.logs.sort((a, b) => (a.date_time > b.date_time) ? -1 : 1)
    //         })
    //         this.setState({ allServers: res.serverDetails }, () => {
    //         })
    //       }).catch((err) => {
    //         console.log(err)
    //         toast.error("Server Error")
    //       }).finally(() => this.setState({ isInitialLoading: false }))

    //     })
    //   }
    //   else {
    //     this.setState({ isInitialLoading: false })
    //   }

    // }).catch((err) => {
    //   toast.error("Server Error")
    //   console.log(JSON.stringify(err))
    // })
  }

  render() {
    if (this.state.isInitialLoading)
      return (<Preloader />)
    return (
      <Router>
        <HashRouter>
            <Navbar />
            <ToastContainer />
            <Switch>
              <Route exact path="/" render={(props) => <Home allProjects={this.state.allProjects}/>} />
              <Route path="/project/:id" render={(props) => <Project {...props} allProjects={this.state.allProjects} />} />
            </Switch>
        </HashRouter>

      </Router>
    )
  }
}

export default App;
