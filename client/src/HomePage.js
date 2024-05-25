import './index.css';
import { loadStripe } from '@stripe/stripe-js';

const public_stripe_key = process.env.REACT_APP_PUBLIC_STRIPE_KEY;

const HomePage = () => {
	const handlePayment = async () => {
		const stripePromise = await loadStripe(public_stripe_key);
		const response = await fetch(
			'http://localhost:3001/create-stripe-session',
			{
				method: 'POST',
				headers: { 'Content-Type': 'Application/JSON' },
				body: JSON.stringify([
					{ item: 'Stripe payment integration', qty: '3', itemCode: '99' },
				]),
			},
		);
		const session = await response.json();
		stripePromise.redirectToCheckout({
			sessionId: session.id,
		});
	};

	return (
		<div className="App">
			<div className="container">
				<div className="header">Stripe payment integration</div>
				<p>Charges - 20 INR For Lifetime</p>
				<p>Quantity - 3 Copies</p>
				<button className="button" onClick={handlePayment}>
					One Time Payment
				</button>
			</div>
		</div>
	);
};

export default HomePage;
