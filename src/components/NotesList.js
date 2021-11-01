import axios from 'axios';
import { format } from 'timeago.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BG from '../assets/images/note-list.jpg'

const NotesList = () => {

  const [notes, setNotes] = useState([]);
  const [colors, setColors] = useState('');
  const [search, setSearch] = useState('');



  const random = () => {

    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setColors(color);
  }

  const deleteNote = async (id) => {
    await axios.delete(`https://enigmatic-spire-78063.herokuapp.com/api/notes/${id}`);
    getNotes();
  }

  const getNotes = async () => {
    await axios.get("https://enigmatic-spire-78063.herokuapp.com/api/notes")
      .then(res => {
        setNotes(res.data);

      })
      .catch(error => {
        console.log('Get notes error', error);
      })
  }



  // const getFilterNotes = async () => {
  //   const res = await axios.get(`http://localhost:4000/api/notes/${search}`)
  //   setNotesList(res.data);
  //   notesList.filter((note) => {
  //     return note.description.toLowerCase().indexOf(search.toLowerCase()) > -1
  //   })
  // }

  // function filterNotes() {
  //   return notesList.filter((note) => note.description.toLowerCase().indexOf(search.toLowerCase()) > -1);
  // }

  useEffect(() => {
    getNotes();
    random();
  }, []);




  return (
    <div className="container-note-list" style={{ backgroundImage: `url(${BG})` }}>
      <div className="notes-list">
        <div className="notes-list__header">
          All Notes
        </div>
        <div className="form-group search-note">
          <input
            type="text"
            className="form-control  col-sm-5"
            placeholder="Search Note"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="row notes-list_list">
          {
            notes.filter((note) => note.title.includes(search.toLowerCase())).map(note => (
              <div key={note._id} className="col-md-4 p-4">
                <div className="card scale-up-center" >
                  <div className="card-header" style={{ backgroundColor: colors }}>
                    <div className="note-list__title">{note.title}</div>
                  </div>
                  <div className="card-body">
                    <div className="card-content">
                      <p>
                        <FontAwesomeIcon
                          className="asterisk-icon"
                          icon={faAsterisk}
                          style={{ color: colors }}
                        />
                        {note.description}</p>
                      <p>
                        <span className="info-card">Author: </span>{note.author}
                      </p>
                      <p>
                        <span className="info-card">Date: </span>{format(note.date)}
                      </p>
                    </div>
                  </div>
                  <div className="card-foot">
                    <Link
                      to={`/edit/${note._id}`}
                      className="btn"
                    >
                      <FontAwesomeIcon
                        className="icon-edit"
                        icon={faEdit}
                        style={{ color: colors }}
                      />
                    </Link>
                    <button
                      className="btn"
                      onClick={() => deleteNote(note._id)}
                    >
                      <FontAwesomeIcon
                        className="icon-trash"
                        icon={faTrash}
                        style={{ color: colors }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}


export default NotesList;
