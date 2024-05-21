import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

function AdminCategory() {
  const [cate, setcate] = useState([]);
  console.log(cate);
  const [name, setname] = useState("");
  const [ename, setename] = useState("");
  const [edit, setedit] = useState("");
  // const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getcategory();
  }, []);

  // All Category
  const getcategory = () => {
    axios
      .get("https://food-ecom-backend-1.onrender.com/api/v1/admin/allcategory")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setcate(response.data.success);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      });
  };

  // Add Category

  const addcategory = async (e) => {
    e.preventDefault();

    // formdata.append("catimage", img);
    // formdata.append("catname", name);

    try {
      if (!name) {
        return toast.success("Please Enter Category");
      }
      const config = {
        url: "/addcat",
        method: "post",
        baseURL: "https://food-ecom-backend-1.onrender.com/api/v1/admin",
        headers: { "content-type": "application/json" },
        data: {
          catname: name,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          console.log("success");
          toast.success("category Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("category not added");
    }
  };
  // Edit
  const Editcategory = async () => {
    try {
      const config = {
        url: "/update-category",
        method: "put",
        baseURL: "https://food-ecom-backend-1.onrender.com/api/v1/admin",
        headers: { "content-type": "application/json" },
        data: {
          id: edit?._id,
          catname: ename,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          console.log("success");
          toast.success("Category Edit");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Category not Edit");
    }
  };

  // Delete
  const deletecategory = (id) => {
    axios
      .delete(
        "https://food-ecom-backend-1.onrender.com/api/v1/admin/category/" + id
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        toast.success("Category Deleted");
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <div className="com_use">
        <div className="content-main">
          <div className="content-header">
            <h2 class="content-title mb-4 jbm">Category </h2>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-4">
                  <form className="px-0">
                    <div class="mb-3">
                      <label for="product_name" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        required
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        class="form-control py-3"
                        id="product_name"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="addTOCart__btn mb-2"
                      style={{ width: "100%" }}
                      onClick={addcategory}
                    />
                    <br />
                  </form>
                </div>
                <div className="col-md-12 col-lg-8">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cate.map((items, index, id) => {
                        return (
                          <tr key={id}>
                            <td>{index + 1} </td>
                            <td>
                              <b>{items.catname}</b>
                            </td>
                            <td>
                              <i
                                class="ri-edit-2-line"
                                onClick={() => {
                                  handleShow();
                                  setedit(items);
                                }}
                              ></i>
                            </td>
                            <td>
                              <i
                                class="ri-delete-bin-line"
                                onClick={() => {
                                  deletecategory(items._id);
                                }}
                              ></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="product_name" class="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder={edit?.catname}
              required
              value={ename}
              onChange={(e) => setename(e.target.value)}
              class="form-control py-3"
              id="product_name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              Editcategory();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminCategory;
