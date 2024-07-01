import { useState, useEffect } from "react";
import { useParams, useOutletContext, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function AllProducts() {
  const [fetchedProducts, setFetchedProducts] = useState();
  const params = useParams();

  useEffect(() => {
    window.scrollBy(0, -window.innerHeight);
    fetch(`https://localhost:3000/products/filter/${params.category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchedProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <ul className="flex flex-wrap justify-center">
          {fetchedProducts ? (
            fetchedProducts.map((product, index) => {
              return (
                <li
                  key={product.productID}
                  className={"mx-6 justify-self-start"}
                >
                  <div
                    className={
                      "w-[300px] h-[380px] flex flex-col justify-around items-center my-5 border-b-[0.5px] border-gray-500"
                    }
                  >
                    <Link to={`/Home/product-page/${product.productID}`}>
                      <div className="w-[300px] h-[300px] bg-slate-600 hover:bg-blue-500 transition-colors ease-in-out"></div>
                    </Link>
                    <Link to={`/Home/product-page/${product.productID}`}>
                      <div className="flex flex-col justify-center items-center hover:text-[#685d5d]">
                        <h1>{product.name}</h1>
                        <h1>From ${product.price}</h1>
                      </div>
                    </Link>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Replace with screen loader, ie. faded boxes</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default AllProducts;
