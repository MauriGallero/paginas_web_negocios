(function () {
  var S = window.SITE;
  var $ = function (s) { return document.querySelector(s); };
  var money = function (n) { return "$" + Number(n).toLocaleString("es-AR"); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  var items = {};
  S.categories.forEach(function (c) { c.items.forEach(function (i) { items[i.id] = i; }); });

  var cart = {};
  try { cart = JSON.parse(localStorage.getItem("cart") || "{}"); } catch (e) {}
  Object.keys(cart).forEach(function (id) { if (!items[id]) delete cart[id]; });
  var save = function () { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} };

  /* Datos del local */
  document.title = S.name + " | Carta y pedidos";
  $("#name").textContent = S.name;
  $("#tagline").textContent = S.tagline;
    if (S.heroImg) {
    var hi = $("#hero-img");
    hi.src = S.heroImg;
    hi.alt = S.heroAlt || "";
    hi.hidden = false;
    $(".hero-grid").classList.add("with-img");
  }
  $("#info").textContent = S.horarios + ". " + S.direccion;
  if (S.pedidosYa) { var py = $("#pedidosya"); py.href = S.pedidosYa; py.hidden = false; }
  $("#foot").innerHTML = "<p><strong>" + esc(S.name) + "</strong></p><p>" + esc(S.direccion) +
    "</p><p>" + esc(S.horarios) + "</p><p>" + esc(S.pagos) + "</p>";

  /* Carta */
  $("#chips").innerHTML = S.categories.map(function (c, k) {
    return '<a href="#cat' + k + '">' + esc(c.name) + "</a>";
  }).join("");
  $("#menu").innerHTML = S.categories.map(function (c, k) {
    return '<section class="cat" id="cat' + k + '"><h2>' + esc(c.name) + "</h2>" +
      c.items.map(function (i) {
        return '<article class="dish"><div class="dish-txt"><h3>' + esc(i.name) + "</h3>" +
          (i.desc ? "<p>" + esc(i.desc) + "</p>" : "") +
          '<span class="price">' + money(i.price) + "</span></div>" +
          (i.img ? '<img src="' + esc(i.img) + '" alt="" loading="lazy">' : "") +
          '<button type="button" class="btn btn-add" data-add="' + esc(i.id) + '">Agregar</button></article>';
      }).join("") + "</section>";
  }).join("");

  /* Carrito */
  var mode = function () { return document.querySelector('input[name="mode"]:checked').value; };
  var subtotal = function () {
    return Object.keys(cart).reduce(function (t, id) { return t + items[id].price * cart[id]; }, 0);
  };

  function render() {
    var ids = Object.keys(cart);
    var n = ids.reduce(function (t, id) { return t + cart[id]; }, 0);
    $("#count").textContent = n;
    $("#lines").innerHTML = ids.length ? ids.map(function (id) {
      var i = items[id];
      return '<div class="line"><div><strong>' + esc(i.name) + "</strong><span>" + money(i.price) +
        '</span></div><div class="qty"><button type="button" data-minus="' + esc(id) +
        '" aria-label="Quitar uno">−</button><b>' + cart[id] +
        '</b><button type="button" data-plus="' + esc(id) + '" aria-label="Agregar uno">+</button></div></div>';
    }).join("") : '<p class="empty">Todavía no agregaste nada. Elegí tus platos de la carta.</p>';
    $("#checkout").hidden = !ids.length;
    $("#send").disabled = !ids.length;
    var sub = subtotal(), env = ids.length && mode() === "envio" ? S.envio : 0;
    $("#totals").innerHTML = ids.length
      ? "<div><span>Subtotal</span><span>" + money(sub) + "</span></div>" +
        (mode() === "envio" ? "<div><span>Envío</span><span>" + (env ? money(env) : "Gratis") + "</span></div>" : "") +
        "<div class='total'><span>Total</span><span>" + money(sub + env) + "</span></div>"
      : "";
    $("#addr-wrap").hidden = mode() !== "envio";
    save();
  }

  var open = function (v) {
    $("#drawer").classList.toggle("open", v);
    $("#overlay").classList.toggle("open", v);
    $("#drawer").setAttribute("aria-hidden", v ? "false" : "true");
    document.body.classList.toggle("lock", v);
  };

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.dataset.add) { cart[t.dataset.add] = (cart[t.dataset.add] || 0) + 1; render(); t.textContent = "Agregado"; setTimeout(function () { t.textContent = "Agregar"; }, 900); }
    if (t.dataset.plus) { cart[t.dataset.plus]++; render(); }
    if (t.dataset.minus) { if (--cart[t.dataset.minus] <= 0) delete cart[t.dataset.minus]; render(); }
  });
  $("#open-cart").onclick = function () { open(true); };
  $("#close-cart").onclick = $("#overlay").onclick = function () { open(false); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
  document.querySelectorAll('input[name="mode"]').forEach(function (r) { r.onchange = render; });

  $("#send").onclick = function () {
    var name = $("#f-name").value.trim(), addr = $("#f-addr").value.trim(), err = $("#err");
    err.textContent = "";
    if (!name) { err.textContent = "Escribí tu nombre para enviar el pedido."; return; }
    if (mode() === "envio" && !addr) { err.textContent = "Escribí la dirección de entrega."; return; }
    var env = mode() === "envio" ? S.envio : 0;
    var msg = "Hola! Quiero hacer este pedido:\n\n" +
      Object.keys(cart).map(function (id) { return cart[id] + " x " + items[id].name + " (" + money(items[id].price * cart[id]) + ")"; }).join("\n") +
      "\n\nSubtotal: " + money(subtotal()) +
      (mode() === "envio" ? "\nEnvío: " + (env ? money(env) : "Gratis") : "") +
      "\nTotal: " + money(subtotal() + env) +
      "\n\nNombre: " + name +
      "\nEntrega: " + (mode() === "envio" ? "Envío a " + addr : "Retiro en el local") +
      ($("#f-note").value.trim() ? "\nAclaraciones: " + $("#f-note").value.trim() : "");
    window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  render();
})();
