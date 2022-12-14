import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import Loader from './assets/icons/Loader';
import { Link } from 'react-router-dom';
import '../css/single-result.css'
import { useQuery } from 'react-query';

const SingleResult = () => {
    const params = useParams()
    const {REACT_APP_API_KEY: API_KEY} = process.env

    const {data, status, error, isFetching} = useQuery('singleGiphy', () => {
        return axios.get(`https://api.giphy.com/v1/gifs/${params.id}?api_key=${API_KEY}`)
    },{
        refetchOnWindowFocus: false
    })
    
    return ( 
        <div>
            <Header></Header>
            <div className="result-body">
                {(status === 'loading' || isFetching) && <Loader></Loader>}
                {status === 'error' && <p className="error">{error?.message}, please try again.</p>}
                {(status === 'success' && !isFetching) &&
                    <div className='giphy-details'>
                        <div className="giphy-img">
                            <img src={data?.data.data.images.original.url} alt={data?.data.data.title} />
                        </div>
                        <div className="details">
                            <h3>{data?.data.data.title}</h3>
                            <p>Source: <a href={data?.data.data.url} target="_blank">{data?.data.data.url}</a></p>
                            <p>MPAA rating: <span>{data?.data.data.rating}</span></p>
                            <p>Type: <span>{data?.data.data.type}</span></p>
                            <p>Created on: <span>{data?.data.data.import_datetime}</span></p>
                            <Link to={`/`}><button className="details-button">Go Back</button></Link>
                        </div>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default SingleResult;