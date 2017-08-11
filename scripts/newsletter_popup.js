
import { Cookies } from './cookies.js';

import { Form } from './form.js';
import { Input } from './input.js';


export class NewsletterPopup extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showed: false,
			success: false,
			error: false
		}
	}

	componentDidMount() {
		if (!Cookies.get("newsletter_hidden")) {
			if (this.props.delay != "never") {
				setTimeout(()=>{
					this.show()
				}, parseInt(this.props.delay)*1000)
			}
		}
	}

	componentWillUnmount() {

	}

	signup(event) {
		event.preventDefault()

		if (Turbolinks) {
			Turbolinks.controller.adapter.progressBar.setValue(0)
			Turbolinks.controller.adapter.progressBar.show()
		}

		return fetch("https://shopify.destruct.codes/_newsletter/signup", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email: event.currentTarget["email"].value,
				shop: event.currentTarget["shop"].value
			})
		}).then((response) => {
			if (Turbolinks) {
				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()
			}

			if (response.ok) {
				return response.json()
			} else {
				return response.json().then((json) => {
					throw new Error(json.error)	
				})
			}

		}).then((json) => {
			Cookies.set("newsletter_hidden", true)
			this.setState({success: true})
			
			return this

		}).catch((error) => {
			this.setState({error: error.message})

			return this
		})
	}


	show(event, product) {
		if (event) {
			event.preventDefault()
			event.currentTarget.blur()
		}

		this.setState({showed: true})
	}

	hide(event) {
		if (event) {
			event.currentTarget.blur()
		}

		this.setState({showed: false})
		Cookies.set("newsletter_hidden", true)
	}


	render() {

		return <div className={`newsletter ${this.state.showed && "overlay--show"} hide_on_phone`}>
			<button className="button--transparent newsletter__close" onClick={this.hide.bind(this)}>close</button>

			<div className="newsletter__container padded">
				<p>{this.props.body}</p>
				<div className="normal_bottom"><img src={this.props.image} /></div>
			

				{this.state.success &&
				<p className="highlight">{this.props.success}</p>
				||
				<Form onSubmit={this.signup.bind(this)} className="grid grid--tight_guttered grid--bottom">
					<div className="col col--12of12">
						<p>{this.props.title}</p>
					</div>
					{this.state.error && 
					<div className="col col--12of12"><div className="alert alert--error">{this.state.error}</div></div>
					}
					<div className="col col--12of12">
						<Input type="hidden" name="shop" value={this.props.shop} />
						<Input type="email" className="flat_bottom" name="email" placeholder="info@deluvio.com" required />
					</div>
					<div className="col col--12of12">
						<button className="button--full button--bordered" type="submit">{this.props.cta}</button>
					</div>
				</Form>
				}
			</div>
		</div>
	}
}

