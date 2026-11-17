window.SITE = {
  name: "NOMBRE",
  aviso: "Envíos discretos a todo el país. Venta solo a mayores de 18 años.",

  heroKicker: "> tienda online",
  heroTitle: "Todo para tu\nsetup y tu cultivo",
  heroSub: "Grow, accesorios y merch geek. Elegí, armá tu carrito y pedí por WhatsApp.",

  // Si ponés una foto, reemplaza la ventana de terminal. Dejala en "" para usar la terminal
  heroImg: "img/HeroTi.jpg",
  heroAlt: "Tienda Completa",
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

  // img      = portada del producto
  // varImgs  = foto de cada opción (mismo orden que en "variants")
  // gallery  = fotos de presentación (no van atadas a ningún botón)
  products: [
    { id: "g1", cat: "Grow", name: "Carpa de cultivo", price: 85000, tag: "Nuevo",
      img: "img/carpas.jpg",
      varImgs: { "Tamaño": ["img/carpa60.jpg", "img/carpa80.jpg", "img/carpa120.jpg"] },
      desc: "Tela resistente, interior reflectante y ventanas de control.",
      variants: { "Tamaño": ["60x60", "80x80", "120x120"] } },
    { id: "g2", cat: "Grow", name: "Maceta textil", price: 6500,
      img: "img/masetas.jpg",
      varImgs: { "Capacidad": ["img/mase5.jpg", "img/mase11.jpg", "img/mase20.jpg"] },
      desc: "Mejor drenaje y aireación para las raíces.",
      variants: { "Capacidad": ["5 L", "11 L", "20 L"] } },
    { id: "g3", cat: "Grow", name: "Sustrato premium 50 L", price: 14500,
      img: "img/sust.jpg", desc: "Mezcla aireada y lista para usar." },
    { id: "a1", cat: "Accesorios", name: "Moledor metálico", price: 9800,
      img: "img/pikaNgr.jpg",
      varImgs: { "Color": ["img/pikaNgr.jpg", "img/pikaVlt.jpg"] },
      gallery: ["img/pikas.jpg"],
      desc: "Cuatro partes, aluminio anodizado.",
      variants: { "Color": ["Negro", "Violeta"] } },
    { id: "a2", cat: "Accesorios", name: "Bandeja para armar", price: 7200, priceOld: 8500,
      img: "img/bandes.jpg", desc: "Diseño gamer, borde antideslizante." },
    { id: "n1", cat: "Anime", name: "Remera anime oversize", price: 21000, tag: "Nuevo",
      img: "img/remeNgr.jpg",
      varImgs: { "Color": ["img/remeNgr.jpg", "img/remeBlc.jpg"] },
      gallery: ["img/remes.jpg"],
      desc: "Algodón, estampa en serigrafía.",
      variants: { "Talle": ["S", "M", "L", "XL"], "Color": ["Negro", "Blanco"] } },
    { id: "n2", cat: "Anime", name: "Figura coleccionable", price: 34000,
      img: "img/figus.jpg",
      gallery: ["img/figuAnm.jpg", "img/figuSph.jpg"],
      desc: "PVC pintado a mano, 15 cm, con base." },
    { id: "n3", cat: "Anime", name: "Póster A3 x 3", price: 8500,
      img: "img/posters.jpg",
      gallery: ["img/posDtl.jpg", "img/posAnm.jpg", "img/posSph.jpg"],
      desc: "Papel ilustración mate de 250 g." }
  ]
};
