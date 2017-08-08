
import { Filters } from './filters.js';
import { Cookies } from './cookies.js';

import { Form } from './form.js';
import { Input } from './input.js';
import { Select } from './select.js';


export class ProductAddToCart extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			error: false
		}
		this.props.options.map((option)=> {
			this.state[option.name] = Cookies.get(option.name)
			this.state[option.position] = option.name
		})
	}


	addToCart(event) {
		event.preventDefault()

		return this.props.cart.add(event.currentTarget["id"].value, 1).then((cart) => {
			this.setState({error: false})

			if (this.props.onAddToCart) { this.props.onAddToCart() }

			cart.fetch().then((cart) => {
				this.props.cartPopup.setState({...cart.state, showed: true})
			})
		}).catch((error) => {
			this.setState({error: error.message})
		})
	}

	updateVariant(event) {
		Cookies.set(event.currentTarget.name, event.currentTarget.value)
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		})
	}


	render() {
		
		let currentVariant = this.props.currentVariant
		for (var i = this.props.variants.length - 1; i >= 0; i--) {
			if (this.props.variants[i].options.every((option, index)=> { return this.state[this.state[index+1]] == option })) {
				currentVariant = this.props.variants[i]
			}
		}


		// let options = this.props.options.map((option, index)=> {
		// 	option.values = option.values.map((value)=> {
		// 		console.log(currentVariant[`option${index+1}`] === value)
		// 		return value
		// 	})
		// 	return option
		// })

		// console.log(options)
		

		return <Form action="/cart/add" method="post"
				onSubmit={this.addToCart.bind(this)}>

			{this.state.error &&
			<div className="alert alert--error medium_bottom">{this.state.error}</div>
			}

			<Input type="hidden" name="id" value={currentVariant.id} />

			{this.props.variants.length > 1 && this.props.options.map((option, index)=> (
			<Select key={option.name} name={option.name} label={option.name} 
				onChange={this.updateVariant.bind(this)}
				value={this.state[option.name]}
				options={option.values} />
			))}

			<button className="button--full" type="submit" disabled={!currentVariant.available}>Add to bag{currentVariant.available ? "" : " (Out of Stock)"}</button>
		</Form>
	}
}

