import { FETCH_ARTICLE, SEARCH_ARTICLES, UPDATE_SEARCH_PARAMS } from '../actions/types';

const initialState = {
  articles: [],
  article: {},
  page: 0,
  query: '',
};

const  ActionManagementHandler  = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        query: action.query,
        page: action.page,
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        article: action.article,
      };
    default:
      return state;
  }
}

export default ActionManagementHandler;