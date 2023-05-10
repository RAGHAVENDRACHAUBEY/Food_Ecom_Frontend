import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/fooddetail.css";
// import products from './fakedata/products';
import Helmet from "./Helmet/Helmet";
// import Commonsection from "./CommonSection/Commonsection";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
// import { cartActions } from "./Store/ShopingCart/cartSlice";
// import { useDispatch } from "react-redux";
import axios from "axios";
import {useSelector, useDispatch } from "react-redux";

function FoodDetails() {
  const [singleproduct, setsingleprodcut] = useState({});
  // console.log(singleproduct)
  // All Category

  const { id } = useParams();

  const [image, setImage] = useState("");

  const singleProdcut = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/singleproduct/" + id)
      .then(function (response) {
        // console.log(response.data);
        setsingleprodcut(response.data.product);
        setImage(response.data.product?.productimage);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const [products, setproducts] = useState([]);
  console.log(products);
  const getProdcut = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/allproduct/")
      .then(function (response) {
        // handle success
        // console.log(response.data.product);
        setproducts(response.data.product);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    singleProdcut();
    getProdcut();
  }, []);

  // // Related Products
  // const relatedProduct = products.filter(
  //   (item) => "productcategory" === item.productcategory
  // );

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const dispatch = useDispatch()
  const {addedProducts, totalQty, subTotalPrice, totalPrice}=useSelector(state=>state.products)

  // const [quickView, setQuickView] = useState(false)    

  useEffect(() => {
      localStorage.setItem('addedProducts',JSON.stringify(addedProducts))
      localStorage.setItem('totalQty', JSON.stringify(totalQty))
      localStorage.setItem('subTotalPrice', JSON.stringify(subTotalPrice))
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
  }, [addedProducts, totalQty, subTotalPrice, totalPrice])

  return (
    <>
      <Helmet title="Product-details">
        {/* <Commonsection title={title} /> */}

        <section>
          <Container>
            <Row>
              <Col lg="2" md="2">
                <div className="product__images ">
                  <div
                    className="img__item"
                    onClick={() => setImage(singleproduct?.productimage)}
                  >
                    <img
                      src={`http://localhost:8000/product/${singleproduct?.productimage}`}
                      alt=""
                      className="w-50"
                    />
                  </div>
                  <div
                    className="img__item mb-3"
                    onClick={() => setImage(singleproduct?.productsubimage1)}
                  >
                    <img
                      src={`http://localhost:8000/product/${singleproduct?.productsubimage1}`}
                      alt=""
                      className="w-50"
                    />
                  </div>
                  <div
                    className="img__item mb-3"
                    onClick={() => setImage(singleproduct?.productsubimage2)}
                  >
                    <img
                      src={`http://localhost:8000/product/${singleproduct?.productsubimage2}`}
                      alt=""
                      className="w-50"
                    />
                  </div>

                  <div
                    className="img__item"
                    onClick={() => setImage(singleproduct?.productsubimage3)}
                  >
                    <img
                      src={`http://localhost:8000/product/${singleproduct?.productsubimage3}`}
                      alt=""
                      className="w-50"
                    />
                  </div>
                </div>
              </Col>

              <Col lg="4" md="4">
                <div className="product__main-img">
                  <img
                    src={`http://localhost:8000/product/${image}`}
                    alt=""
                    className="w-100"
                  />
                </div>
              </Col>

              <Col lg="6" md="6">
                <div className="single__product-content">
                  <h2 className="product__title mb-3">
                    {singleproduct?.productname}
                  </h2>
                  <p className="product__price">
                    {" "}
                    Price: <span>${singleproduct?.productprice}</span>
                  </p>
                  <p className="category mb-5">
                    Category: <span>{singleproduct?.productcategory}</span>
                  </p>
                  <p className="category mb-5">{singleproduct?.productdis}</p>
                  <button  className="addTOCart__btn" onClick={()=>dispatch({type:"ADD_TO_CART",payload:singleproduct})} >
                  Add to Cart
                </button>
                </div>
              </Col>

              <Col lg="12" className="mb-5 mt-4">
                <h2 className="related__Product-title">You might also like</h2>
              </Col>
              <Slider {...settings}>
                {products
                  ?.filter(
                    (items) => items?.productcategory === singleproduct?.productcategory
                  )
                  ?.map((item) => (
                    <Row>
                      <Col lg="12" className="mb-4" key={item?.id}>
                        <ProductCard item={item} />
                      </Col>
                    </Row>
                  ))}
              </Slider>
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
}

export default FoodDetails;
