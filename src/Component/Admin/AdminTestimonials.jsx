import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./adminproduct.css";

function AdminTestimonials() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [slider, setSlider] = useState([]);
  //   console.log(slider);
  //   get all slider

  const gettestimonials = () => {
    axios
      .get("https://food-ecom-backend-1.onrender.com/api/v1/admin/getslider")
      .then(function (response) {
        // console.log(response.data.slider);
        setSlider(response.data.slider);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete
  const removetestimonials = (id) => {
    axios
      .delete(
        "https://food-ecom-backend-1.onrender.com/api/v1/admin/deletslider/" +
          id
      )
      .then(function (response) {
        // console.log(response.data);
        toast.success("Testimonials Deleted");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    gettestimonials();
  }, []);
  // Search

  // const [searchTerm, setSearchTerm] = useState("");

  // const [pageNumber, setPageNumber] = useState(0);

  // const searchedProduct = products.filter((item) => {
  //   if (searchTerm.value === "") {
  //     return item;
  //   }
  //   if (item.productname.toLowerCase().includes(searchTerm.toLowerCase())) {
  //     return item;
  //   } else {
  //     return console.log("not found");
  //   }
  // });

  //   // Pegination
  //   const productPerPage = 7;
  //   const visitedPage = pageNumber * productPerPage;
  //   const displayPage = searchedProduct.slice(
  //     visitedPage,
  //     visitedPage + productPerPage
  //   );

  //   const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  //   const changePage = ({ selected }) => {
  //     setPageNumber(selected);
  //   };

  return (
    <>
      <div className="com_use">
        <div className="content-main">
          <div className="content-header">
            <h2 className="content-title jbm">Testimonials</h2>
            <div className="jmall_parwez">
              <Link to="#" onClick={handleShow}>
                Create new
              </Link>
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
                //   value={searchTerm}
                //   onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <i class="ri-search-line"></i>
              </span>
            </div>
            <div className="pro_A">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Discription</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {slider.map((items, id) => {
                    return (
                      <tr key={items?.id}>
                        <td className="text-center cart__img-box">
                          <img
                            src={`https://food-ecom-backend-1.onrender.com/slider/${items?.image}`}
                            alt="image1"
                          />
                        </td>{" "}
                        <td className="text-center">{items?.title}</td>
                        <td className="text-center">{items?.discription}</td>
                        <td className="text-center cart__item-del">
                          <i
                            class="ri-delete-bin-line"
                            onClick={() => {
                              removetestimonials(items?._id);
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
                // pageCount={pageCount}
                // onPageChange={changePage}
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
              Title
            </label>
            <input
              class="form-control mt-3"
              type="Title"
              accept="image/*"
              // onChange={(e) => setproducimage(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              placeHolder="Type here"
              className="form-control"
              rows="7"
              required=""
              // value={producdescription}
              // onChange={(e) => setproducdescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="upload1">
              Images
            </label>
            <input
              class="form-control mt-3"
              type="file"
              id="upload1"
              accept="image/*"
              // onChange={(e) => setproducimage(e.target.files[0])}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminTestimonials;
