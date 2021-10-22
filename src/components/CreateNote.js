import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';


class CreateNote extends Component {

  state = {
    users: [],
    userSelected: "",
    title: "",
    description: "",
    author: "",
    date: new Date(),
    isEdit: false,
    id: ""
  }


  async componentDidMount() {

    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0]
    });
    if (this.props.match.params.id) {
      const res = await axios.get(`http://localhost:4000/api/notes/${this.props.match.params.id}`);
      this.setState({
        title: res.data.title,
        description: res.data.description,
        userSelected: res.data.author,
        date: new Date(res.data.date),
        isEdit: true,
        id: this.props.match.params.id
      })
    }
  }

  handleSubmitCreateNote = async e => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.userSelected,
      date: this.state.date
    }
    await axios.post("http://localhost:4000/api/notes", newNote);
    this.props.history.push('/');
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeDate = date => {
    this.setState({
      date
    })
  }

  handleSubmitUpdateNote = async e => {
    e.preventDefault();
    const upadateNote = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.userSelected,
      date: this.state.date
    }
    await axios.put(`http://localhost:4000/api/notes/${this.state.id}`, upadateNote);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="create-note" >
        <div className="col-md-6 offset-md-3">
          <div className="card card-body form-note">
            <h4 className="create-note__title">Create New Note</h4>
            {/* SELECT USER */}
            <div className="form-group">
              <select
                className="form-control"
                name="userSelected"
                onChange={this.handleInputChange}
                value={this.state.userSelected}
              >
                {
                  this.state.users.map(user =>
                    <option
                      key={user}
                      value={user}
                    >
                      {user}
                    </option>
                  )
                }
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                onChange={this.handleInputChange}
                required
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                className="form-control"
                placeholder="Description"
                onChange={this.handleInputChange}
                maxLength="100"
                required
                value={this.state.description}
              ></textarea>
            </div>

            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.handleChangeDate}
              />
            </div>
            {
              this.state.isEdit ?
                <form onSubmit={this.handleSubmitUpdateNote}>
                  <button
                    className="btn create-note__btn"
                    type="submit"
                  >
                    Update Note
                  </button>
                </form>
                :
                <form onSubmit={this.handleSubmitCreateNote}>
                  <button
                    className="btn create-note__btn"
                    type="submit"
                  >
                    Create Note
                  </button>
                </form>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CreateNote
