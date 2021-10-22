import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar-header navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand navbar-home" to="/">DOISM</Link>
          <button className="navbar-toggler hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon hamburger">
              <FontAwesomeIcon icon={faBars} />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link active cornflowerblue" to="/">Notes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link darkviolet" to="/create">Create Note</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link yellow" to="/user">Create User</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    )
  }
}

export default Navigation;
