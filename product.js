products = {
	"products" : [
		{
			"name": "Cap",
			"price": "$19.99",
			"image": ["cap1.jpg", "cap2.jpg", "cap3.jpg"],
			"color" : ["black", "blue", "saddlebrown"],
			"size": ["10", "11", "12"],
		},
		{
			"name": "Glasses",
			"price": "$39.99",
			"image": ["glasses_blue.jpg", "glasses_orange.jpg", "glasses_purple.jpg"],
			"color" : ["cornflowerblue", "darksalmon", "purple"],
			"size": ["S", "M", "XL"]
		},
		{
			"name": "Starboy leather jacket",
			"price": "$29.99",
			"image": ["jacket1.jpg", "jacket2.jpg", "jacket3.jpg"],
			"color" : ["black", "blue", "saddlebrown"],
			"size": ["S", "M", "XL"]
		}
	]
};

//

let product_template_node = document.getElementsByClassName("product")[0];

let product_node = product_template_node.cloneNode(true);
product_template_node.after(product_node);
product_template_node.remove();

let product = products.products[0];
let current_image_node = product_node.getElementsByClassName('images-container')[0].getElementsByClassName('current-image')[0];
current_image_node.src = 'images/' + product.image[0];
