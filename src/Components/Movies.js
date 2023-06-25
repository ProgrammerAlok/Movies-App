import React, { Component } from 'react';
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: [],
        }
    }

    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9553443e073d4d040feae3e6f1252d04&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        // console.log(data)
        this.setState({
            movies: [...data.results],
        })
    }
    
    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9553443e073d4d040feae3e6f1252d04&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        this.setState({
            movies: [...data.results],
        })        
    }
    
    handleRight = () => {
        if(this.state.currPage === this.state.parr.length){
            let tempArr = [];
            for (let i = 1; i <= this.state.parr.length + 1; i++) {
                tempArr.push(i);
            }
            this.setState({
                parr: [...tempArr],
            });
        }          
        this.setState({
            currPage: 1 + this.state.currPage,
        }, this.changeMovies);              
    }

    handleLeft = () => {
        if(this.state.currPage==1) return;
        this.setState({
            currPage:  this.state.currPage - 1,
        }, this.changeMovies);        
    }

    handleClick = async (value) => {
        if(value === this.state.currPage) return; 
        this.setState({
            currPage: value,
        }, this.changeMovies)     
    }

    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
        if(this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((ele)=>ele.id!=movie.id);
        }
        else {
            oldData.push(movie);
        }
        console.log(oldData)
        localStorage.setItem('movies-app', JSON.stringify(oldData));
        this.handleFavouritesState();
    }
    
    handleFavouritesState = () => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites: [...temp],
        })
    }

    render() {
    return (
        <>
            {
                this.state.movies==''?

                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div> :

                <div >
                    <h3 className="text-center" > <strong>Trendings Movies</strong></h3>
                    <div className="movies-list">
                    {
                        this.state.movies.map((movieObj)=>(
                            <div 
                                className="card movies-card" 
                                onMouseEnter={()=>this.setState({hover: movieObj.id})} 
                                onMouseLeave={()=>this.setState({hover: ''})} 
                                key={movieObj.id}
                            >
                                <img 
                                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} 
                                    className="card-img-top movies-img" 
                                    style={{height:'40vh'}} 
                                    alt={movieObj.original_title} 
                                />
                                {/* <div className="card-body"> */}
                                    <h5 className="card-title movies-title">{movieObj.title}</h5>
                                    {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                    <div className="button-wrapper " style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                        {
                                            this.state.hover == movieObj.id &&
                                            <a 
                                            className="btn btn-primary movies-button"
                                            onClick={()=>this.handleFavourites(movieObj)}
                                            >{this.state.favourites.includes(movieObj.id)?'Remove from ':'Add to '} Favourite </a>
                                        }
                                    </div>
                                {/* </div> */}
                            </div>
                        ))
                    }
                    </div>
                    <div style={{ display:'flex', justifyContent:'center',}}>
                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={this.handleLeft }>Prev</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            <li className="page-item"><a className="page-link" onClick={this.handleRight }>Next</a></li>
                        </ul>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
  }
}

