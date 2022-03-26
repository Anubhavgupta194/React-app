import React, { Component } from 'react'
 import axios from 'axios';
export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hover:'',
      parr:[1],
      page:1,
      movie:[],
      favourite:localStorage.getItem("movie")||"[]",

    }

  }
    componentDidMount (){
    let res =  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3280320d8e1866c05967cdb6252ba86b&page=${this.state.page}`).then((res)=>{
     let data=res.data.results;
      this.setState({
        movie:[...data]
      })
    })
    }

   changemovie=async()=>{
    let res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3280320d8e1866c05967cdb6252ba86b&page=${this.state.page}`);
      this.setState({
        movie:[...res.data.results],
      })
    }
    handleright=async()=>{
      let temp=[]
      for(let i =1;i<=this.state.parr.length+1;i++)
      {
            temp.push(i);
      }
      this.setState({
        parr:[...temp],
        page:this.state.page+1,
      },this.changemovie)
    }
    handleLeft=()=>{
      if(this.state.page!=1){
          this.setState({
              page:this.state.page-1
          },this.changemovie)
      }
  }
  handleClick=(val)=>{
    if(val!=this.state.page)
    {this.setState({
      page:val,
    },this.changemovie)

    }
  }
  handlefav=(movieObj)=>{
       let old=JSON.parse(localStorage.getItem("movie")||"[]");
    if(this.state.favourite.includes(movieObj.id)){
              old=old.filter((m)=>m.id!=movieObj.id)
}                    
    else{old.push(movieObj);}
   localStorage.setItem("movie",JSON.stringify(old));
   console.log(old)
  //  this.handleFavouritesState();
  let temp = old.map((movie)=>movie.id);
    console.log(temp)
    this.setState({
        favourite:[...temp],
    } )
    console.log(this.state.favourite)
 
  //  let temp = old.map((movie)=>movie.id);

  //  this.setState({
  //      favourite:[...temp]
  //  })
  //  console.log(this.state.favourite)
  }
//   handleFavouritesState=()=>{
//     let oldData = JSON.parse(localStorage.getItem("movie") || "[]")
//     let temp = oldData.map((movie)=>movie.id);
//     console.log(temp)
//     this.setState({
//         favourite:[...temp],
//     })
//     console.log(this.state.favourite)
// }

   
  render() {
   
    return (
          <>
           {
        this.state.movie.length==0?
        <div class="spinner-border text-primary" role="status">
         <span class="visually-hidden">Loading...</span>
                  </div>:
                  <div>
                    <h3 className='text-center'><strong>Trending </strong></h3>
                    <div className='movie-list'>
                      {
                         this.state.movie.map((movieObj) => (
                          <div className="card movie-style" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                          <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title}  className="card-img-top movie-img"/>
                         
                            <h5 className="card-title movie-card-title">{movieObj.original_title}</h5>
                            
                            <div class="movie-button">
                              {  this.state.hover == movieObj.id &&
                                  <a  className="btn btn-primary" onClick={()=>this.handlefav(movieObj)}>{this.state.favourite.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</a>
                              }
                            </div>
                            
                         </div>
                         ))


                         } 
                  </div>
                  <div style={{ display:'flex',justifycontent:'center',marginLeft:'43vw'}}>
                  
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                    this.state.parr.map((value)=>(
                                    
                                        <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                    ))
                                }
                                          
                                          
                                          <li class="page-item"><a class="page-link" href="#" onClick={this.handleright}>Next</a></li>
                                        </ul>
                                  </nav>
                  
                  </div>
              </div>
                  
                  

      
        }
        </>
        )
  }
}
