const API_DOMAIN = "http://localhost:3000";

async function get() {
  try {
    const response = await fetch(`${API_DOMAIN}/orders`);

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    throw new Error(`Erro ao buscar os pedidos: ${error.message}`);
  }
}

async function save({
  id = null,
  customer,
  location,
  orderDate,
  status,
  netAmount,
}) {
  try {
    const response = await fetch(`${API_DOMAIN}/orders`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        id,
        customer,
        location,
        orderDate,
        status,
        netAmount,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    throw new Error(`Erro ao salvar o pedido: ${error.message}`);
  }
}

function edit({ id = null, customer, location, orderDate, status, netAmount }) {
  return get();
}
