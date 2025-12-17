$(document).ready(function(){
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-bars fa-xmark');
    });

    $('.dish-image').on('click', function() {
        let src = $(this).attr('src');
        $('#modalImg').attr('src', src);
        $('#imageModal').fadeIn(); // abre com efeito
    });

    $('.close').on('click', function() {
        $('#imageModal').fadeOut();
    });

    $('#imageModal').on('click', function(e) {
        if (e.target.id === 'imageModal') {
            $(this).fadeOut();
        }
    });

    const sections = $('section');
    const navLinks = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition= $(window).scrollTop() - header.outerHeight();
        
        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else{
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }
    });

});
$(document).ready(function () {

  let cart = [];

  function updateCart() {
    $('#cartItems').html('');
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      $('#cartItems').append(`
        <div class="cart-item">
          <span>${item.name}<br><small>R$ ${item.price.toFixed(2)}</small></span>

          <div class="cart-controls">
            <button class="qty-minus" data-i="${index}">−</button>
            <span class="cart-qty">${item.qty}</span>
            <button class="qty-plus" data-i="${index}">+</button>
            <i class="fa-solid fa-trash cart-remove" data-i="${index}"></i>
          </div>
        </div>
      `);
    });

    $('#cartTotal').text(total.toFixed(2));
    $('#cartBadge').text(cart.reduce((a, b) => a + b.qty, 0));
  }

// ABRIR CARRINHO
$('#cartButton').on('click', function () {
  $('#cartDrawer').addClass('open');
  $('#cartOverlay').fadeIn();
});
// FECHAR CARRINHO (botão X ou overlay)
$('#closeCart, #cartOverlay').on('click', function () {
  $('#cartDrawer').removeClass('open');
  $('#cartOverlay').removeClass('active');
});


  // ADICIONAR AO CARRINHO
  $('.whatsapp-redirect').on('click', function (e) {
    e.preventDefault();

    const card = $(this).closest('.dish');
    const name = card.find('.dish-title').text();
    const price = parseFloat(
      card.find('.dish-price span').text().replace('R$', '').replace(',', '.')
    );

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
    $('#cartDrawer').addClass('open');
    $('#cartOverlay').fadeIn();
  });

  // + QUANTIDADE
  $(document).on('click', '.qty-plus', function () {
    cart[$(this).data('i')].qty++;
    updateCart();
  });

  // - QUANTIDADE
  $(document).on('click', '.qty-minus', function () {
    const i = $(this).data('i');
    cart[i].qty--;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    updateCart();
  });

  // REMOVER ITEM
  $(document).on('click', '.cart-remove', function () {
    cart.splice($(this).data('i'), 1);
    updateCart();
  });

  // NOME OBRIGATÓRIO
  $('#clientName').on('input', function () {
    $('#finishOrder').prop(
      'disabled',
      $(this).val().trim().length < 3
    ).toggleClass('enabled', $(this).val().trim().length >= 3);
  });

  // FINALIZAR
  $('#finishOrder').on('click', function () {
    const name = $('#clientName').val().trim();
    if (!name) return $('#nameError').show();

    let msg = `Olá! Meu nome é *${name}*%0A%0A🛒 *Pedido:*%0A`;
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      msg += `- ${item.qty}x ${item.name} (R$ ${(item.price * item.qty).toFixed(2)})%0A`;
    });

    msg += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/556599686879?text=${msg}`, '_blank');
  });

});
 // faq js
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // Fecha todos
    faqItems.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".faq-answer").style.maxHeight = null;
    });

    // Abre somente se não estava aberto
    if (!isOpen) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
