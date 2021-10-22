import axios from 'axios';
import { format } from 'timeago.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';


const NotesList = () => {

  const [notes, setNotes] = useState([]);

  let [colors, setColors] = useState('');

  const countRender = useRef(0);


  const randomColors = useCallback(() => {
    let char = "0123456789abcdef";
    let colorLength = 6;
    for (let i = 0; i < colorLength; i++) {
      let randomColor = Math.floor(Math.random() * char.length);
      colors += char.substring(randomColor, randomColor + 1);
    }
    setColors(`#${colors}`);
  }, []);


  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:4000/api/notes/${id}`);
    getNotes();
  }

  const getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes");
    setNotes(res.data);
  }



  useEffect(() => {
    if (countRender === 0) {
      countRender = countRender + 1;
      return
    }
    getNotes();
    randomColors();
  }, [randomColors]);




  return (
    <div className="notes-list">
      <div className="notes-list__title">
        All Notes
      </div>
      <div className="row">
        {
          notes.map(note => (
            <div key={note._id} className="col-md-3 p-4">
              <div className="card scale-up-center" >
                <div className="card-header" style={{ backgroundColor: colors }}>
                  <div>{note.title}</div>
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
                      <FontAwesomeIcon
                        className="asterisk-icon"
                        icon={faAsterisk}
                        style={{ color: colors }}
                      />
                      {note.author}</p>
                    <p>
                      <FontAwesomeIcon
                        className="asterisk-icon"
                        icon={faAsterisk}
                        style={{ color: colors }}
                      />
                      {format(note.date)}</p>
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
  )
}


export default NotesList;
