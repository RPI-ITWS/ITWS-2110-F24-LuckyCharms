
async function checkout(id, stock) {
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton.textContent !== "UNAVAILABLE") {
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.style.display = "flex";

    const checkoutFormTitle = document.getElementById('form-title');
    const itemTitleContainer = document.getElementById('item-title-text');
    const itemTitle = itemTitleContainer.textContent;
    checkoutFormTitle.textContent = "Checkout " + itemTitle;

    const quantityEl = document.getElementById("quantity");
    quantityEl.setAttribute('max', stock);


    checkoutForm.onsubmit = function() { finalCheckout(id) };

    const itemTypeText = document.getElementById('item-type-text').textContent;
    if (itemTypeText === "Borrowable") {
      document.getElementById('returnDateLabel').style.display = "";
      document.getElementById('returnDateBreak1').style.display = "";
      document.getElementById('returnDateBreak2').style.display = "";
      const returnDateInput = document.getElementById('returnDate');
      returnDateInput.style.display = "";

      returnDateInput.setAttribute('required', 'required');

      const currentDate = new Date();
      const maxReturnDate = new Date();
      maxReturnDate.setDate(currentDate.getDate() + 14);
      const maxDateString = maxReturnDate.toISOString().split('T')[0];
      returnDateInput.setAttribute('max', maxDateString);
      returnDateInput.setAttribute('min', currentDate.toISOString().split('T')[0]);

      document.getElementById('agreeReturnLabel').textContent = "I understand that I have a responsibility to return the item within 2 weeks of the reservation.";
      document.getElementById('agreeNotifyLabel').textContent = "I understand that if I want to change the return date, I have to notify the lab administrator.";
    }
    else {
      document.getElementById('returnDateLabel').style.display = "none";
      document.getElementById('returnDateBreak1').style.display = "none";
      document.getElementById('returnDateBreak2').style.display = "none";
      const returnDateInput = document.getElementById('returnDate');
      returnDateInput.style.display = "none";

      if (returnDateInput.hasAttribute('required')) {
        returnDateInput.removeAttribute('required');
      }

      document.getElementById('agreeReturnLabel').textContent = "I understand that I do not have to return this item back to lab.";
      document.getElementById('agreeNotifyLabel').textContent = "I understand that if this item gets lost or damaged, I would have to discuss a replacement with the lab administrator.";
    }
  }
}

async function finalCheckout(id) {
  const checkoutForm = document.getElementById('form-object');

  const formContainer = document.getElementById('checkout-form');
  formContainer.style.display = "none";

  // Get account and other information to pass into PHP starting here

  const returnDate = document.getElementById('returnDate').value;
  const quantity = document.getElementById('quantity').value;
  const reason = document.getElementById('reason').value;

  let queryParams = `?itemId=${id}&quantity=${quantity}&reason=${reason}&returnDate=${returnDate}`;

  // Pass these values into PHP File starting here
  await fetch(`../backend/queries/checkout.php${queryParams}`).then((response) => response.text())
    .then((result) => {
      if (isJsonString(result))
        result = JSON.parse(result);
      console.log(result);
    });

  console.log('Return Date:', returnDate);
  console.log('Quantity:', quantity);
  console.log('Reason:', reason);
  checkoutForm.reset();
}

const cancelCheckoutFormButtn = document.getElementById('cancel-checkout-form-button');
cancelCheckoutFormButtn.addEventListener('click', function () {
  const checkoutForm = document.getElementById('form-object');
  checkoutForm.reset();

  const formContainer = document.getElementById('checkout-form');
  formContainer.style.display = "none";
});

function isJsonString(str) {
  try {
    const json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}