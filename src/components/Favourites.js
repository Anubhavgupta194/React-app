import React, { Component } from 'react'
import { movies } from './Getmovies'

export default class Favourites extends Component {
  constructor(){
    super()
    this.state ={
      genre:[],
      currentgen:'All genere',
      movies:[],
      currText:'',
      limit:5,
      currPage:1

    }
  }
componentDidMount(){
  
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 
    10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
     9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
     let data=JSON.parse(localStorage.getItem("movie")||"[]")


     let temp=[]
          data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
              temp.push(genreids[movieObj.genre_ids[0]])
            }
          })
          temp.unshift('All genere');
          console.log(temp) 
          this.setState({
           genre:[...temp],
           movies:[...data]
          })

}
handleGenreChange=(genre)=>{
  this.setState({
      currentgen:genre
  })
}
sortPopularityDesc=()=>{
  let temp = this.state.movies;
  temp.sort(function(objA,objB){
      return objB.popularity-objA.popularity
  })
  this.setState({
      movies:[...temp]
  })
}
sortPopularityAsc=()=>{
  let temp = this.state.movies;
  temp.sort(function(objA,objB){
      return objA.popularity-objB.popularity
  })
  this.setState({
      movies:[...temp]
  })
}

sortRatingDesc=()=>{
  let temp = this.state.movies;
  temp.sort(function(objA,objB){
      return objB.vote_average-objA.vote_average
  })
  this.setState({
      movies:[...temp]
  })
}
sortRatingAsc=()=>{
  let temp = this.state.movies;
  temp.sort(function(objA,objB){
      return objA.vote_average-objB.vote_average
  })
  this.setState({
      movies:[...temp]
  })
}

handlePageChange=(page)=>{
  this.setState({
      currPage:page
  })
}

handleDelete=(id)=>{
  let newarr = [];
  newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
  this.setState({
      movies:[...newarr]
  })
  localStorage.setItem("movie",JSON.stringify(newarr))
}
  render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 
    10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
     9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
     let filterarr = [];

     if(this.state.currText===''){
      filterarr=this.state.movies
  }else{
    filterarr=this.state.movies.filter((movieObj)=>{
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
    })
}
        // if(this.state.currentgen=='All genere'){
        //     filterarr=this.state.movies
        // }
        if(this.state.currentgen!="All genere"){
           filterarr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currentgen)
        }

        let pages = Math.ceil(filterarr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterarr = filterarr.slice(si,ei);
    
    return (
      <>
     <div>
          <div className='row'>


            <div className='col-lg-3 col-sm-12'>
              <ul class="list-group favourite-geners">
                {

                this.state.genre.map((genere)=>(
                  this.state.currentgen==genere?
                     <li class="list-group-item" style={{background:'#3867d6',color:'white',fontWeight:'bold'}}>{genere}</li>:
                     <li class="list-group-item" style={{background:'white',color:'#3867d6'}}  onClick={()=>this.handleGenreChange(genere)} >{genere}</li>

                ))
              }
                
               
              </ul>

            </div>

            <div className='col-lg-9 input-cont col-sm-12' >
              <div className='input-div'>
                {/* <textarea class="form-control" placeholder='search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})} aria-label="With textarea" style={{ height: '1rem', width: '34rem', resize: 'none' }}    ></textarea> */}
                <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
              </div>
              <div >
                <table class="table fav-table">
                  <thead>
                    <tr>
                      <th scope="col">Tittle</th>
                      <th scope="col">Genere</th>
                      <th scope="col" ><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                      <th scope="col" ><i class="fa-solid fa-sort-up"  onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filterarr.map((movieObj) => (
                        <tr>
                          <td> <img style={{width:'5rem'}} src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.original_title}></img>{movieObj.original_title}</td>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                        </tr>

                      ))
                  }
                  </tbody>
                </table>

                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                   {
                  pagesarr.map((page)=>(
                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                ))
                  }
                     </ul>
                </nav>

              </div>

            </div>

          </div>
        </div>
      </>
    )
  }
}
