


export class Form extends React.Component {

	onSubmit(e) {
		if (this.props.onSubmit) {
			e.preventDefault()
			this.props.onSubmit(e, this.state)
		}
	}

	onChange(e) {
	}


	render() {
		return (
			<form className={this.props.className} action={this.props.action} method={this.props.method} 
				onSubmit={this.onSubmit.bind(this)}>
				{this.props.children}
			</form>
		)
	}
}