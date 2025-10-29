document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById('product-grid');
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const searchInput = document.getElementById('searchInput');
  const adminButtonDiv = document.getElementById('adminButtonDiv');
  const categoryContainer = document.getElementById('categoryContainer');

  let activeCategory = "all";

  function showProducts(filter=""){
    grid.innerHTML = "";
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase()) &&
      (activeCategory==="all" || p.category===activeCategory)
    );
    if(filtered.length===0){
      grid.innerHTML=`<p class="col-span-full text-center text-gray-500">Nenhum produto encontrado 😢</p>`;
      return;
    }
    filtered.forEach(p=>{
      const card=document.createElement('div');
      card.className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition transform hover:scale-105";
      card.innerHTML=`<img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h2 class="font-semibold text-lg mb-2">${p.name}</h2>
        <a href="${p.link}" target="_blank" class="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Ver na Shopee</a>
      </div>`;
      grid.appendChild(card);
    });
  }

  function updateCategoryButtons(){
    categoryContainer.innerHTML="";
    const categories = ["all", ...new Set(products.map(p=>p.category))];
    categories.forEach(cat=>{
      const btn = document.createElement('button');
      btn.className="category-btn bg-blue-200 text-blue-800 px-4 py-2 rounded-xl";
      btn.dataset.category = cat;
      btn.textContent = cat==="all"?"Todos":cat;
      categoryContainer.appendChild(btn);
    });
    document.querySelectorAll('.category-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        activeCategory = btn.dataset.category;
        document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('bg-blue-600','text-white'));
        btn.classList.add('bg-blue-600','text-white');
        showProducts(searchInput.value);
      });
    });
  }

  showProducts();
  updateCategoryButtons();

  searchInput.addEventListener('input', e=>showProducts(e.target.value));

  searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    document.getElementById('clearSearch').style.display = query ? "inline-block":"none";
  });

  document.getElementById('clearSearch').addEventListener('click', ()=>{
    searchInput.value="";
    showProducts();
    document.getElementById('clearSearch').style.display="none";
  });

  // Segredo admin
  let typed = "";
  document.addEventListener("keydown", e=>{
    typed+=e.key.toLowerCase();
    if(typed.includes("mariadm")){
      adminButtonDiv.style.display="block";
      setTimeout(()=>{ typed=""; },2000);
    }
    if(typed.length>10) typed=typed.slice(-10);
  });
});
