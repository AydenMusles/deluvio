
import { Filters } from './filters.js';

import { Picture } from './picture.js'
import { ProductAddToCart } from './product_add_to_cart.js'


export class ProductQuickview extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showed: false,
			product: null,
			origin: {
				x: 0.5,
				y: 0.5
			}
		}
	}

	componentDidMount() {
		this.buttons = document.querySelectorAll("[data-show-quickview]")
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].addEventListener("click", this.show.bind(this))
		}

		key("escape", this.hide.bind(this))
	}

	componentWillUnmount() {
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].removeEventListener("click", this.show)
		}

		key.unbind("escape")
	}

	show(event) {
		event.preventDefault()
		event.currentTarget.blur()

		let product = {
			...JSON.parse(unescape(event.currentTarget.getAttribute("data-product"))),
			options: JSON.parse(event.currentTarget.getAttribute("data-product-options")),
			url: event.currentTarget.href,
			split: event.currentTarget.getAttribute("data-product-split")
		}

		this.currentPath = location.pathname
		history.pushState(null, null, product.url)

		this.setState({
			showed: true,
			product: product,
			origin: {
				x: event.screenX / window.innerWidth,
				y: event.screenY / window.innerHeight
			}
		})
	}

	hide(event) {
		if (event && event.currentTarget.blur) {
			event.currentTarget.blur()	
		}

		history.pushState(null, null, this.currentPath)

		this.setState({showed: false})
	}


	render() {

		return <div className={`overlay overlay--full ${this.state.showed && "overlay--show"}`}>
			<button className="button--transparent overlay__back" onClick={this.hide.bind(this)}></button>
			<button className="button--transparent overlay__close" onClick={this.hide.bind(this)}>✕</button>

			<div className="overlay__container padded padded--tight" style={{
					"transformOrigin": `${this.state.origin.x*100}% ${this.state.origin.y*100}%`
				}}>
				{this.state.product &&
				<div className="grid grid--stretch">
					<div className="col col--6of12 hide_on_tablet_portrait hero" style={{
						"backgroundImage": `url(${Filters.imageURL(this.state.product.featured_image, "1111x")})`
					}}>
					</div>
					<div className="col col--6of12 col--tablet_portrait--12of12 padded">
						<h3 className="small_bottom">{this.state.product.title}</h3>
						<p className="grey">By {this.state.product.vendor}</p>

						<div className="grid grid--spaced grid--middle normal_bottom">
							<div className="col">
								<h4>
									{this.state.product.compare_at_price > this.state.product.price ? <span><span className="strike">{Filters.money(this.state.product.compare_at_price)}</span> <span className="highlight">{Filters.money(this.state.product.price)}</span></span> : <span>{Filters.money(this.state.product.price)}</span>}
									<span dangerouslySetInnerHTML={{__html: this.state.product.split}} />
								</h4>
							</div>
							
						</div>

						<div className="medium_bottom small" dangerouslySetInnerHTML={{__html: this.state.product.description}} />

						<ProductAddToCart
							onAddToCart={this.hide.bind(this)}
							currentVariant={this.state.product.variants[0]}
							variants={this.state.product.variants}
							options={this.state.product.options}
							cart={this.props.cart}
							cartPopup={this.props.cartPopup} />

						<a href={this.state.product.url} className="small a--underline">View details</a>
					</div>
				</div>
				}
			</div>
		</div>
	}
}

