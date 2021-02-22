import React , { Fragment , useState , useEffect } from 'react'
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import '../components/layouts/Search'
import MetaData from '../components/layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import {useDispatch , useSelector} from 'react-redux'
import { useAlert } from 'react-alert' ;
import {getProducts} from '../actions/productActions';
import { useParams } from 'react-router-dom';

// const { createSliderwithTooltip } = Slider;

// const Range = createSliderwithTooltip(Slider.Range)

const Home = () => {
    
    // const [price,setPrice ] = useState([1 , 1000]);
    const [currentPage , setCurrentPage] = useState(1)
    
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const {loading , products , error, productsCount, resPerPage} = useSelector(state => state.products)
    
    const params = useParams()
    const keyword = params.keyword

    useEffect(() => {
        if(error){
            return alert.error(error)
        }
        
        dispatch(getProducts(keyword ,currentPage))
    }, [dispatch , alert ,error ,keyword, currentPage])
    
    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title = {'Home'}/>
                        <h1 id="products_heading">Latest Products</h1>
                        <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product key = {product._id} product={product}/>
                            ))}   
                        </div>
                    </section>
                    {resPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage = {currentPage}
                            itemsCountPerPage = {resPerPage}
                            totalItemsCount = {productsCount}
                            onChange = {setCurrentPageNo}
                            nextPageText = {'Next'}
                            prevPageText = {'Prev'}
                            firstPageText = {'First'}
                            lastPageText = {'last'}
                            itemClass = "page-item"
                            linkClass = "page-link"                      />
                    </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
    
}

export default Home
