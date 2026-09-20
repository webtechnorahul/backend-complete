import React from 'react'
import axios from "axios"

const NewNotes = ({ getNotes, title, description, setTitle, setDescription }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear inputs after submit to improve UX (Optional but good)
        await axios.post("https://notes-maker-cbi7.onrender.com/api/add", { title, description });
        setTitle("");
        setDescription("");
        getNotes();
    }

    return (
        // Mobile par full screen height, desktop par clean padding
        <div className='bg-black min-h-screen grid place-items-center p-4 sm:p-6'>
            
            <form 
                onSubmit={handleSubmit} 
                // Mobile par width full (w-full), max-width md screen tak restricted (max-w-md), responsive padding
                className='w-full max-w-md h-fit text-start rounded flex flex-col gap-5 bg-[rgb(200,200,10)] py-8 px-6 sm:px-12 sm:py-10'
            >
                <h2 className="text-xl font-bold text-black text-center sm:text-left">Create New Note</h2>

                <input 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title || ""} // Form state fallback to prevent undefined error
                    className='w-full border-2 px-4 py-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black' 
                    type='text' 
                    placeholder='Enter title' 
                    id='title'
                    required
                />

                <textarea 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description || ""} // Form state fallback
                    // Fixed max-h, rows plural, and added scrollbar hiding tricks
                    className='w-full max-h-62.5 overflow-y-auto py-2 border-2 border-black px-4 rounded focus:outline-none focus:ring-2 focus:ring-black [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none' 
                    cols={30} 
                    rows={6} // Mobile ke liye 6 rows standard aur responsive lagta hai
                    placeholder='Description'
                    required
                />

                <button 
                    type="submit"
                    className='bg-green-400 w-full text-center font-semibold rounded py-2.5 px-5 active:scale-95 duration-100 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none'
                >
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default NewNotes
