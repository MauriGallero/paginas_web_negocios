window.SITE = {
  name: "Nombre del restaurante",
  tagline: "Cocina casera, pedí en un minuto y retirá o recibí en tu casa.",
    heroImg: "hamburguesa.jpg",
  heroAlt: "Hamburguesa con crema de trufa y pan brioche, sostenida con las dos manos",

  // Número con código de país, sin + ni espacios
  whatsapp: "5491130497635",

  // Link de la página del local en PedidosYa. Dejalo vacío ("") para ocultar el botón
  pedidosYa: "https://www.pedidosya.com.ar/",

  direccion: "Tu dirección, Moreno",
  horarios: "Martes a domingo de 19 a 23:30 hs",
  envio: 1500,                         // costo de envío. Poné 0 si es gratis
  pagos: "Efectivo, transferencia o Mercado Pago. Lo coordinamos por WhatsApp.",

  // Cada plato necesita un "id" único. "img" es opcional (ej: "img/hamburguesa.jpg")
  categories: [
    { name: "Hamburguesas", items: [
      { id: "h1", name: "Clásica", desc: "Carne, queso cheddar, lechuga y tomate.", price: 9500, img: "clasica.jpg" },
      { id: "h2", name: "Doble bacon", desc: "Doble carne, bacon, cheddar y salsa de la casa.", price: 12500, img: "doble.jpg" },
      { id: "h3", name: "Veggie", desc: "Medallón de garbanzos, rúcula y palta.", price: 9000, img: "veggie.jpg" }
    ]},
    { name: "Pizzas", items: [
      { id: "p1", name: "Muzzarella", desc: "Salsa de tomate y muzzarella.", price: 8500, img: "muzza.jpg" },
      { id: "p2", name: "Fugazzeta", desc: "Cebolla, muzzarella y aceitunas.", price: 10500, img: "fugazzeta.jpg" }
    ]},
    { name: "Bebidas", items: [
      { id: "b1", name: "Gaseosa 500 ml", desc: "", price: 2500, img: "cola.jpg" },
      { id: "b2", name: "Cerveza artesanal", desc: "Lata 473 ml.", price: 3800, img: "birra.jpg" }
    ]}
  ]
};
