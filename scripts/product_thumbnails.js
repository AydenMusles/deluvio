
import { Filters } from './filters.js';
import { Picture } from './picture.js';


export class ProductThumbnails extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			featured: props.featured
		}
	}

	updateFeaturedThumbnail(event, featured) {
		event.preventDefault()
		event.currentTarget.blur()

		if (featured != this.state.featured) {
			this.setState({
				featured: featured
			})

			if (Turbolinks) {
				Turbolinks.controller.adapter.progressBar.setValue(0)
				Turbolinks.controller.adapter.progressBar.show()
			}
		}
	}

	featuredLoaded(event) {
		if (Turbolinks) {
			Turbolinks.controller.adapter.progressBar.setValue(100)
			Turbolinks.controller.adapter.progressBar.hide()
		}
	}


	render() {
		
		return <div className="grid grid--guttered">
			<div className="col col--2of12 col--tablet_portrait--12of12 product__thumbnails">
				{this.props.thumbnails.map((thumbnail, index)=> (
				<a href={thumbnail.master} target="_blank"
					key={index}
					onClick={(event)=> {this.updateFeaturedThumbnail(event, thumbnail.src)}}
					className={`product__thumbnail ${this.state.featured != thumbnail.src && "product__thumbnail--fade"}`}>
					<img src={thumbnail.thumbnail} alt={thumbnail.alt} className="normal_bottom" />
				</a>
				))}
			</div>

			<div className="col col--10of12 col--tablet_portrait--12of12 col--tablet_portrait--first">
				{this.props.thumbnails.map((thumbnail, index)=> (
				<div key={index}>
					{this.state.featured == thumbnail.src &&
					<Picture src={thumbnail.master} alt={thumbnail.alt} onLoad={this.featuredLoaded.bind(this)} />
					}
				</div>
				))}
			</div>
		</div>
	}
}

