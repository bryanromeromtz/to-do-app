import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import BG from '../assets/images/bg-user.png';



class CreateUser extends Component {

  state = {
    users: [],
    username: '',
    isLoad: true
  }

  componentDidMount() {
    this.getUsers()
  }

  handleSubmitCreateUser = async e => {
    e.preventDefault();
    await axios.post("https://enigmatic-spire-78063.herokuapp.com/api/users", {
      username: this.state.username
    }).then(res => {
      console.log(this.state.username);
      console.log(res.data.username);
    })
      .catch(error => {
        console.log('error in create user component', error);
      })
    this.setState({
      username: ""
    });
    this.getUsers();
  }

  handleChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  getUsers = async () => {
    const res = await axios.get("https://enigmatic-spire-78063.herokuapp.com/api/users");
    this.setState({ users: res.data })
    if (this.state.users === res.data) {
      this.setState({ isLoad: false })
    }
  }

  deleteUser = async id => {
    await axios.delete(`https://enigmatic-spire-78063.herokuapp.com/api/users/${id}`);
    this.getUsers();
  }


  render() {
    return (
      <div className="container-create-user" style={{ backgroundImage: `url(${BG})` }}>
        <div className="row create-user">
          <div className="col-md-4 position-user-content">
            <div className="card card-body card-user">
              <h3 className="create-user__title">Create New User</h3>
              <form
                className="form-user"
                onSubmit={this.handleSubmitCreateUser}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.handleChangeUsername}
                  />
                </div>
                <button
                  type="submit"
                  className="btn save-user-btn"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-5 position-user-content-2">
            {
              this.state.isLoad ?
                <div className="loading">
                  <h2>Loading</h2>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                :
                <ul className="list-group">
                  {
                    this.state.users.map(user => (

                      <li
                        className="list-group-item list-group-item-action user-list"
                        key={user._id}
                      >
                        Hello {user.username}
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-del-user"
                          onClick={() => this.deleteUser(user._id)}
                        />
                      </li>

                    ))
                  }
                </ul>
            }
          </div>
        </div >
      </div>
    )
  }
}

export default CreateUser