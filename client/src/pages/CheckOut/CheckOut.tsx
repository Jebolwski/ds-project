import { API_URL } from "src/config/config";

const CheckOut = () => {
  return (
    <>
      <div className="container">
        <h1>Checkout</h1>
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn5j5j2HAPGZRm6vN7mtYmHE1TIpDbIyjnD2IRz6YOfg&s"
          }
          className="image w-24 h-16"
        ></img>
        <h2>Price</h2>
        <h3>89.99$</h3>
        <form action={`${API_URL}/api/payment`} method="POST">
          <input type="hidden" name="product_name" value="test_product" />
          <input type="hidden" name="price" value={89.99 * 100} />
          <button className="btn-checkout" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckOut;
