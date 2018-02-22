
import { Cart } from './cart.js'

import { CartPopup } from './cart_popup.js'
import { ExtraMenu } from './extra_menu.js'
import { ProductAddToCart } from './product_add_to_cart.js'
import { ProductThumbnails } from './product_thumbnails.js'
import { ProductQuickview } from './product_quickview.js'
import { NewsletterPopup } from './newsletter_popup.js'
import { Slider } from './slider.js'


if (module.hot)
	module.hot.accept()




const Unsplash = {
	init() {
		this.cart = new Cart()
		this.renderCart()
		this.renderMenu()
		this.renderNewsletter()
		this.render()
	},

	renderCart() {
		const cartPopup = document.getElementById("cart")
		if (cartPopup) {
			ReactDOM.render(
				<CartPopup cart={this.cart} ref={(popup)=>{this.cartPopup = popup}}
					icon={cartPopup.getAttribute("data-cart-icon")} />, cartPopup
			)
		}
	},

	renderMenu() {
		const extra_menu = document.getElementById("extra_menu")
		if (extra_menu) {
			ReactDOM.render(
				<ExtraMenu links={JSON.parse(extra_menu.getAttribute("data-links"))["links"]} />, extra_menu
			)
		}
	},

	renderNewsletter() {
		const newsletterPopup = document.getElementById("newsletter")
		if (newsletterPopup) {
			ReactDOM.render(
				<NewsletterPopup ref={(popup)=>{this.newsletterPopup = popup}}
					shop={newsletterPopup.getAttribute("data-newsletter-shop")}
					delay={newsletterPopup.getAttribute("data-newsletter-delay")}
					title={newsletterPopup.getAttribute("data-newsletter-title")}
					body={newsletterPopup.getAttribute("data-newsletter-body")}
					image={newsletterPopup.getAttribute("data-newsletter-image")}
					cta={newsletterPopup.getAttribute("data-newsletter-cta")}
					success={newsletterPopup.getAttribute("data-newsletter-success")} />, newsletterPopup
			)
		}
	},

	render() {
		if (window.innerWidth > 800) {
			const quickview = document.getElementById("quickview")
			if (quickview) {
				ReactDOM.render(
					<ProductQuickview
						cart={this.cart}
						cartPopup={this.cartPopup} />, quickview
				)
			}
		}

		const add = document.getElementById("add_to_cart")
		if (add) {
			ReactDOM.render(
				<ProductAddToCart
					currentVariant={JSON.parse(add.getAttribute("data-current-variant"))}
					variants={JSON.parse(add.getAttribute("data-variants"))}
					options={JSON.parse(add.getAttribute("data-options"))}
					cart={this.cart}
					cartPopup={this.cartPopup} />, add
			)
		}

		const thumbnails = document.querySelectorAll("[data-thumbnails]")
		if (thumbnails.length > 0) {
			for (var i = thumbnails.length - 1; i >= 0; i--) {
				let thumbnailsList = []
				const thumbnailsSelector = thumbnails[i].querySelectorAll("[data-thumbnail]")
				for (var j = 0; j < thumbnailsSelector.length; j++) {
					thumbnailsList.push(JSON.parse(thumbnailsSelector[j].getAttribute("data-thumbnail")))
				}

				ReactDOM.render(
					<ProductThumbnails
						featured={thumbnails[i].getAttribute("data-featured")}
						thumbnails={thumbnailsList} />, thumbnails[i]
				)
			}
		}

		const sliders = document.querySelectorAll("[data-slider]")
		if (sliders.length > 0) {
			const parser = new DOMParser()
			for (var i = sliders.length - 1; i >= 0; i--) {
				const content = parser.parseFromString(sliders[i].getAttribute("data-slides"), "text/html")

				ReactDOM.render(
					<Slider 
						autoplay={sliders[i].getAttribute("data-slider-autoplay")}
						slides={Array.from(content.getElementsByTagName("img"))} />, sliders[i]
				)
			}
		}


		this.scroll_tos = document.querySelectorAll("[data-scroll-to]")
		for (var i = 0; i < this.scroll_tos.length; i++) {
			this.scroll_tos[i].addEventListener("click", (event)=> {
				event.preventDefault()

				const scroll_to = document.getElementById(event.currentTarget.getAttribute("data-scroll-to"))

				if (scroll_to) {
					Velocity(scroll_to, "scroll", { duration: 1666, easing: "easeOutQuart", offset: -66 })
				}
			})
		}
	},

	destroy() {
		const elements = document.querySelectorAll("[data-reactroot]")
		if (elements.length > 0) {
			for (var i = elements.length - 1; i >= 0; i--) {
				if (!elements[i].parentNode.hasAttribute("data-turbolinks-permanent")) {
					ReactDOM.unmountComponentAtNode(elements[i].parentNode)	
				}
			}
		}
	}
}

Unsplash.destroy()
Unsplash.init()
document.addEventListener("turbolinks:load", ()=> {
	Unsplash.render()
})
document.addEventListener("turbolinks:before-render", ()=> {
	Unsplash.destroy()
})
			
