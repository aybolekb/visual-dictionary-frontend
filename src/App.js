import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home  from './pages/home/Home'
import Add from './pages/Add/Add'
import Category from './pages/category/Category'

const App = () => {
  return(
     <Router>
       <Switch>
            <Route path='/' exact><Home/></Route>
            <Route path='/add' exact><Add/></Route>
            <Route path='/category' exact><Category/></Route>
       </Switch>
     </Router>
  )
}

export default App;  