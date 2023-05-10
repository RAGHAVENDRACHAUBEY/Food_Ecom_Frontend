import React, { useEffect, useState } from "react";
import "../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = (props) => {
  const { _id, productname, productimage, productprice, quantity } =
    props?.item;

  const dispatch = useDispatch();
  const { addedProducts, totalQty, subTotalPrice, totalPrice } = useSelector(
    (state) => state.products
  );

  // const [cartView, setcartView] = useState(true);

  useEffect(() => {
    localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
    localStorage.setItem("totalQty", JSON.stringify(totalQty));
    localStorage.setItem("subTotalPrice", JSON.stringify(subTotalPrice));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [addedProducts, totalQty, subTotalPrice, totalPrice]);

  const customer = JSON.parse(sessionStorage.getItem("user"));
  // console.log("amit dekh bhai", customer);
  const addwishlist = async (item, quantity, totalPrice) => {
    if (customer) {
      try {
        const config = {
          url: "/addWhishList",
          method: "post",
          baseURL: "http://localhost:8000/api/v1/user",
          data: {
            productId: item,
            customerId: customer._id,
            quantity: 1,
            price: totalPrice,
            totalPrice: totalPrice,
          },
        };
        await axios(config).then(function (res) {
          if ((res.status = 200)) {
            console.log("success");
            toast.success("Added to wishlist");

            window.location.reload();
          }
        });
      } catch (error) {
        console.log(error);
        toast.warning("product not added");
      }
    } else {
      window.location.assign("/login");
      alert("Need to Login");
    }
  };

  let [wishlist, setwishlist] = useState([]);
  console.log("giibdgbdg", wishlist);
  const getwislist = () => {
    axios
      .get(
        "http://localhost:8000/api/v1/user/getWishlistByCustomerId/" +
          customer?._id
      )
      .then(function (response) {
        console.log(response.data);
        setwishlist(response.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removewishlist = async (item) => {
    if (!customer) {
      alert("Need to Login");
    } else {
      axios({
        method: "delete",
        url:
          "http://localhost:8000/api/v1/user/removeWishlistbcustomeryId/" +
          customer?._id +
          "/" +
          item,
      })
        .then(function (response) {
          toast.warning("Product removed from wishlist");

          window.location.reload();
        })
        .catch(function (error) {
          //handle error
          console.log(error.response.data);
        });
    }
  };
  useEffect(() => {
    getwislist();
  }, []);
  return (
    <div className="product__item">
      <div className="product__img">
        <Link to={`/fooddetails/${_id}`}>
          <img
            src={`http://localhost:8000/product/${productimage}`}
            key={_id}
            alt="product-img"
            className="w-50"
            style={{ width: "151px", height: "151px" }}
          />
        </Link>
      </div>

      {wishlist?.filter((item) => item?.productId?._id === _id)?.length ? (
        <div
          className="product wishlist"
          style={{ backgroundColor: "green", borderColor: "green" }}
          onClick={() => removewishlist(_id, quantity, productprice)}
        >
          <i class="ri-heart-line" title="whislist"></i>
        </div>
      ) : (
        <>
          <div
            className="product wishlist"
            onClick={() => addwishlist(_id, quantity, productprice)}
          >
            <i class="ri-heart-line" title="whislist"></i>
          </div>
        </>
      )}

      <div className="product__content">
        <h5>
          <Link to={`/fooddetails/${_id}`}>{productname}</Link>
        </h5>
        <div className="dop_hero d-flex align-items-center justify-content-between ">
          <span className="product__price">${productprice}</span>
          {addedProducts?.filter((item) => item?._id === _id)?.length ? (
            
              <button className="addTOCart__btn">
                <Link to="/cart">View cart</Link>
              </button>
          
          ) : (
            <button
              className="addTOCart__btn"
              onClick={() =>
                dispatch(
                  { type: "ADD_TO_CART", payload: props?.item },
                  toast.success("Product Added")
                  
                )
              }
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
