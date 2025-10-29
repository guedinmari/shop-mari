const PASSWORD = "mari123";
const loginDiv = document.getElementById('loginDiv');
const adminDiv = document.getElementById('adminDiv');

const productNameInput = document.getElementById('productName');
const productLinkInput = document.getElementById('productLink');
const productImageInput = document.getElementById('productImage');
const productCategoryInput = document.getElementById('productCategory');
const productList = document.getElementById('productList');

let editIndex = null; // <--- índice do produto que está sendo editado

document.getElementById('loginBtn').addEventListener('click', () => {
  const pw = document.getElementById('adminPassword').value;
  if(pw === PASSWORD){
    loginDiv.style.display = "none";
    adminDiv.style.display = "block";
    loadProducts();
  } else {
    alert("Senha incorreta!");
  }
});

// Adicionar ou salvar produto ao pressionar Enter no campo do link
productLinkInput.addEventListener('keypress', (e) => {
  if(e.key === "Enter"){
    const name = productNameInput.value.trim() || "Produto";
    const link = productLinkInput.value.trim();
    const image = productImageInput.value.trim();
    const category = productCategoryInput.value.trim() || "Sem Categoria";

    if(!link){ alert("Insira o link do produto!"); return; }

    let products = JSON.parse(localStorage.getItem('products')) || [];

    if(editIndex !== null){
      // Editar produto existente
      products[editIndex] = { name, link, image: image || "https://via.placeholder.com/300x200.png?text=Produto", category };
      editIndex = null;
    } else {
      // Adicionar novo produto
      products.push({ name, link, image: image || "https://via.placeholder.com/300x200.png?text=Produto", category });
    }

    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();

    productNameInput.value = "";
    productLinkInput.value = "";
    productImageInput.value = "";
    productCategoryInput.value = "";
  }
});

function loadProducts(){
  productList.innerHTML = "";
  let products = JSON.parse(localStorage.getItem('products')) || [];

  products.forEach((p,i)=>{
    const div=document.createElement('div');
    div.className="flex justify-between items-center bg-blue-50 p-2 rounded shadow";
    div.innerHTML=`
      <span>${p.name} (${p.category})</span>
      <div class="flex gap-2">
        <button class="bg-yellow-400 text-white px-2 py-1 rounded" onclick="editProduct(${i})">Editar</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="removeProduct(${i})">Remover</button>
      </div>
    `;
    productList.appendChild(div);
  });
}

function removeProduct(index){
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index,1);
  localStorage.setItem('products',JSON.stringify(products));
  loadProducts();
}

function editProduct(index){
  let products = JSON.parse(localStorage.getItem('products')) || [];
  const p = products[index];
  productNameInput.value = p.name;
  productLinkInput.value = p.link;
  productImageInput.value = p.image;
  productCategoryInput.value = p.category;
  editIndex = index;
}

function logout(){
  adminDiv.style.display="none";
  loginDiv.style.display="block";
  document.getElementById('adminPassword').value="";
  editIndex = null;
}
