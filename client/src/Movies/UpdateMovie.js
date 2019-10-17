import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {

        axios 
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log('axios get request error', err));
    }, [props.match.params.id])

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === 'stars') {
            value = value.split(',')
        };
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.history.push(`/movies/${movie.id}`);
            })
            .catch(err => console.log('put request error', err));
    };

    return (
        <div className='movie-form'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    placeholder='Movie Title'
                    value={movie.title}
                    onChange={changeHandler}
                />
                 <input 
                    type='text'
                    name='director'
                    placeholder='Movie Director'
                    value={movie.director}
                    onChange={changeHandler}
                /> 
                <input 
                    type='text'
                    name='metascore'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={changeHandler}
                /> 
                <input 
                    type='text'
                    name='stars'
                    placeholder='Movie Star (separated by commas)'
                    value={movie.stars.toString()}
                    onChange={changeHandler}
                />
                <button className='update-btn'>Update</button>
            </form>
        </div>
    )
};

export default UpdateMovie;