(function () {
  var S = window.SITE;
  var $ = function (s) { return document.querySelector(s); };
  var money = function (n) { return "$" + Number(n).toLocaleString("es-AR"); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var P = {};
  S.products.forEach(function (p) { P[p.id] = p; });

  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart-moda") || "[]"); } catch (e) {}
  cart = cart.filter(function (l) { return P[l.id]; });
  var save = function () { try { localStorage.setItem("cart-moda", JSON.stringify(cart)); } catch (e) {} };

  /* Datos del local */
  document.title = S.name + " | Tienda";
  if (S.aviso) { $("#aviso").textContent = S.aviso; } else { $("#aviso").hidden = true; }
  $("#brand").textContent = S.name;
  $("#h-title").innerHTML = esc(S.heroTitle).replace(/\n/g, "<br>");
  $("#h-sub").textContent = S.heroSub;
  if (S.heroImg) {
    $("#hero").style.backgroundImage = 'linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.12)),url("' + S.heroImg + '")';
  }
  $("#foot").innerHTML = "<p><strong>" + esc(S.name) + "</strong></p><p>" + esc(S.direccion) +
    "</p><p>" + esc(S.horarios) + "</p><p>" + esc(S.pagos) + "</p>";

  /* Catálogo */
  var cats = ["Todo"], current = "Todo";
  S.products.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });

  function card(p) {
    var ph = p.img
      ? '<img src="' + esc(p.img) + '" alt="" loading="lazy">' + (p.img2 ? '<img class="alt" src="' + esc(p.img2) + '" alt="" loading="lazy">' : "")
      : "<span>" + esc(p.name) + "</span>";
    return '<button type="button" class="card" data-open="' + esc(p.id) + '"><span class="ph">' + ph +
      (p.tag ? '<em class="tag">' + esc(p.tag) + "</em>" : "") + '</span><span class="name">' + esc(p.name) +
      '</span><span class="pr">' + (p.priceOld ? "<s>" + money(p.priceOld) + "</s> " : "") + money(p.price) + "</span></button>";
  }
  function renderGrid() {
    $("#filters").innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip' + (c === current ? " on" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    $("#grid").innerHTML = S.products.filter(function (p) { return current === "Todo" || p.cat === current; }).map(card).join("");
  }

  /* Ficha de producto */
  var dlg = $("#pdp"), cur = null, selS = "", selC = "";
  function opts(list, type, sel) {
    return list.map(function (v) {
      return '<button type="button" class="opt' + (v === sel ? " on" : "") + '" data-' + type + '="' + esc(v) + '" aria-pressed="' + (v === sel) + '">' + esc(v) + "</button>";
    }).join("");
  }
  function renderPdp() {
    $("#pdp-sizes").innerHTML = cur.sizes && cur.sizes.length ? '<p class="lbl">Talle</p><div class="opts">' + opts(cur.sizes, "size", selS) + "</div>" : "";
    $("#pdp-colors").innerHTML = cur.colors && cur.colors.length ? '<p class="lbl">Color</p><div class="opts">' + opts(cur.colors, "color", selC) + "</div>" : "";
  }
  function openPdp(id) {
    cur = P[id];
    selS = cur.sizes && cur.sizes.length === 1 ? cur.sizes[0] : "";
    selC = cur.colors && cur.colors.length === 1 ? cur.colors[0] : "";
    $("#pdp-img").innerHTML = cur.img ? '<img src="' + esc(cur.img) + '" alt="' + esc(cur.name) + '">' : "<span>" + esc(cur.name) + "</span>";
    $("#pdp-name").textContent = cur.name;
    $("#pdp-price").innerHTML = (cur.priceOld ? "<s>" + money(cur.priceOld) + "</s> " : "") + money(cur.price);
    $("#pdp-desc").textContent = cur.desc || "";
    $("#pdp-err").textContent = "";
    renderPdp();
    dlg.showModal();
  }
  $("#pdp-add").onclick = function () {
    if (cur.sizes && cur.sizes.length && !selS) { $("#pdp-err").textContent = "Elegí un talle."; return; }
    if (cur.colors && cur.colors.length && !selC) { $("#pdp-err").textContent = "Elegí un color."; return; }
    var k = cur.id + "|" + selS + "|" + selC;
    var l = cart.filter(function (x) { return x.k === k; })[0];
    if (l) { l.qty++; } else { cart.push({ k: k, id: cur.id, size: selS, color: selC, qty: 1 }); }
    dlg.close();
    render();
    open(true);
  };

  /* Bolsa */
  var mode = function () { return document.querySelector('input[name="mode"]:checked').value; };
  var sub = function () { return cart.reduce(function (t, l) { return t + P[l.id].price * l.qty; }, 0); };
  var ship = function () {
    if (mode() !== "envio" || !cart.length) return 0;
    return S.envioGratisDesde && sub() >= S.envioGratisDesde ? 0 : S.envio;
  };
  function variant(l) { return [l.size && "Talle " + l.size, l.color].filter(Boolean).join(", "); }

  function render() {
    $("#count").textContent = cart.reduce(function (t, l) { return t + l.qty; }, 0);
    $("#lines").innerHTML = cart.length ? cart.map(function (l) {
      var p = P[l.id], v = variant(l);
      return '<div class="line"><div><strong>' + esc(p.name) + "</strong>" + (v ? "<span>" + esc(v) + "</span>" : "") +
        "<span>" + money(p.price) + '</span></div><div class="qty"><button type="button" data-minus="' + esc(l.k) +
        '" aria-label="Quitar uno">−</button><b>' + l.qty + '</b><button type="button" data-plus="' + esc(l.k) +
        '" aria-label="Agregar uno">+</button></div></div>';
    }).join("") : '<p class="empty">Tu bolsa está vacía. Elegí algo de la colección.</p>';
    $("#checkout").hidden = !cart.length;
    $("#send").disabled = !cart.length;
    $("#addr-wrap").hidden = mode() !== "envio";
    var s = sub(), e = ship(), hint = "";
    if (cart.length && mode() === "envio" && S.envioGratisDesde && s < S.envioGratisDesde) {
      hint = '<p class="hint">Te faltan ' + money(S.envioGratisDesde - s) + " para el envío gratis.</p>";
    }
    $("#totals").innerHTML = cart.length
      ? hint + "<div><span>Subtotal</span><span>" + money(s) + "</span></div>" +
        (mode() === "envio" ? "<div><span>Envío</span><span>" + (e ? money(e) : "Gratis") + "</span></div>" : "") +
        '<div class="total"><span>Total</span><span>' + money(s + e) + "</span></div>"
      : "";
    save();
  }

  function open(v) {
    $("#drawer").classList.toggle("open", v);
    $("#overlay").classList.toggle("open", v);
    $("#drawer").setAttribute("aria-hidden", v ? "false" : "true");
    document.body.classList.toggle("lock", v);
  }

  document.addEventListener("click", function (e) {
    if (e.target === dlg || e.target.closest("[data-close]")) { dlg.close(); return; }
    var t = e.target.closest("[data-open],[data-cat],[data-size],[data-color],[data-plus],[data-minus]");
    if (!t) return;
    var d = t.dataset;
    if (d.open) { openPdp(d.open); }
    else if (d.cat) { current = d.cat; renderGrid(); }
    else if (d.size !== undefined) { selS = d.size; renderPdp(); }
    else if (d.color !== undefined) { selC = d.color; renderPdp(); }
    else {
      var k = d.plus || d.minus;
      var l = cart.filter(function (x) { return x.k === k; })[0];
      if (!l) return;
      l.qty += d.plus ? 1 : -1;
      if (l.qty <= 0) cart.splice(cart.indexOf(l), 1);
      render();
    }
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
    var e = ship();
    var msg = "Hola! Quiero hacer este pedido:\n\n" +
      cart.map(function (l) {
        var v = variant(l);
        return l.qty + " x " + P[l.id].name + (v ? " (" + v + ")" : "") + " - " + money(P[l.id].price * l.qty);
      }).join("\n") +
      "\n\nSubtotal: " + money(sub()) +
      (mode() === "envio" ? "\nEnvío: " + (e ? money(e) : "Gratis") : "") +
      "\nTotal: " + money(sub() + e) +
      "\n\nNombre: " + name +
      "\nEntrega: " + (mode() === "envio" ? "Envío a " + addr : "Retiro en el local") +
      ($("#f-note").value.trim() ? "\nAclaraciones: " + $("#f-note").value.trim() : "");
    window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  renderGrid();
  render();
})();
