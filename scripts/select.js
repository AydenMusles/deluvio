

export class Select extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			focused: false,
			value: this.props.value ? this.props.value : this.props.options[0],
			index: this.props.value ? this.props.options.indexOf(this.props.value) : 0
		}
	}

	toggle(e) {
		this.setState({
			focused: !this.state.focused
		})
	}

	change(e, value, index) {

		this.props.onChange({currentTarget: {
			name: this.props.name,
			value: value
		}})

		if (this.state.focused) {
			this.setState({
				value: value,
				index: index
			})
		}
	}

	render() {

		return <div>
			{this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
			<div className={`select${this.state.focused ? " select--focused" : ""}`}
				onClick={this.toggle.bind(this)}>
				<div className="options">
					{this.props.options.map((option, index)=> (
					<div key={index} className={`option${this.state.value == option ? " option--current" : ""}`}
						onClick={(e)=> { this.change(e, option, index) } }>
						{option}
					</div>
					))}
				</div>

				<input type="text" id={this.props.name} 
					name={this.props.name}
					readOnly
					value={this.state.value} />
			</div>
		</div>
	}
}