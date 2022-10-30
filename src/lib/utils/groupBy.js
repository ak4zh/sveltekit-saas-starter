export const groupPricesByProducts = function (prices) {
	return prices
		.filter((e) => e.product.active)
		.reduce(function (product, price) {
			(product[price['product']['id']] = product[price['product']['id']] || []).push(price);
			return product;
		}, {});
};

export const groupProductsByInterval = function (prices) {
	return prices.reduce(function (product, price) {
		(product[price['recurring']['interval']] = product[price['recurring']['interval']] || []).push(
			price
		);
		return product;
	}, {});
};
