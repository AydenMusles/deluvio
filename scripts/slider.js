

export class Slider extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			current: 0
		}
	}

	componentDidMount() {
		// if (this.props.autoplay) {
		// 	this.resetAutoplay()
		// }
	}

	componentWillUnmount() {
		this.clearAutoplay()
	}

	slideTo(event, index) {
		if (event) {
			event.preventDefault()
			event.currentTarget.blur()
		}

		this.setState({
			current: index
		})

		// this.resetAutoplay()
	}

	// resetAutoplay() {
	// 	this.clearAutoplay()
	// 	this.interval = window.setInterval(()=> {
	// 		this.nextSlide()
	// 	}, this.props.autoplay)
	// }

	// clearAutoplay() {
	// 	if (this.interval) {
	// 		window.clearInterval(this.interval)	
	// 	}
	// }

	nextSlide(event) {
		if (this.state.current == this.props.slides.length - 1) {
			this.slideTo(event, 0)
		} else {
			this.slideTo(event, this.state.current + 1)
		}
	}

	previousSlide(event) {
		if (this.state.current == 0) {
			this.slideTo(event, this.props.slides.length - 1)
		} else {
			this.slideTo(event, this.state.current - 1)
		}
	}

	

	render() {

		return <div>
			<div className="slider__container big_bottom" ref={(div)=>{this.container = div}} style={{width: (this.props.slides.length * 100)+"%"}}>
				{this.props.slides.map((slide, index)=> (
				<a onClick={this.nextSlide.bind(this)} className="slide" key={index} style={{
						width: (100 / this.props.slides.length)+"%",
						transform: `translateX(-${this.state.current}00%)`
					}}>
					<img src={slide.getAttribute("src")} alt={slide.getAttribute("alt")} />
				</a>
				))}
			</div>

			<h4>{this.state.current + 1} of {this.props.slides.length}</h4>
		</div>
	}
}

