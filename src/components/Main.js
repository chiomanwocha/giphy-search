import { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Loader from './assets/icons/Loader';
import Header from './Header'
import { Link } from 'react-router-dom'
import '../css/main.css';

const Main = () => {
    // const [query, setQuery] = useState(localStorage.getItem('query') || '');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(() => {
        const savedResults = localStorage.getItem('results')
        if(savedResults){
            return JSON.parse(savedResults)
        } else {
            return []
        }
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    
    const API_KEY = process.env.REACT_APP_API_KEY

    const getQueryValue = (e) => {
        setQuery(e.target.value);
    }
    const data = async () => {
        setLoading(true);
        // console.log(query);
        await axios
        .get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=0&rating=g&lang=en`)
        .then(response => {
            // console.log(response);
            if ((response.data.data).length === 0){
                setError('Oopsie Woopsie.. No results found')
                setShowError(true)
            } else{
                setShowError(false)
                setResults(response.data.data)
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setQuery('');
            setLoading(false)
        });
    };
    
    localStorage.setItem('results', JSON.stringify(results))

    const search = (e) => {
        e.preventDefault();
        // data(query);
        data()
        // localStorage.setItem('query', query)
    }
    
    // useEffect(() => {
    //     data(query);
    // }, []);

    return (  
        <div>
            <Header></Header>
            <Search search={search} query={getQueryValue} queryInput={query} placeholder="type something .."></Search>
            <div className="display">
                {loading ? 
                   <Loader />
                : 
                    <div>
                        {showError ?
                            <p className="error">{error}</p>
                            :
                            <div>
                                 <div className="result-container">
                                    {results.map((result) => (
                                        <div key={result.id} className="img-container">
                                            <Link to={`/${result.id}`} ><img src={result.images.original.url} alt={result.title}/></Link>
                                        </div>
                                    )  
                                    )}  
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}
 
export default Main;


