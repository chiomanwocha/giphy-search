import '../css/search.css'
const Search = ({search, query, queryInput, placeholder}) => {
    return ( 
        <div className='search-header'>
            <h1>GIPHY</h1>
            <form className='search' onSubmit={search}>
                <input type="text" onChange={query} value={queryInput} placeholder={placeholder}/>
                <button>search</button>
            </form>
        </div>
     );
}
 
export default Search;