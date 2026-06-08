   export const salePrice = (product, client) => {
      const isSale = !!product?.price2 
      if (!product) {
        return null
      }
      return isSale ? product.price : client?.discount ? Math.ceil(product.price * (100 - client.discount) / 100) : product.price
    }
    