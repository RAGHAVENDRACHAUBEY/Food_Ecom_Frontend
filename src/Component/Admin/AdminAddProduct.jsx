import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";

function AdminAddProduct() {
  const [producttitle, setproducttitle] = useState("");
  const [productprice, setproducprice] = useState("");
  const [producdescription, setproducdescription] = useState("");
  const [category, setcategory] = useState("");
  const [producimage, setproducimage] = useState("");
  const [producimage1, setproducimage1] = useState("");
  const [producimage2, setproducimage2] = useState("");
  const [producimage3, setproducimage3] = useState("");

  // Add Prodcut

  const addProdcut = async (e) => {
    e.preventDefault();
    try {
      if (
        !producttitle ||
        !productprice ||
        !producdescription ||
        !category ||
        !producimage ||
        !producimage1 ||
        !producimage2 ||
        !producimage3
      ) {
        return toast.error("Please Fill All The Field");
      }
      const config = {
        url: "/addproduct",
        method: "post",
        baseURL: "http://localhost:8000/api/v1/admin",
        headers: { "content-type": "multipart/form-data" },
        data: {
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
          toast.success("Product Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Prodcut not added");
    }
  };
  // console.log("fkld",producimage1,producimage2,producimage3)

  // All Category
  const [categories, setcategories] = useState([]);
  console.log(categories);
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

  return (
    <>
      <div className="com_use">
        <div className="content-main">
          <div className="content-header">
            <h2 className="content-title jbm"> Products</h2>
            <div className="jmall_parwez">
              <Link to="/addproduct">Go to Product</Link>
            </div>
          </div>
          <form>
            <div className="row mb-3">
              <div className="col-xl-8 col-lg-8">
                <div className="card mb-3 shadow-sm-0">
                  <div className="card-body">
                    <div className="mb-3">
                      <label for="product_title" className="form-label">
                        Product title
                      </label>
                      <input
                        type="text"
                        placeHolder="Type here"
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
                          return (
                            <option value={data?.catname}>
                              {data?.catname}
                            </option>
                          );
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
                    <input
                      type="submit"
                      value="Submit"
                      className="addTOCart__btn mb-2"
                      style={{ width: "100%" }}
                      onClick={addProdcut}
                    />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminAddProduct;
