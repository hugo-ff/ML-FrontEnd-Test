const request = require('request'),
      errorApi = require('./error')

module.exports = function(req, res) {
  const query = req.query.q || ''
  request(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`, function(error, response, body) {
    if (!error) {
      let data = JSON.parse(body)
      //Categorias
      if (data.results) {
        let categories = []

        if (data.filters[0] && data.filters[0].values[0]) {
          categories = data.filters[0].values[0].path_from_root.map(category => category.name)
        }

        //Items
        let items = data.results.slice(0, 4)
        items = items.map(item => {
          const amount = Math.floor(item.price),
            decimals = +(item.price % 1).toFixed(2).substring(2)

          return {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount,
              decimals
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping ? item.shipping.free_shipping : false,
            address: item.address ? item.address.state_name : ''
          }
        })

        //Lista de resultados
        const results = {
          author: {
            name: 'Hugo',
            lastname: 'Flotts'
          },
          categories,
          items
        }
        res.send(results)
      }
    } else {
      res.send(errorApi)
    }
  })
}