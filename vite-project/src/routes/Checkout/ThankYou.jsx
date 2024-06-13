import { Link } from "react-router-dom";

function ThankYou({}) {
  return (
    <>
      <div className="min-h-[400px] mx-[4vw] my-[2vh]">
        <h1 className="text-3xl border-b-[0.5px] border-slate-500 w-full">
          Thank you
        </h1>
        <div className="mt-5 text-2xl flex flex-col gap-3">
          <h1 className="">Many thanks for shopping with "test ecommerce".</h1>
          <h1>
            To veiw your order goto your{" "}
            <Link
              to="/home/profile"
              className="border-b-[1px] border-slate-500"
            >
              profile
            </Link>
            .
          </h1>
          <h1>
            To continue shopping click{" "}
            <Link to="/home/shop" className="border-b-[1px] border-slate-500">
              here
            </Link>
            .
          </h1>
        </div>
      </div>
    </>
  );
}

export default ThankYou;
