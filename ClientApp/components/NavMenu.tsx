import * as React from "react";
import { Link } from "react-router";

export class NavMenu extends React.Component<void, void> {
    public render() {
        return <div className="main-nav">
                <div className="navbar navbar-inverse">
                <div className="navbar-header">
                    <button type="button"
                            className="navbar-toggle"
                            data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={ "/" }>
                        <span className="glyphicon glyphicon-home"></span>
                        Home
                    </Link>
                </div>
                <div className="clearfix"></div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={ "/" } activeClassName="active">
                                <span className="glyphicon glyphicon-home"></span> Home
                            </Link>
                        </li>
                        <li>
                            <Link to={ "/citylistpage" } activeClassName="active">
                                <span className="glyphicon glyphicon-cloud"></span> Weather Conditions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
