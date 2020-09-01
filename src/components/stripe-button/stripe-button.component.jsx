import React from "react";
import StripeCheckout from "react-stripe-checkout";




const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_IW6YbcDixnxtODjGM9cZSUDO00s4bFOIDj';

    const onToken = token => {
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
        label='Pay Now'
        name='Crown Clothing'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your Total Is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}


export default StripeCheckoutButton;



