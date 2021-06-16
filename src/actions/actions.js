import { FETCH_ARTICLE, SEARCH_ARTICLES, UPDATE_SEARCH_PARAMS } from './types';

export const fetchArticle = (article) => (dispatch) => {
  console.log("fetch article")
      dispatch({
        type: FETCH_ARTICLE,
        article,
      });
};
export const updateParams = (query, page) => (dispatch) => {
      dispatch({
        type: UPDATE_SEARCH_PARAMS,
        page,
        query,
      });
};

export const searchArticles = (query, page) => (dispatch) => {
  const searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=GBy9dGM8qJG4ezooGuDDm3ZWOWDTj3xN`;
  fetch(searchUrl)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log('data', jsonData.response.docs)
      const articles = jsonData.response.docs.map(({web_url, lead_paragraph, headline, pub_date, uri}) =>({web_url, lead_paragraph, title: headline.main, pub_date, uri}));
      dispatch({
        type: SEARCH_ARTICLES,
        articles,
        page,
        query,
      })
    });
};

