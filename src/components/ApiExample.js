import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies,
        setMovies] = useState([]);
    const [loading,
        setLoading] = useState(true);
    const [error,
        setError] = useState(null);
    const [searchQuery,
        setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        sort_by: 'popularity.desc',
                        api_key: '15005c48f2625def09dacd3d0fc01762',
                        page: 1
                    }
                });
                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async() => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '15005c48f2625def09dacd3d0fc01762',
                    query: searchQuery,
                    page: 1
                }
            });

            setMovies(response.data.results);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === '') {
            fetchData();
        } else {
            handleSearch();
        }
    };

    const fetchData = async() => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                params: {
                    sort_by: 'popularity.desc',
                    api_key: '15005c48f2625def09dacd3d0fc01762',
                    page: 1
                }
            });
            setMovies(response.data.results);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const IMG_Path = 'https://image.tmdb.org/t/p/w1280';

    return (
        <div>
            <div className='center'>
                <form>
                    <input
                        type="text"
                        className='form-control'
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Search for a movie..."
                        required/>
                </form>
                <p style={{
                    display: 'block'
                }}>
                    Aramak istediğiniz filmi giriniz
                </p>

            </div>

            <div className='d-flex'>
                {movies.map(movie => (
                    <div className='box' key={movie.id}>
                        <div className='box-img'>
                            <img src={`${IMG_Path}${movie.poster_path}`} alt={movie.title}/>
                        </div>
                        <div className='movie-title'>
                            <h3>{movie.title}</h3>
                        </div>
                        <div className='box-content'>
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
