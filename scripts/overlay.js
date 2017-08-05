


export class Overlay extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			showed: false
		}
	}

	componentDidMount() {
		document.addEventListener("click", this.hide.bind(this))
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.hide)
	}

	toggle(event) {
		event.nativeEvent.stopImmediatePropagation()	
		event.preventDefault()
		// event.currentTarget.blur()

		this.setState({showed: !this.state.showed})
	}

	hide(event) {
		if (this.state.showed) {
			this.setState({showed: false})
		}
	}
}
