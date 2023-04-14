import React from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <div>
      <CardElement
        onChange={(e) => {
          console.log(e);
        }}
      />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </div>
  );
}

export default Payment;
