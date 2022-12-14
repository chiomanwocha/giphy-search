import { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Loader from './assets/icons/Loader';
import Header from './Header'
import { Link } from 'react-router-dom'
import '../css/main.css';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const Main = () => {
    const {REACT_APP_API_KEY: API_KEY} = process.env
    const [query, setQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [empty, setEmpty] = useState(false)

    const onError = () => {
        setErrorMessage('Oopsie Woopsie.. No results found')
    }
    const {data, status, refetch} = useQuery('giphy', () => {
        return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=0&rating=g&lang=en`)
    },
    {
        onError,
        enabled: false,
        refetchOnWindowFocus: true
    })

    const removeFocus = () => {
        const input = document.getElementById('inputBar')
        input.blur()
    }

    const clearInput = () => {
        setQuery('')
        const input = document.getElementById('inputBar')
        input.focus()
    }

    const search = (e) => {
        e.preventDefault();
        if(query.trim().length === 0){
            setErrorMessage('Please type something, search input can not be empty')
            setEmpty(true)
        } else{
            setEmpty(false)
            refetch()
        }
    }
    return (  
        <div>
            <Header></Header>
                <Search search={search} query={(e) => setQuery(e.target.value)} queryInput={query} placeholder="type something .." onClick={removeFocus} clearInput={clearInput}></Search>
                {empty && <p className="error">{errorMessage}</p>}
            <div className="display">
                {status === 'loading' && <Loader />}
                    <div>
                        {status === 'error' && <p className="error">{errorMessage}</p>}
                                 <div>
                                    {status === 'success' && 
                                        <div className="result-container">
                                            {data?.data.data.map((data) => (
                                             <div key={data.id} className="img-container">
                                                <Link to={`/${data.id}`} >
                                                    <img src={data.images.original.url} alt={data.title}/>
                                                </Link>
                                            </div>
                                        ))}
                                        </div>
                                    }
                                </div>
                    </div>
            </div>
            < ReactQueryDevtools />
        </div>
    );
}
 
export default Main;


