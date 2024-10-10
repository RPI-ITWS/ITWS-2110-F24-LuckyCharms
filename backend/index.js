/*
* use console.dir() to debug html elements
*/


async function getItemDetails(htmlElement) {
    const itemId = htmlElement.parentElement[0].value;
    if (!itemId) {
        console.warn("Please input a value in the field.");
        return;
    }
    await fetch(`./queries/itemDetail.php?id=${itemId}`)
      .then((response) => response.json())
      .then((result) => console.log(result));
}

async function checkout(htmlElement) {
    const itemId = htmlElement.parentElement[0].value;
    const userId = htmlElement.parentElement[1].value;
    const itemCount = htmlElement.parentElement[2].value;

    if (!itemId) {
        console.warn("Please input a value into item ID");
        return;
    }
    if (!userId) {
        console.warn("Please input a value into User ID");
        return;
    }
    if (!itemCount) {
        console.warn("Please input a value into Item Count");
        return;
    }
    const result = await fetch(`./queries/itemDetail.php?id=${itemId}`)
      .then((response) => response.json());

    let queryParams = `itemId=${itemId}&userId=${userId}&itemCount=${itemCount}`
    if (parseInt(result.borrowable)) {
        const today = new Date();
        const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        queryParams += `&returnDate=${oneWeekLater.toISOString()}`;
    }
    await fetch(`./queries/checkout.php?${queryParams}`)
      .then(async (response) => response.text())
      .then((result) => {
          if (isJsonString(result))
              result = JSON.parse(result);
          console.log(result);
      })
}


async function getActiveLabs(htmlElement) {
    const userId = htmlElement.parentElement[0].value;
    if (!userId) {
        console.warn("Please input a value into User ID");
        return;
    }
    await fetch(`./queries/getActiveLabs.php?userId=${userId}`)
      .then((response) => response.text())
      .then((result) => {
          if (isJsonString(result))
              result = JSON.parse(result);
          console.log(result);
      });
}

function isJsonString(str) {
    try {
        const json = JSON.parse(str);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
}