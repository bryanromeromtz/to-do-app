import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class CreateUser extends Component {

  state = {
    users: [],
    username: ''
  }

  async componentDidMount() {
    await this.getUsers();
  }

  handleSubmitCreateUser = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", {
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
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data })
  }

  deleteUser = async id => {
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    this.getUsers();
  }



  render() {
    return (
      <div className="row create-user">
        <div className="col-md-4">
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
        <div className="col-md-5">
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
        </div>
      </div >
    )
  }
}

export default CreateUser