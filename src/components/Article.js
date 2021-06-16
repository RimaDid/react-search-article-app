import { useHistory } from "react-router-dom";


const ArticleSearchResult = ({ article, onFormatRoute, onStoreDetailedArticle }) => {
    const history = useHistory();
  
    function handleNavigation() {
      onStoreDetailedArticle(article);
      history.push(`${onFormatRoute(article.uri)}`);
    }
  return (
    <div className={`article`} >
      <button type="button" className='btn btn-link' onClick={handleNavigation} >{article.title}{' '}</button>
    </div>
  )
}

export default ArticleSearchResult
