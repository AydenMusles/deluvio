



export class Cart {

	constructor() {
		this.state = {}
	}

	headers() {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}	
	}

	fetch() {
		return fetch("/cart.js", {
			headers: this.headers(),
			credentials: 'include',
			method: 'GET'
		}).then((response) => {
			return response.json()

		}).then((json) => {
			this.state = json

			return this
		})
	}

	add(id, quantity=1, data={}) {
		if (Turbolinks) {
			Turbolinks.controller.adapter.progressBar.setValue(0)
			Turbolinks.controller.adapter.progressBar.show()
		}
		
		data["id"] = id
		data["quantity"] = quantity

		return fetch("/cart/add.js", {
			headers: this.headers(),
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(data)
		}).then((response) => {
			if (response.ok) {
				return response.json().then((json) => {
					this.state = json

					if (Turbolinks) {
						Turbolinks.controller.adapter.progressBar.setValue(100)
						Turbolinks.controller.adapter.progressBar.hide()
					}

					return this
				})
			} else {
				return response.json().then((json) => {
					if (Turbolinks) {
						Turbolinks.controller.adapter.progressBar.setValue(100)
						Turbolinks.controller.adapter.progressBar.hide()
					}
					
					throw new Error(`${json.message}: ${json.description}`)
				})
			}
		})
	}

	change(id, quantity) {
		if (Turbolinks) {
			Turbolinks.controller.adapter.progressBar.setValue(0)
			Turbolinks.controller.adapter.progressBar.show()
		}

		return fetch("/cart/change.js", {
			headers: this.headers(),
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				id: id.toString(),
				quantity: quantity
			})
		}).then((response) => {
			return response.json()

		}).then((json) => {
			this.state = json

			if (Turbolinks) {
				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()
			}

			return this
		})
	}

	remove(id) {
		return this.change(id, 0)
	}
}
