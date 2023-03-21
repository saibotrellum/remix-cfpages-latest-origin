import {AppContext} from "~/lib/contexts/App";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "@remix-run/react";
import classNames from "classnames";

export function Header(){
   return <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
            <AppContext.Consumer>
                {(app) => {
                    return (
                        <button
                            className="btn btn-primary"
                            id="sidebarToggle"
                            type="button"
                            onClick={() => app.toggleSidebar()}
                        >
                            Toggle Menu
                        </button>
                    );
                }}
            </AppContext.Consumer>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/contacts">
                                    Contacts
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item>
                                {/*   <AppContext.Consumer>
                      {(app) => {
                        return (
                          <Form
                            action={`/logout?redirectTo=${app.route.url?.pathname}`}
                            method="post"
                          >
                            <button type="submit" className="button">
                              Logout
                            </button>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={app.route.url?.pathname}
                            />
                          </Form>
                        );
                      }}
                    </AppContext.Consumer>*/}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    </nav>

}

export function Sidebar(){
    return <AppContext.Consumer>
        {(app) => {
            return (
                <div
                    className={classNames("border-end", "bg-white", {
                        "sb-sidenav-toggled": app.showSidebar,
                    })}
                    id="sidebar-wrapper"
                >
                    <div className="sidebar-heading border-bottom bg-light">
                        Start Bootstrap
                    </div>
                    <div className="list-group list-group-flush">
                        <a
                            className="list-group-item list-group-item-action list-group-item-light p-3"
                            href="#"
                        >
                            Dashboard
                        </a>{" "}
                        <a
                            className="list-group-item list-group-item-action list-group-item-light p-3"
                            href="#!"
                        >
                            Shortcut
                        </a>{" "}
                        <a
                            className="list-group-item list-group-item-action list-group-item-light p-3"
                            href="#!"
                        >
                            Overview
                        </a>{" "}
                        <a
                            className="list-group-item list-group-item-action list-group-item-light p-3"
                            href="#!"
                        >
                            Events
                        </a>{" "}
                        <a
                            className="list-group-item list-group-item-action list-group-item-light p-3"
                            href="#!"
                        >
                            Profile
                        </a>{" "}
                        <a
                            className="list-group-item list-group-item-action list-group-item-light p-3"
                            href="#!"
                        >
                            Status
                        </a>
                    </div>
                </div>
            );
        }}
    </AppContext.Consumer>

}


const expObj={}
export default expObj