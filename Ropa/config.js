window.SITE = {
  name: "NOMBRE",
  aviso: "Envíos a todo el país. Cambios sin cargo en los primeros 15 días.",

  // Usá \n para cortar el título en dos líneas
  heroTitle: "Nueva\ncolección",
  heroSub: "Prendas pensadas para destacar. Elegí tu talle y pedí por WhatsApp.",
  heroImg: "img/hero.jpg",          // foto horizontal, mínimo 1600 px de ancho

  whatsapp: "5491130497635",        // con código de país, sin + ni espacios
  direccion: "Tu dirección, Moreno",
  horarios: "Lunes a sábado de 10 a 20 hs",
  pagos: "Transferencia, efectivo o Mercado Pago. Lo coordinamos por WhatsApp.",
  envio: 4500,                      // costo de envío. Poné 0 si es gratis
  envioGratisDesde: 60000,          // monto para envío gratis. Poné 0 para desactivar

  // Cada prenda necesita un "id" único.
  // img e img2 son opcionales (img2 aparece al pasar el mouse).
  // priceOld y tag son opcionales. Sin sizes o colors, no se pide elegir.
  products: [
    { id: "r1", cat: "Remeras", name: "Remera oversize", price: 18000, tag: "Nuevo",
      img: "img/remera1.jpg", img2: "img/remera1b.jpg",
      desc: "Algodón peinado de 220 g. Calce amplio.",
      sizes: ["S", "M", "L", "XL"], colors: ["Negro", "Blanco"] },
    { id: "r2", cat: "Remeras", name: "Remera gráfica", price: 16500,
      img: "img/remera2.jpg", desc: "Estampa en serigrafía.",
      sizes: ["S", "M", "L"], colors: ["Negro"] },
    { id: "p1", cat: "Pantalones", name: "Cargo wide", price: 42000, priceOld: 48000,
      img: "img/cargo1.jpg", desc: "Corte amplio, seis bolsillos y tela resistente.",
      sizes: ["38", "40", "42", "44"], colors: ["Verde", "Negro"] },
    { id: "p2", cat: "Pantalones", name: "Jean recto", price: 39000,
      img: "img/jean1.jpg", desc: "Denim rígido, tiro medio.",
      sizes: ["38", "40", "42", "44"], colors: ["Azul"] },
    { id: "c1", cat: "Abrigos", name: "Campera bomber", price: 68000, tag: "Nuevo",
      img: "img/bomber1.jpg", desc: "Forro interno y puños elásticos.",
      sizes: ["S", "M", "L"], colors: ["Negro", "Beige"] },
    { id: "a1", cat: "Accesorios", name: "Gorra dad hat", price: 9500,
      img: "img/gorra1.jpg", desc: "Visera curva, ajuste trasero.",
      colors: ["Negro", "Blanco"] }
  ]
};
