import { fetchData } from "../../modules"
import "./style.scss"
const Navbar = (props) => {
    return (<nav class="navbar shadow shadow-lg navbar-expand-lg text-white navbar-dark  bg-primary">
        <a class="navbar-brand" href="#">Zeta Marketplace</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#add-server/new">Add Server</a>
                </li>
                {<li class="nav-item">
                    <a class="nav-link" href="#all-servers">All Servers</a>
                </li>
                }

            </ul>
            <ul class="navbar-nav ml-auto">
                <li className="text-white nav-item mt-2 ml-1">
                    <a className="text-white" href={undefined}>{props.userInfo.username}
                        <i onClick={() => {
                            if (window.confirm("Are sure you want to logout?")) {
                                fetchData("/api/logout").then((res) => window.location.reload())
                            }
                        }} class="fa fa-sign-out ml-1" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div> */}
    </nav>)
}

export default Navbar