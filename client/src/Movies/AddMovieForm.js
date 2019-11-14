import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = props => {
    const [formState, setFormState] = useState({
        id: null,
        title: '',
        director: '',
        metascore: '',
        stars: [] 
    });

    const handleChanges = e => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const addMovie = e => {
        e.preventDefault();
        const { title, director, metascore, stars } = formState;
        const newMovie = { title, director, metascore, stars };

        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(res => props.history.push('/'))
            .catch(err => console.log(err))
    };

    return (
        <form>
            <div className='title-form'>
                <h3>Title</h3>
                <input className='addMovie-input' 
                    name='title'
                    placeholder= 'Movie Title'
                    value={formState.title}
                    onChange={handleChanges}
                    type='text'
                />
            </div>
            <div className='director-form'>
                <h3>Director</h3>
                <input className='addMovie-input' 
                    name='director'
                    placeholder= 'Director'
                    value={formState.director}
                    onChange={handleChanges}
                    type='text'
                />
            </div>
            <div className='metascore-form'>
                <h3>Metascore</h3>
                <input className='addMovie-input' 
                    name='metascore'
                    placeholder= 'Metascore'
                    value={formState.metascore}
                    onChange={handleChanges}
                    type='text'
                />
            </div>
            <div className='stars-form'>
                <h3>Stars</h3>
                <input className='addMovie-input' 
                    name='stars'
                    placeholder= 'Actors'
                    value={formState.stars}
                    onChange={handleChanges}
                    type='text'
                />
            </div>
            <button onClick={addMovie}>Add Movie</button>
        </form>
    )
};

export default AddMovieForm;