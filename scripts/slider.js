

export class Slider extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			current: 0
		}
	}

	slideTo(event, index) {
		if (event) {
			event.preventDefault()
			event.currentTarget.blur()
		}

		this.setState({
			current: index
		})

		this.resetAutoplay()
	}

	componentDidMount() {
		if (this.props.autoplay) {
			this.resetAutoplay()
		}
	}

	componentWillUnmount() {
		this.clearAutoplay()
	}

	resetAutoplay() {
		this.clearAutoplay()
		this.interval = window.setInterval(()=> {
			this.nextSlide()
		}, this.props.autoplay)
	}

	clearAutoplay() {
		if (this.interval) {
			window.clearInterval(this.interval)	
		}
	}

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
				<div className="slide" key={index} style={{
						width: (100 / this.props.slides.length)+"%",
						transform: `translateX(-${this.state.current}00%)`
					}}>
					<h2>
						{slide.link &&
						<a href={slide.link} target="_blank">{slide.body}</a>
						||
						<span>{slide.body}</span>
						}
					</h2>
				</div>
				))}
			</div>

			<div className="grid grid--guttered grid--middle grid--center">
				{this.props.slides.map((slide, index)=> (
				<div className="col" key={index}>
					<a href={slide.link} target="_blank"
						className="inline_block"
						style={{opacity: this.state.current == index ? 1 : 0.2 }}
						onClick={(event)=> {this.slideTo(event, index)}}><img src={slide.image} className="img--auto" /></a>
				</div>
				))}
			</div>
		</div>
	}
}

