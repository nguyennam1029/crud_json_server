const api = "http://localhost:3000/posts";

const listProduct = document.getElementById("listProduct");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

async function getDetail(id) {
  try {
    const res = await axios.get(`${api}/${id}`);
    const data = res.data;
    const temPlate = `
     <div class="product">
        <div class="product-image">
          <img
            src="${data.image}"
            alt=""
          />
        </div>
        <p class="product-title">${data.title}</p>
        <span class="product-price"> ${data.price}$ </span>
        <p class="product-des">${data.des}</p>
      </div>
    `;
    listProduct.innerHTML = temPlate;
  } catch (error) {}
}
getDetail(productId);
