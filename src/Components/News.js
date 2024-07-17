import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
export class News extends Component {  
      constructor(){
        super();
        console.log("constructor");
        this.state={
            articles:[],
            loading:false,
            page:1,
           
        }
      }
      async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbd04b53388b421c9d23b3a77287a466&page=1&pageSize=${this.props.pageSize}`;
      let data=  await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults
        })
      }
      handleNextClick = async () => {
        console.log("next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            return; // No more pages to fetch
        }
    
        this.setState({ loading: true });
    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbd04b53388b421c9d23b3a77287a466&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
    
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        });
    }
    
    handlePrevClick = async () => {
        if (this.state.page <= 1) {
            return; // Already on the first page
        }
    
        this.setState({ loading: true });
    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bbd04b53388b421c9d23b3a77287a466&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
    
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        });
    }
    
  render(){
    return (
        <div className='container my-3'>
          <div className='container my-3'>
            <h1 class="text-center" style={{margin:'90px 0px 50px 0px'}}>NewsMonkey-Top Headlines</h1>
            <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"  className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

      </div>
            </div>
           { this.state.loading &&<Spinner/>}
      <div className='row'>
      {this.state.articles.map((element)=>
            {
                
            
        return  <div className='col-md-4' key={element.url}>
        <Newsitem   title={element.title} description={element.description} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
      </div> })}
      </div>
      <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"  className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

      </div>
      </div>
    )
  }}
  export default News;
