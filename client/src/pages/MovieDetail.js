import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
    const [details, setDetails] = useState({});
    const { movieId } = useParams();

    useEffect(() => {
        getMovieDetails();
    }, [])

    const getMovieDetails = async () => {
        const response = await axios({
            url: `http://localhost:4000/movies/${movieId}`,
            method: 'get'
        });

        setDetails(response.data);
    }

    return (
        <div>
            Movie Detail Page
            <p>{details.title}</p>
           
        </div>
    )
}

export default MovieDetail
