/*
* use console.dir() to debug html elements
*/


async function getItemDetails(htmlElement) {
    const inputValue = htmlElement.parentElement[0].value;
    if (!inputValue) {
        console.warn("Please input a value in the field.");
        return;
    }
    await fetch(`./itemDetail.php?id=${inputValue}`)
      .then((res) => res.json())
      .then((result) => console.log(result));
}

console.log("TEST");