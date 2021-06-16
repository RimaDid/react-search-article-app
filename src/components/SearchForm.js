import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Article from './Article'
import { connect } from 'react-redux';
import { searchArticles, updateParams, fetchArticle } from '../actions/actions';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
      page: this.props.page,
      initilized: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onStoreDetailedArticle = this.onStoreDetailedArticle.bind(this);
  }
  paginateTo(page) {
    this.props.updateParams(this.state.query, page);
    this.props.searchArticles(this.props.query, page);
   }

 /**
  * 
  * @param {number} event
  * prev reflects the pagination direction previous/back page
  * next reflects the pagination direction next page
  */
  onPageChange(event) {
    let page = this.state.page;
    if ( event.target.name === 'prev') {
      page -=1;
    } else {
      page +=1;
    }
    this.setState({page: page}, ()=> (this.paginateTo(page)));
    
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value },()=> (this.props.updateParams(this.state.query, this.state.page)));
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.searchArticles(this.props.query, this.props.page);
    this.setState({initilized: true});
  }
  onStoreDetailedArticle(article) {
    this.props.fetchArticle(article);
  }

  formatUriToRouter(uri) {
    return uri.replace('nyt:/', '');
  }
  
  render() {
    return (
      <>
        <form className='search-form' onSubmit={this.onSubmit}>
          <div className='form-control'>
            <label>Search</label>
            <div className="input-group">
            <input
              type='text'
              name='query'
              placeholder='Search articles'
              value={this.state.query}
              onChange={this.onChange}
            />
          <button type='submit' className='btn'>Search</button>
            </div>
          </div>
        </form>
        { this.props.articles && this.props.articles.length > 0 ? (
          <div>
            <h3>Results: </h3>
            {this.props.articles.map((article, index) => (
              <Article key={index} article={article} onFormatRoute={this.formatUriToRouter} onStoreDetailedArticle={this.onStoreDetailedArticle}/>
            ))}
            <div className="pagination">
            <button type='button' name='prev' className='btn btn-link' disabled={this.state.page === 0} onClick={this.onPageChange}>Prev page</button>
            <span>{this.state.page+1}</span>
            <button type='button' name='next' className='btn btn-link' onClick={this.onPageChange}>Next page</button>
            </div>
          </div>
        ) : (
          <>
            {this.state.initilized && <p>There is no article available that contains <b>{this.state.query}</b></p>}
          </>
        )}
      </>
    )
  }
}
SearchForm.propTypes = {
  searchArticles: PropTypes.func.isRequired,
  updateParams: PropTypes.func.isRequired,
  fetchArticle: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  query: PropTypes.string,
};

const mapStateToProps = (state) => ({
  articles: state.data.articles,
  page: state.data.page,
  query: state.data.query,
  article: state.data.article,
})
export default connect(mapStateToProps, { searchArticles, updateParams, fetchArticle })(SearchForm)
