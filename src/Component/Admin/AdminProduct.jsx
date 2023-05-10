import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./adminproduct.css";

function AdminProduct() {
  const [products, setproducts] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editprodcutdata, seteditprodcutdata] = useState();
  const [producttitle, setproducttitle] = useState("");
  const [productprice, setproducprice] = useState("");
  const [producdescription, setproducdescription] = useState("");
  const [category, setcategory] = useState("");
  const [producimage, setproducimage] = useState("");
  const [producimage1, setproducimage1] = useState("");
  const [producimage2, setproducimage2] = useState("");
  const [producimage3, setproducimage3] = useState("");
  // console.log(products)
  // All Prodcut
  const getProdcut = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/allproduct")
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
    getProdcut();
  }, []);

  // Delete Product
  const deleteProduct = (id) => {
    axios
      .delete("http://localhost:8000/api/v1/admin/deleteproduct/" + id)
      .then(function (response) {
        // handle success
        console.log(response.data);
        toast.success("Prodcut Deleted");
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // Edit Product
  const editProdcut = async () => {
    try {
      // if(!name){
      //   return toast.success("Please Enter Category")
      // }
      const config = {
        url: "/updateproduct",
        method: "put",
        baseURL: "http://localhost:8000/api/v1/admin",
        headers: { "content-type": "multipart/form-data" },
        data: {
          id: editprodcutdata,
          productname: producttitle,
          productprice: productprice,
          productcategory: category,
          productdis: producdescription,
          productimage: producimage,
          productsubimage1: producimage1,
          productsubimage2: producimage2,
          productsubimage3: producimage3,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          console.log("success");
          toast.success("Product Edit");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Prodcut not Edit");
    }
  };

  // All Category
  const [categories, setcategories] = useState([]);
  // console.log(categories);
  const getcategory = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/allcategory")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setcategories(response.data.success);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getcategory();
  }, []);

  // Search

  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

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
  const productPerPage = 7;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="com_use">
        <div className="content-main">
          <div className="content-header">
            <h2 className="content-title jbm">Products</h2>
            <div className="jmall_parwez">
              <Link to="/admin-add-product">Create new</Link>
            </div>
          </div>
          <div className="">
            <div
              className="search__widget d-flex align-items-center justify-content-between mb-4"
              style={{ backgroundColor: "#fff" }}
            >
              <input
                type="text"
                placeholder="Search...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <i class="ri-search-line"></i>
              </span>
            </div>
            <div className="pro_A">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image1</th>
                    <th>Image2</th>
                    <th>Image3</th>
                    <th>Image4</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discription</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPage.map((e, id) => {
                    return (
                      <tr key={id}>
                        <td className="text-center cart__img-box">
                          <img
                            src={`http://localhost:8000/product/${e?.productimage}`}
                            alt="image1"
                          />
                        </td>
                        <td className="text-center cart__img-box">
                          <img
                            src={`http://localhost:8000/product/${e.productsubimage1}`}
                            alt="image2"
                          />
                        </td>
                        <td className="text-center cart__img-box">
                          <img
                            src={`http://localhost:8000/product/${e.productsubimage2}`}
                            alt="image3"
                          />
                        </td>
                        <td className="text-center cart__img-box">
                          <img
                            src={`http://localhost:8000/product/${e.productsubimage3}`}
                            alt="image4"
                          />
                        </td>
                        <td className="text-center">{e.productname}</td>
                        <td className="text-center">{e.productcategory}</td>
                        <td className="text-center">{e.productprice} </td>
                        <td className="text-center">
                          {e.productdis.slice(0, 60)}...
                        </td>
                        <td className="text-center cart__item-del">
                          <Link to={`/admin-details-page/${e?._id}`}>
                            <i class="ri-eye-line"></i>
                          </Link>
                        </td>
                        <td className="text-center cart__item-del">
                          <i
                            class="ri-edit-2-line"
                            onClick={() => {
                              handleShow();
                              seteditprodcutdata(e);
                            }}
                          ></i>
                        </td>
                        <td className="text-center cart__item-del">
                          <i
                            class="ri-delete-bin-line"
                            onClick={() => {
                              deleteProduct(e._id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label for="product_title" className="form-label">
              Product title
            </label>
            <input
              type="text"
              placeHolder={editprodcutdata?.productname}
              className="form-control"
              id="product_title"
              required=""
              value={producttitle}
              onChange={(e) => setproducttitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="product_price" className="form-label">
              Price
            </label>
            <input
              type="number"
              placeHolder="Type here"
              className="form-control"
              id="product_price"
              required=""
              value={productprice}
              onChange={(e) => setproducprice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="product_price" className="form-label">
              Category
            </label>
            <Form.Select
              aria-label="Default select example"
              className="form-control"
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {categories?.map((data) => {
                return <option value={data?.catname}>{data?.catname}</option>;
              })}
            </Form.Select>
            {/* <input
                        type="text"
                        placeHolder="Type here"
                        className="form-control"
                        id="product_price"
                        required=""
                      /> */}
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              placeHolder="Type here"
              className="form-control"
              rows="7"
              required=""
              value={producdescription}
              onChange={(e) => setproducdescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="upload1">
              Images 1
            </label>
            <input
              class="form-control mt-3"
              type="file"
              id="upload1"
              accept="image/*"
              onChange={(e) => setproducimage(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="upload2">
              Images 2
            </label>
            <input
              class="form-control mt-3"
              type="file"
              id="upload2"
              accept="image/*"
              onChange={(e) => setproducimage1(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="upload3">
              Images 3
            </label>
            <input
              class="form-control mt-3"
              type="file"
              id="upload3"
              accept="image/*"
              onChange={(e) => setproducimage2(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="upload4">
              Images 4
            </label>
            <input
              class="form-control mt-3"
              type="file"
              id="upload4"
              accept="image/*"
              onChange={(e) => setproducimage3(e.target.files[0])}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editProdcut}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminProduct;
