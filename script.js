// 简单的数据结构，用于演示。实际可以从接口获取
const products = [
    { id: 1, name: '苹果', category: '水果', price: '¥3/斤', specs: '新鲜', content: '1kg', image: 'https://via.placeholder.com/300?text=苹果' },
    { id: 2, name: '香蕉', category: '水果', price: '¥4/斤', specs: '进口', content: '1kg', image: 'https://via.placeholder.com/300?text=香蕉' },
    { id: 3, name: '牛奶', category: '饮品', price: '¥20/瓶', specs: '全脂', content: '1L', image: 'https://via.placeholder.com/300?text=牛奶' },
    { id: 4, name: '茶叶', category: '饮品', price: '¥50/盒', specs: '绿茶', content: '250g', image: 'https://via.placeholder.com/300?text=茶叶' }
];

// 页面元素引用
const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const specFilter = document.getElementById('specFilter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

// 初始化过滤选项
function initFilters() {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });

    const specs = [...new Set(products.map(p => p.specs))];
    specs.forEach(sp => {
        const opt = document.createElement('option');
        opt.value = sp;
        opt.textContent = sp;
        specFilter.appendChild(opt);
    });
}

// 渲染产品
function renderProducts(list) {
    productGrid.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div class="info">
                <h2>${p.name}</h2>
                <p><strong>分类:</strong> ${p.category}</p>
                <p><strong>价格:</strong> ${p.price}</p>
                <p><strong>规格:</strong> ${p.specs}</p>
                <p><strong>含量:</strong> ${p.content}</p>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// 综合筛选函数
function applyFilters() {
    let result = products.slice();
    const cat = categoryFilter.value;
    const spec = specFilter.value;
    const minP = parseFloat(minPriceInput.value) || 0;
    const maxP = parseFloat(maxPriceInput.value) || Infinity;

    if (cat !== 'all') result = result.filter(p => p.category === cat);
    if (spec !== 'all') result = result.filter(p => p.specs === spec);

    result = result.filter(p => {
        // 从价格字符串中提取数字
        const num = parseFloat(p.price.replace(/[¥¥]/g, ''));
        return num >= minP && num <= maxP;
    });

    renderProducts(result);
}

// 事件绑定
autoFilterEvents();

function autoFilterEvents() {
    categoryFilter.addEventListener('change', applyFilters);
    specFilter.addEventListener('change', applyFilters);
    minPriceInput.addEventListener('input', applyFilters);
    maxPriceInput.addEventListener('input', applyFilters);
}


// 启动
initFilters();
renderProducts(products);