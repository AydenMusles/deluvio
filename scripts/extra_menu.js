
import { Filters } from './filters.js';
import { Overlay } from './overlay.js';


export class ExtraMenu extends Overlay {

	constructor(props) {
		super(props)
	}

	render() {
		
		return <span className={`tooltip_container ${this.state.showed && "tooltip_container--show"}`}>
			<button className="nav__extra_menu_button"
				ref={(button)=> {this.button = button}}
				onClick={this.toggle.bind(this)}><svg className="icon" dangerouslySetInnerHTML={{__html: `<use xlink:href="#icon-ellipsis" />`}} /></button>
			<div className="nav__extra_menu normal_top">
				{this.props.links.map((link)=> (
				<a className={`nav__extra_menu__link ${link.phone_only && "tablet_portrait_only"}`}
					href={link.url} key={link.url}>{link.title}</a>
				))}
			</div>
		</span>
	}
}
