import '../css/search.css'
import { Icon } from '@iconify/react';

const Search = ({search, query, queryInput, placeholder, onClick, clearInput}) => {
    return ( 
        <div className='search-header'>
            <h1>GIPHY</h1>
            <form className='search' onSubmit={search}>
                <div className="searchInput">
                    <div className="searchBar">
                        <input type="text" id="inputBar" onChange={query} value={queryInput} placeholder={placeholder} autoFocus/>
                        <button type="button" onClick={clearInput} className="clear"><Icon icon="material-symbols:close" /></button>
                    </div>
                </div>
                <button onClick={onClick}>search</button>
            </form>
        </div>
     );
}
 
export default Search;