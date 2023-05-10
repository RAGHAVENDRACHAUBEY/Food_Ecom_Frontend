import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "./Helmet/Helmet";
import ProductCard from "./ProductCard";
// import products from './fakedata/products'
import Commonsection from "./CommonSection/Commonsection";
import "../styles/allfoods.css";
import ReactPaginate from "react-paginate";
import axios from "axios";

function AllFood() {
  // All Prodcut
  const [products, setproducts] = useState([]);
  console.log(products);
  const getProdcut = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/allproduct")
      .then(function (response) {
        // handle success
        console.log(response.data.product);
        setproducts(response.data.product);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getProdcut();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  // Search Filter

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.productname.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });
  // Pegination
  const productPerPage = 9;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Short Filter
  // const [objectsToShow, setToShow] = useState([]);
  // console.log(objectsToShow);

  const compare = (a, b, ascendingOrder) => {
    if (a < b) {
      return ascendingOrder ? -1 : 1;
    }
    if (a > b) {
      return ascendingOrder ? 1 : -1;
    }
    return 0;
  };
  const handleChange = (value) => {
    if (value == "none") {
      setproducts([...products]);
    } else {
      let toType, toAscending;
      switch (value) {
        case "ascending":
          toType = true;
          toAscending = true;
          break;
        case "descending":
          toType = true;
          toAscending = false;
          break;
        case "low":
          toType = false;
          toAscending = true;
          break;
        case "high":
          toType = false;
          toAscending = false;
          break;
      }
      let current = [...products];
      current.sort((a, b) =>
        toType
          ? compare(a.productname, b.productname, toAscending)
          : compare(a.productprice, b.productprice, toAscending)
      );
      setproducts([...current]);
    }
  };
  return (
    <>
      <Helmet title="All-Foods">
        <Commonsection title="All Foods" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6" xs="12">
                <div className="search__widget d-flex align-items-center justify-content-between ">
                  <input
                    type="text"
                    placeholder="I'm looking for...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>
                    <i class="ri-search-line"></i>
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                <div className="sorting__widget text-end">
                  <select
                    className="w-50"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option>Default</option>
                    <option value="ascending">Alphabetically, A-Z</option>
                    <option value="descending">Alphabetically, Z-A</option>
                    <option value="high">High to Price</option>
                    <option value="low">Low to Price</option>
                  </select>
                </div>
              </Col>

              {displayPage.map((item, id) => (
                <Col
                  lg="4"
                  md="4"
                  sm="6"
                  xs="6"
                  key={item?.id}
                  className="mb-4"
                >
                  <ProductCard item={item} />
                </Col>
              ))}

              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  containerClassName=" paginationBttns "
                />
              </div>
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
}

export default AllFood;
