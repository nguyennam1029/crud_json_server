const api = "http://localhost:3000/posts";

// ======================= LẤY THÔNG TIN SẢN PHẨM =====================
const getProducts = async () => {
  try {
    const res = await axios.get(api);

    const listProduct = res.data;
    const productTemplates = listProduct
      .map(
        (item) =>
          ` <div class="card" data-id="${item.id}">
      <img class="card-img" src="${item.image}" alt="" />

      <a href="/page/detail-page.html?id=${item.id}" class="card-info">
        <p class="text-title">${item.title}</p>
        <p class="text-body">${item.des}</p>
      </a>
      <div class="card-footer2">
        <span class="text-title">${item.price}</span>
        <div class="card-button2">
          <span onclick="editProduct('${item.id}')" data-toggle="modal" data-target="#exampleModalCenter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
          <span onclick="deleteProduct('${item.id}')">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

        </div>
      </div>
    </div>`
      )
      .join("");
    const container = document.getElementById("container");
    container.innerHTML = productTemplates;
  } catch (error) {
    console.log("🚀 ~ file: app.js:7 ~ getProducts ~ error:", error);
  }
};
getProducts();

// ======================= TẠO MƯỚI SẢN PHẨM =====================

const addProductForm = document.getElementById("form");
addProductForm.addEventListener("submit", addProduct);

async function addProduct(event) {
  event.preventDefault();
  const productTitle = document.getElementById("productTitle").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDes = document.getElementById("productDes").value;
  const productImage = document.getElementById("productImage").value;

  // Generate randomId using uuidv4()
  const randomId = uuidv4();

  const newProduct = {
    id: randomId,
    title: productTitle,
    image: productImage,
    price: productPrice,
    des: productDes,
  };

  // Perform your axios.post() request here
  try {
    const res = await axios.post(api, newProduct);
    console.log("🚀 ~ file: app.js:73 ~ addProduct ~ res:", res);
  } catch (error) {}
  // Show success toast notification
  //   Toastify({
  //     text: "Product added successfully!",
  //     duration: 4000,
  //     gravity: "bottom",
  //     positionLeft: false,
  //     close: true,
  //     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  //     stopOnFocus: true,
  //   }).showToast();
}

// ========================= XÓA SẢN PHẨM ===============
// async function deleteProduct(id) {
//   const res = await axios.delete(`${api}/${id}`);
// }

async function deleteProduct(id) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axios.delete(`${api}/${id}`);
      // Wait for 2 seconds before showing the Swal.fire success message

      Swal.fire("Deleted!", "Product has been deleted.", "success");
    }
  } catch (error) {
    console.log("🚀 ~ file: app.js:93 ~ deleteProduct ~ error:", error);
  }
}

// ================================== edit product ==============

async function editProduct(id) {
  // console.log("🚀 ~ file: app.js:133 ~ editProduct ~ id:", id);
  try {
    const res = await axios.get(`${api}/${id}`);
    const preData = res.data;
    console.log("🚀 ~ file: app.js:131 ~ editProduct ~ res:", res);
    console.log("🚀 ~ file: app.js:131 ~ editProduct ~ preData:", preData);

    const editProductId = document.getElementById("editProductId");
    const editTitleInput = document.getElementById("editTitle");
    const editPriceInput = document.getElementById("editPrice");
    const editDescriptionInput = document.getElementById("editDescription");
    const editImageInput = document.getElementById("editImage");

    editProductId.value = preData.id;
    editTitleInput.value = preData.title;
    editPriceInput.value = preData.price;
    editDescriptionInput.value = preData.des;
    editImageInput.value = preData.image;
  } catch (error) {}
}

// == submit form edit
const formEdit = document.getElementById("formEdit");
formEdit.addEventListener("submit", handleEdit);

async function handleEdit(e) {
  e.preventDefault();
  const editTitleInput = document.getElementById("editTitle").value;
  const editPriceInput = document.getElementById("editPrice").value;
  const editDescriptionInput = document.getElementById("editDescription").value;
  const editImageInput = document.getElementById("editImage").value;
  const productIdInput = document.getElementById("editProductId").value; // Lấy giá trị id

  const newProduct = {
    title: editTitleInput,
    image: editImageInput,
    price: editPriceInput,
    des: editDescriptionInput,
  };

  try {
    const res = await axios.put(`${api}/${productIdInput}`, newProduct);
  } catch (error) {
    console.log("🚀 ~ file: app.js:174 ~ handleEdit ~ error:", error);
  }
}
