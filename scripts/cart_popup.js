
import { Filters } from './filters.js';
import { Overlay } from './overlay.js';

import { Form } from './form.js';
import { CartItem } from './cart_item.js';


export class CartPopup extends Overlay {

	constructor(props) {
		super(props)

		props.cart.fetch().then((cart) => {
			this.setState(cart.state)
		})
	}

	updateCart(event, cart) {
		this.setState(cart.state)
	}

	render() {

		return <div>
			<a href="/cart"
				ref={(button)=> {this.button = button}}
				onClick={this.toggle.bind(this)} className={`nav__link nav__link--cart ${this.state.showed && "nav__link--active"}`}>
				<img src={this.props.icon} alt="Cart" />
				<span className="nav__link--cart__items">{this.state.item_count}</span>
			</a>

			<div className={`cart ${this.state.showed && "overlay--show"}`}>
				{this.state.item_count > 0 &&
				<Form action="/cart" method="post" className="cart__container">

					{this.state.items.map((item)=> (
						<CartItem cart={this.props.cart}
							key={item.key}
							item={item}
							onRemove={this.updateCart.bind(this)} />
					))}

					<div className="cart__item text_center">
						<button type="submit" name="checkout" className="button--full small_bottom">Go to checkout</button>
						<a href="/" onClick={this.hide.bind(this)} className="a--underline alternate grey small">Continue shopping</a>
					</div>

				</Form>
				||
				<div className="cart__container">
					<div className="cart__item text_center">
						<p>Your cart is empty at the moment.</p>
					</div>
					<div className="cart__item text_center">
						<a href="/" onClick={this.hide.bind(this)} className="a--underline alternate grey">Continue shopping</a>
					</div>
				</div>
				}
			</div>
		</div>
	}
}
