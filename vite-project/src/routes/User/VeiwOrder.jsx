import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";

function VeiwOrder() {
  const [order, setOrder] = useState(null);
  const [cart, setCart, user, setUser, refreshToken, setRefreshToken] =
    useOutletContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setOrder(location.state.order);
    console.log(location.state.order);
  }, []);

  return (
    <>
      <div className="mx-[4vw] mt-[4vh] min-h-[50vh] mb-10">
        <h1 className="block text-3xl border-b-[0.5px] border-slate-500">
          Order Details
        </h1>
        {order ? (
          <>
            <div className="relative mt-5 flex flex-col md:flex-row justify-center items-center md:items-start gap-x-[4vw]">
              <div className="w-[90vw] md:w-[42vw] text-xl ">
                <ul className="">
                  {order.cart.map((item) => {
                    return (
                      <li
                        key={item.productID}
                        className="flex justify-between border-b-[0.5px] border-gray-600 pb-4 mb-4"
                      >
                        <div className="flex">
                          <div className="h-[50px] w-[50px] bg-[blue]"></div>
                          <h1 className="my-1 mx-4 h-fit">{item.name}</h1>
                        </div>
                        <div className="flex">
                          <h1 className="my-1 mr-4">{item.amount}</h1>
                          <h1 className="my-1 ml-4">
                            ${item.price * item.amount}
                          </h1>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="md:sticky top-0 text-xl w-[90vw] md:w-[42vw] grid grid-cols-2 h-fit gap-y-2 md:border-l-[1px] md:border-slate-500 md:pl-[2vw]">
                <div>
                  <h1>Date:</h1>
                </div>
                <div className="flex justify-end">
                  <h1>{order.date.substr(0, 10)}</h1>
                </div>
                <div>
                  <h1>Status:</h1>
                </div>
                <div className="flex justify-end">
                  <h1>Order received</h1>
                </div>
                <div>
                  <h1>Total:</h1>
                </div>
                <div className="flex justify-end">
                  <h1>${order.total}</h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </>
  );
}

export default VeiwOrder;
