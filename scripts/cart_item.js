
import { Filters } from './filters.js';

export class CartItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	remove(event) {
		event.preventDefault()
		event.nativeEvent.stopImmediatePropagation()
		event.currentTarget.blur()

		return this.props.cart.remove(this.props.item.key).then((cart) => {
			this.props.onRemove(event, cart)
		})
	}

	render() {
		return <div className="cart__item">
			<div className="grid grid--tight_guttered grid--middle">
				<div className="col col--2of12">
					<a href={this.props.item.url}><img src={Filters.imageURL(this.props.item.image, "medium")} /></a>
				</div>
				<div className="col col--1of12" />
				<div className="col col--6of12 text_left">
					<a href={this.props.item.url}><strong>{this.props.item.product_title}</strong> · {this.props.item.product_type}</a><br />
					<small>
						{this.props.item.variant_title} x {this.props.item.quantity}
						&nbsp;|&nbsp;
						<a href={`/cart/change?id=${this.props.item.key}&quantity=0`}
							className="a--underline"
							onClick={this.remove.bind(this)}>Remove</a>
					</small>
				</div>
				<div className="col col--3of12 text_right alternate grey">{Filters.money(this.props.item.price)}<br /></div>
			</div>
		</div>
	}
}
