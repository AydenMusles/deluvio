

export const Select = props => {
	return <div>
		{props.label && <label htmlFor={props.name}>{props.label}</label>}
		<select id={props.name} 
			name={props.name}
			defaultValue={props.value}
			onChange={(event)=> {
				event.currentTarget.label = event.currentTarget.options[event.currentTarget.selectedIndex].innerHTML
				props.onChange(event)
			}}>
			{props.children}
		</select>
	</div>
}