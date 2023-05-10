import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import "../../styles/fooddetail.css";

function AdminProdcutDetails() {

  const [singleproduct,setsingleprodcut]=useState({});
// console.log(singleproduct)
  // All Category

  const { id } = useParams();

  const [image,setImage]=useState("")

  const singleProdcut = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/singleproduct/"+ id)
      .then(function (response) {
        // console.log(response.data);
        setsingleprodcut(response.data.product);
        setImage(response.data.product?.productimage)

      })
      .catch(function (error) {
        
        // console.log(error);
      });
  };

  useEffect(() => {
    singleProdcut();
  }, []);
  return (
    <>
    <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
              <div
                  className="img__item"
                  onClick={() => setImage(singleproduct.productimage)}
                >
                  <img src={`http://localhost:8000/product/${singleproduct.productimage}`} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setImage(singleproduct.productsubimage1)}
                >
                  <img src={`http://localhost:8000/product/${singleproduct.productsubimage1}`} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setImage(singleproduct.productsubimage2)}
                >
                  <img src={`http://localhost:8000/product/${singleproduct.productsubimage2}`} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setImage(singleproduct.productsubimage3)}
                >
                  <img src={`http://localhost:8000/product/${singleproduct.productsubimage3}`} alt="" className="w-50" />
                </div>
                
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={`http://localhost:8000/product/${image}`} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{singleproduct.productname}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${singleproduct.productprice}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{singleproduct.productcategory}</span>
                </p>
                <p className="category mb-5">
                 {singleproduct.productdis}
                </p>

                
              </div>
            </Col>
            </Row>
            </Container>
            </section>
    </>
  )
}

export default AdminProdcutDetails