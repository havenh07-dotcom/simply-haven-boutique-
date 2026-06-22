document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <button class="close-menu" aria-label="Close Menu" style="position: absolute; top: 20px; right: 20px; background: none; border: none; cursor: pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="logo" style="margin-bottom: 40px;">Simply Haven<span> Boutique</span></div>
        <ul>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    `;
    body.appendChild(mobileNav);

    const closeBtn = mobileNav.querySelector('.close-menu');

    const toggleMenu = () => {
        const isOpen = mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Tab Switching for Featured Collections
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productGrid = document.querySelector('.product-grid');

    const collections = {
        'New Arrivals': [
            { name: 'Floral Mama Midi', price: '$48.00', img: 'Floral Mama Midi' },
            { name: 'Mini Haven Bows', price: '$12.00', img: 'Mini Haven Bows' },
            { name: 'Pink Satin Dreams', price: '$55.00', img: 'Pink Satin Dreams' },
            { name: 'Golden Mama Necklace', price: '$28.00', img: 'Golden Mama Necklace' }
        ],
        'Best Sellers': [
            { name: 'Essential Mama Tee', price: '$32.00', img: 'Essential Mama Tee' },
            { name: 'Tiny Tot Overalls', price: '$38.00', img: 'Tiny Tot Overalls' },
            { name: 'Silk Hair Scarf', price: '$18.00', img: 'Silk Hair Scarf' },
            { name: 'Canvas Tote Bag', price: '$22.00', img: 'Canvas Tote Bag' }
        ],
        'Mama Favorites': [
            { name: 'Linen Button Up', price: '$45.00', img: 'Linen Button Up' },
            { name: 'High-Waist Leggings', price: '$35.00', img: 'High-Waist Leggings' },
            { name: 'Cozy Knit Cardigan', price: '$58.00', img: 'Cozy Knit Cardigan' },
            { name: 'Mama Bear Mug', price: '$15.00', img: 'Mama Bear Mug' }
        ],
        'Seasonal Picks': [
            { name: 'Summer Breeze Dress', price: '$52.00', img: 'Summer Breeze Dress' },
            { name: 'Sun-Kissed Straw Hat', price: '$25.00', img: 'Sun-Kissed Straw Hat' },
            { name: 'Beachside Sandals', price: '$40.00', img: 'Beachside Sandals' },
            { name: 'Denim Mini Skirt', price: '$34.00', img: 'Denim Mini Skirt' }
        ]
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update product grid
            const collectionName = btn.textContent;
            const products = collections[collectionName];

            productGrid.innerHTML = products.map(product => `
                <div class="product-card" style="opacity: 0; transform: translateY(20px); transition: all 0.4s ease;">
                    <div class="product-img-placeholder">
                        <span>${product.img}</span>
                    </div>
                    <h4>${product.name}</h4>
                    <p class="price">${product.price}</p>
                    <button class="btn btn-outline">Add to Cart</button>
                </div>
            `).join('');

            // Animation effect
            setTimeout(() => {
                productGrid.querySelectorAll('.product-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 10);
        });
    });

    // 3. Email Signup Mockup
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signupForm.querySelector('input').value;
            const button = signupForm.querySelector('button');
            const originalText = button.textContent;

            button.textContent = 'Welcome!';
            button.disabled = true;
            signupForm.querySelector('input').value = '';

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                alert(`Thank you! ${email} has been added to the Haven Community.`);
            }, 1000);
        });
    }

    // 4. Cart Buttons Mockup
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-outline') && e.target.textContent === 'Add to Cart') {
            const productName = e.target.closest('.product-card').querySelector('h4').textContent;
            alert(`${productName} added to your cart!`);
        }
    });

    // 5. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
