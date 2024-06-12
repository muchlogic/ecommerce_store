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
      <div className="mx-[4vw] mt-[4vh] h-[50vh]">
        <h1 className="block text-3xl border-b-[0.5px] border-slate-500">
          Order Details
        </h1>
        {order ? (
          <>
            <div className="mt-5 flex flex-row justify-center gap-x-[4vw]">
              <ul className="relative text-xl w-[42vw]">
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
              <div className="text-xl w-[42vw] grid grid-cols-2 h-fit gap-y-2">
                <div>
                  <h1>Date:</h1>
                </div>
                <div>
                  <h1>{order.date.substr(0, 10)}</h1>
                </div>
                <div>
                  <h1>Total:</h1>
                </div>
                <div>
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
