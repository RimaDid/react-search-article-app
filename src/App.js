import { BrowserRouter as Router, Route } from 'react-router-dom'

import DetailedArticlePage from './components/ArticlePage'
import SearchForm from './components/SearchForm'
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className='container'>
        <Route path='/' exact render={() => (
          <SearchForm />
        )} />
        <Route path='/article/:id' component={DetailedArticlePage} />
      </div>
    </Router>
    </Provider>
  )
}

export default App
