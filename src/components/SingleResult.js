import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import Loader from './assets/icons/Loader';
import { Link } from 'react-router-dom';
import '../css/single-result.css'

const SingleResult = () => {
    const [giphy, setGiphy] = useState([])
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('')
    const params = useParams()
    const {REACT_APP_API_KEY: API_KEY} = process.env

    const fetch = async () => {
        setLoading(true);
        await axios
        .get(`https://api.giphy.com/v1/gifs/${params.id}?api_key=${API_KEY}`)
        .then(response => {
            if (response) {
                setGiphy(response.data.data)
                setImg(response.data.data.images.original.url)
            }
        })
        .finally(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        fetch()
    }, [])

    return ( 
        <div>
            <Header></Header>
            <div className="result-body">
                {loading?
                    <Loader></Loader>
                    :
                    <div className='giphy-details'>
                        <div className="giphy-img">
                            <img src={img} alt={giphy.title} />
                        </div>
                        <div className="details">
                            <h3>{giphy.title}</h3>
                            <p>Source: <a href={giphy.url} target="_blank">{giphy.url}</a></p>
                            <p>MPAA rating: <span>{giphy.rating}</span></p>
                            <p>Type: <span>{giphy.type}</span></p>
                            <p>Created on: <span>{giphy.import_datetime}</span></p>
                            <Link to={`/`}><button className="details-button">Go Back</button></Link>
                        </div>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default SingleResult;