
export const Filters = {
	money(amount) {
		return (amount/100).toFixed(2) + " CAD"
	},

	imageURL(image, format) {
		return image.replace(/(\.[^.]*)$/, `_${format}$1`).replace('http:', '')
	}
}

