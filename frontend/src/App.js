import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Header from '../src/components/layouts/Header'
import Footer from '../src/components/layouts/Footer'
import Home from '../src/components/Home'
import ProductDetails from './components/product/ProductDetails'

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <div className="container container-fluid" >
        <Route path="/" component = {Home} exact />
        <Route path="/product/:id" component = {ProductDetails} exact />
      </div>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;