import constants from "./constants";

const connector = {
  getCoinInventory: () => {
    return fetch(buildRoute(`coins`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  },

  addCoin: (coin) => {
    return fetch(buildRoute(`coins`), {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coin)
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  },

  removeCoin: (value) => {
    return fetch(buildRoute(`coins/${value}`), {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  },

  getProductInventory: () => {
    return fetch(buildRoute(`products`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  },

  addProduct: (product) => {
    return fetch(buildRoute(`products`), {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  },

  removeProduct: (id) => {
    return fetch(buildRoute(`products/${id}`), {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  },

  buyProduct: (id) => {
    return fetch(buildRoute(`products/${id}/buy`), {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' }
    }).then(handleError)
      .catch(error => {
      console.log(error);
    });
  }
}

function buildRoute(suffix) {
  const { serverHost, serverPort } = constants;
  return `http://${serverHost}:${serverPort}/${suffix}`
}

function handleError(response) {
  if (!response.ok) throw Error(response.statusText);
  return response.json();
}

export default connector;