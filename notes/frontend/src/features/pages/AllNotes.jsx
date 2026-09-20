import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewNotes from './NewNotes';

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null); // Track karne ke liye ki konsa note update ho raha hai

  const getNotes = async () => {
    const { data } = await axios.get("https://notes-maker-cbi7.onrender.com/api/notes");
    setNotes(data.allnotes || []);
  };

  const handleDelete = async (id) => {
    await axios.delete("https://notes-maker-cbi7.onrender.com/api/delete/" + id);
    getNotes();
  };

  // Note ko update API par send karne ke liye helper function
  const handleUpdate = async (id) => {
    await axios.patch("https://notes-maker-cbi7.onrender.com/api/update/" + id, { title, description });
    setTitle("");
    setDescription("");
    setEditId(null);
    getNotes();
  };

  // Jab user card ke "Update" button par click karega
  const getUpdate = async (id) => {
    const { data } = await axios.get("https://notes-maker-cbi7.onrender.com/api/note/" + id);
    setTitle(data.note.title);
    setDescription(data.note.description);
    setEditId(id); // editId set karein taaki NewNotes form handle kar sake
    
    // Smooth scroll back to form (mobile par bohot help karta hai)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      {/* Form passes editId and handleUpdate if editing */}
      <NewNotes 
        getNotes={getNotes} 
        title={title} 
        description={description} 
        setDescription={setDescription} 
        setTitle={setTitle}
        editId={editId}
        handleUpdate={handleUpdate}
      />
      
      {/* Responsive Container: Mobile par auto grid, nice spacing */}
      <div className='flex flex-wrap flex-col-reverse gap-10 items-center justify-center bg-black'>
        {
          notes.map((note, idx) => {
            return (
              // Mobile aur desktop dono par stable widths aur heights ke liye classes
              <div key={idx} className='bg-amber-200 w-[80%] h-fit rounded-2xl p-6 flex flex-col justify-between shadow-lg  sm:p-8'>
                <div>
                  {/* Text sizes ko responsive kiya taaki mobile screen se bahar na bhaage */}
                  <h2 className='font-bold text-2xl sm:text-3xl text-center text-gray-900 wrap-break-word mb-3'>{note.title}</h2>
                  <p className='text-blue-600 text-lg sm:text-xl text-center wrap-break-word'>{note.description}</p>
                </div>
                
                {/* Buttons wrapper: perfectly aligned */}
                <div className="flex flex-wrap gap-4 w-full mt-6 justify-center">
                  <button 
                    onClick={() => getUpdate(note._id)} 
                    className='bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl px-20 py-3 text-sm sm:text-base active:scale-95 duration-100'
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(note._id)} 
                    className='bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl px-20 py-3 text-sm sm:text-base active:scale-95 duration-100'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default AllNotes
