import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DetailedArticle extends Component {

  render() {
    return (
      <div >
      <Link to='/'>Go to results page</Link>
      <div className="detailed-article"></div>
      <h2 className="article-title">{this.props.article.title}</h2>
      <span className="article-date">{this.props.article.pub_date}</span>
      <p className="article-snippet">{this.props.article.lead_paragraph}</p>
      <Link to={this.props.article.web_url}>Read the full article</Link>
    </div>
    );
  }
}

DetailedArticle.propTypes = {
  article: PropTypes.object
};

const mapStateToProps = state => ({
  article: state.data.article
});

export default connect(mapStateToProps, {})(DetailedArticle);