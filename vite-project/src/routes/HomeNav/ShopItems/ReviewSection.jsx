import { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import Modal from "../../Modal";
import Rating from "@mui/material/Rating";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ReviewSection({ product, fetchProduct }) {
  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const [reviewState, setReviewState] = useState(0); // 0 means Reviews is active, 1 means "Leave Review is active"

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [oldRating, setOldRating] = useState(0); // in case of edit review store old rating for easy backend adjust

  const [arrowRotation, setArrowRotation] = useState(0);

  const fetchUserReviews = () => {
    fetch(`https://localhost:3000/users/get-review/${product.productID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => {
        let status_code = response.status; // examine status codes
        return response.json();
      })
      .then((data) => {
        let userProductReview = data.find(
          (item) => item.productID === product.productID
        );
        if (userProductReview !== undefined) {
          setUserReview(userProductReview);
          setName(userProductReview.name);
          setRating(userProductReview.rating);
          setTitle(userProductReview.title);
          setDesc(userProductReview.desc);
          setOldRating(userProductReview.rating);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (product) setReviews(product.reviews);
  }, [0, product]);

  useEffect(() => {
    if (refreshToken)
      fetch(`https://localhost:3000/signin/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      })
        .then((response) => {
          let status_code = response.status; // examine status codes
          if (status_code == 200) setCanReview(true); // let user review if they are logged in and in a valid session
          return response.json();
        })
        .then((data) => {})
        .catch((error) => {});
  }, [0, refreshToken]);

  useEffect(() => {
    if (user && product) {
      fetchUserReviews();
    }
  }, [user, product]);

  const reviewMode = (n) => {
    if (n == 0) {
      setReviewState(0);
    } else {
      setReviewState(1);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleRating = (n) => {
    setRating(n);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fetchUrl = `https://localhost:3000/products/review`;
    if (userReview) {
      // since user has reviewed this product switch Urls to update their previous
      fetchUrl = `https://localhost:3000/products/update-review`;
    }

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({
        productID: product.productID,
        name: name,
        rating: rating,
        title: title,
        desc: desc,
        oldRating: oldRating,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // open modal with msg saying review was created, also return updated product with review list
        fetchProduct();
        fetchUserReviews();
        setReviewState(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const flipArrowIcon = () => {
    const arrowIcon = document.getElementsByClassName("arrowDownIcon")[0];
    const newRotation = arrowRotation + 180;
    arrowIcon.style.transform = `rotate(${newRotation}deg)`;
    setArrowRotation(newRotation);
  };

  const showReviews = () => {
    const reviewContainer =
      document.getElementsByClassName("review-container")[0];

    if (reviewContainer.classList.contains("h-[10vh]")) {
      reviewContainer.classList.replace("h-[10vh]", "h-[100vh]");
    } else {
      reviewContainer.classList.replace("h-[100vh]", "h-[10vh]");
    }

    flipArrowIcon();
  };

  return (
    <>
      <div className="relative review-container h-[10vh] overflow-hidden transition-all ease-in-out delay-300">
        <div
          className="review-container-button h-[10vh] flex items-center justify-between cursor-pointer border-y-[0.5px] border-slate-500"
          onClick={() => showReviews()}
        >
          <h1 className="text-2xl ml-10">Reviews</h1>
          <div className="arrowDownIcon mr-10 transition-all ease-in-out delay-150">
            <KeyboardArrowDownIcon fontSize="medium" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col items-center w-full mx-auto min-h-[50vh] h-auto border-[0.5px] border-slate-500 mb-10">
            <div className="w-full border-b-[0.5px] border-slate-500 ">
              <button
                className="w-[50%] border-r-[0.5px] border-slate-500"
                onClick={() => reviewMode(0)}
              >
                <h1 className="text-xl py-4">Reviews</h1>
              </button>
              <button className="w-[50%]" onClick={() => reviewMode(1)}>
                <h1 className="text-xl py-4">Leave a review</h1>
              </button>
            </div>
            {reviewState == 0 ? (
              <>
                {reviews.length > 0 ? (
                  <div className="w-full px-2 md:px-4 py-2">
                    <ul>
                      {reviews.map((review) => {
                        return (
                          <li
                            key={review.date}
                            className="flex flex-col md:flex-row border-b-[0.5px] border-slate-500 pb-2 mb-2"
                          >
                            <div className="flex flex-col md:w-[20%]">
                              <h1 className="text-xl font-semibold">
                                {review.name}
                              </h1>
                              <h1 className="">
                                {review.date.substring(0, 10)}
                              </h1>
                              <Rating
                                name="half-rating-read"
                                value={review.rating}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <div className="flex flex-col w-auto mt-2 md:mt-0">
                              <h1 className="text-xl font-semibold">
                                {review.title}
                              </h1>
                              <h1 className="text-base">{review.desc}</h1>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <h1>There are no reviews</h1>
                )}
              </>
            ) : (
              <>
                {canReview ? (
                  <form className="flex flex-col h-fit w-full min-w-[350px] py-4 px-8">
                    <div>
                      <label className="label block mb-2">
                        <h1 className="">Name</h1>
                      </label>
                      <input
                        className="shadow appearance-none border border-slate-500 rounded w-[20%] min-w-[300px] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleName}
                        value={name}
                        type="text"
                      />
                    </div>
                    <div>
                      <Rating
                        name="half-rating"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          handleRating(newValue);
                        }}
                      />
                    </div>
                    <div>
                      <label className="label block mb-2">
                        <h1 className="">Title</h1>
                      </label>
                      <input
                        className="shadow appearance-none border border-slate-500 rounded w-[20%] min-w-[300px] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleTitle}
                        value={title}
                        type="text"
                      />
                    </div>
                    <div>
                      <label htmlFor="review" className="label block mb-2">
                        <h1>Review</h1>
                      </label>
                      <textarea
                        id="review"
                        className="shadow appearance-none border border-slate-500 rounded w-full min-h-[30vh] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleDesc}
                        value={desc}
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={(e) => handleSubmit(e)}
                        type="submit"
                      >
                        {userReview ? "Edit review" : "Submit"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <h1>Sign in to leave a review</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewSection;
