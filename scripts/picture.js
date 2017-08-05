
import { Filters } from './filters.js';

export const Picture = props => {
	return <picture onLoad={props.onLoad}>
		<source srcSet={Filters.imageURL(props.src, "666x")} media="(max-width: 600px)" />
		<source srcSet={Filters.imageURL(props.src, "1111x")} media="(max-width: 900px)" />
		<img src={Filters.imageURL(props.src, "1666x")} alt={props.alt} />
	</picture>
}

