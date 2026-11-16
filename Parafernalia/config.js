window.SITE = {
  name: "NOMBRE",
  aviso: "Envíos discretos a todo el país. Venta solo a mayores de 18 años.",

  heroKicker: "> tienda online",
  heroTitle: "Todo para tu\nsetup y tu cultivo",
  heroSub: "Grow, accesorios y merch geek. Elegí, armá tu carrito y pedí por WhatsApp.",

  // Si ponés una foto, reemplaza la ventana de terminal. Dejala en "" para usar la terminal
  heroImg: "",
  heroAlt: "",
  terminal: [
    "$ buscar --tienda geek",
    "> 3 categorías encontradas",
    "$ stock --check",
    "> todo listo para enviar",
    "$ pedir --whatsapp"
  ],

  whatsapp: "5491130497635",
  direccion: "Tu dirección, Moreno",
  horarios: "Lunes a sábado de 11 a 20 hs",
  pagos: "Transferencia, efectivo o Mercado Pago. Lo coordinamos por WhatsApp.",
  envio: 4500,
  envioGratisDesde: 70000,

  // "variants" es opcional: cada clave es un menú de opciones (Talle, Color, Tamaño...).
  // Si el 2º valor de "Color" tiene foto, poné su foto en img2.
  products: [
    { id: "g1", cat: "Grow", name: "Carpa de cultivo", price: 85000, tag: "Nuevo",
      img: "img/carpa.jpg", desc: "Tela resistente, interior reflectante y ventanas de control.",
      variants: { "Tamaño": ["60x60", "80x80", "120x120"] } },
    { id: "g2", cat: "Grow", name: "Maceta textil", price: 6500,
      img: "img/maceta.jpg", desc: "Mejor drenaje y aireación para las raíces.",
      variants: { "Capacidad": ["5 L", "11 L", "20 L"] } },
    { id: "g3", cat: "Grow", name: "Sustrato premium 50 L", price: 14500,
      img: "img/sustrato.jpg", desc: "Mezcla aireada y lista para usar." },
    { id: "a1", cat: "Accesorios", name: "Moledor metálico", price: 9800,
      img: "img/moledor.jpg", img2: "img/moledor-violeta.jpg", desc: "Cuatro partes, aluminio anodizado.",
      variants: { "Color": ["Negro", "Violeta"] } },
    { id: "a2", cat: "Accesorios", name: "Bandeja para armar", price: 7200, priceOld: 8500,
      img: "img/bandeja.jpg", desc: "Diseño gamer, borde antideslizante." },
    { id: "n1", cat: "Anime", name: "Remera anime oversize", price: 21000, tag: "Nuevo",
      img: "img/remera.jpg", img2: "img/remera-blanca.jpg", desc: "Algodón, estampa en serigrafía.",
      variants: { "Talle": ["S", "M", "L", "XL"], "Color": ["Negro", "Blanco"] } },
    { id: "n2", cat: "Anime", name: "Figura coleccionable", price: 34000,
      img: "img/figura.jpg", desc: "PVC pintado a mano, 15 cm, con base." },
    { id: "n3", cat: "Anime", name: "Póster A3 x 3", price: 8500,
      img: "img/poster.jpg", desc: "Papel ilustración mate de 250 g." }
  ]
};
