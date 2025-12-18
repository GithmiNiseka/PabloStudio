// src/pages/Shop.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCartSummary, setShowCartSummary] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const containerRef = useRef();
    const expandedCardRef = useRef();
    const overlayRef = useRef();

    // Sample product data with multiple images for different colors
    const productData = [
        {
            id: 1,
            name: 'Minimalist Wall Art',
            category: 'Digital Art',
            description: 'High-quality digital wall art print with minimalist design. Perfect for modern interiors.',
            price: 2990,
            originalPrice: 3990,
            images: {
                'Black & White': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'Ocean Blue': 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'Forest Green': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'Sunset Orange': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            colors: [
                { name: 'Black & White', value: '#000000' },
                { name: 'Ocean Blue', value: '#2E86AB' },
                { name: 'Forest Green', value: '#2D5A27' },
                { name: 'Sunset Orange', value: '#FF6B35' }
            ],
            sizes: ['A4', 'A3', 'A2', 'A1'],
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'Custom Logo Design',
            category: 'Branding',
            description: 'Professional custom logo design with 3 revisions and brand guidelines.',
            price: 12990,
            originalPrice: 15990,
            images: {
                'Monochrome': 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'Color Version': 'https://images.unsplash.com/photo-1621461133947-f63381c2f7f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            colors: [
                { name: 'Monochrome', value: '#333333' },
                { name: 'Color Version', value: '#FF6B6B' }
            ],
            badge: 'Popular'
        },
        {
            id: 3,
            name: 'Business Card Set',
            category: 'Print Design',
            description: 'Premium business card design with spot UV coating and rounded corners.',
            price: 4990,
            originalPrice: 5990,
            images: {
                'Matte Black': 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'White Pearl': 'https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'Navy Blue': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            colors: [
                { name: 'Matte Black', value: '#1a1a1a' },
                { name: 'White Pearl', value: '#f8f8f8' },
                { name: 'Navy Blue', value: '#0a2342' }
            ],
            sizes: ['Standard', 'Square', 'Rounded'],
            badge: 'New'
        },
        {
            id: 4,
            name: 'Social Media Pack',
            category: 'Digital',
            description: 'Complete social media branding pack including posts, stories, and cover designs.',
            price: 8990,
            originalPrice: 11990,
            images: {
                'Brand Colors': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            colors: [
                { name: 'Brand Colors', value: '#4ECDC4' }
            ],
            badge: 'Limited'
        },
        {
            id: 5,
            name: '3D Product Render',
            category: '3D Design',
            description: 'High-quality 3D product rendering for e-commerce and marketing.',
            price: 17990,
            originalPrice: 21990,
            images: {
                'Custom Colors': 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            colors: [
                { name: 'Custom Colors', value: '#FFD166' }
            ],
            badge: 'Premium'
        },
        {
            id: 6,
            name: 'Website Template',
            category: 'Web Design',
            description: 'Modern responsive website template with CMS integration.',
            price: 24990,
            originalPrice: 29990,
            images: {
                'Light Theme': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'Dark Theme': 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            colors: [
                { name: 'Light Theme', value: '#ffffff' },
                { name: 'Dark Theme', value: '#1a1a1a' }
            ],
            badge: 'Featured'
        }
    ];

    const filters = [
        { id: 'all', label: 'All Products' },
        { id: 'Digital Art', label: 'Digital Art' },
        { id: 'Branding', label: 'Branding' },
        { id: 'Print Design', label: 'Print' },
        { id: '3D Design', label: '3D Design' },
        { id: 'Web Design', label: 'Web Design' }
    ];

    // Initialize products with default selections
    useEffect(() => {
        const initializedProducts = productData.map(product => ({
            ...product,
            selectedColor: product.colors[0],
            quantity: 1,
            selectedSize: product.sizes ? product.sizes[0] : null
        }));
        setProducts(initializedProducts);
        
        // Initialize animations
        gsap.from('.product-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out'
        });
    }, []);

    // Show/hide cart summary based on cart items
    useEffect(() => {
        if (cart.length > 0) {
            setShowCartSummary(true);
        } else {
            setShowCartSummary(false);
        }
    }, [cart]);

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Handle color selection
    const handleColorSelect = (productId, color) => {
        setProducts(products.map(product => 
            product.id === productId ? { ...product, selectedColor: color } : product
        ));
    };

    // Handle quantity change
    const handleQuantityChange = (productId, change) => {
        setProducts(products.map(product => {
            if (product.id === productId) {
                const newQuantity = Math.max(1, product.quantity + change);
                return { ...product, quantity: newQuantity };
            }
            return product;
        }));
    };

    // Add to cart
    const addToCart = (product) => {
        const existingItemIndex = cart.findIndex(item => 
            item.id === product.id && 
            item.selectedColor.name === product.selectedColor.name
        );

        if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += product.quantity;
            setCart(updatedCart);
        } else {
            // Add new item to cart
            setCart([...cart, { ...product }]);
        }

        // Animate the button
        const button = document.querySelector(`.add-to-cart-btn[data-product="${product.id}"]`);
        if (button) {
            gsap.to(button, {
                backgroundColor: '#4CAF50',
                duration: 0.3,
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to(button, {
                            backgroundColor: '#000',
                            duration: 0.3
                        });
                    }, 1000);
                }
            });
        }
    };

    // Remove from cart
    const removeFromCart = (productId, colorName) => {
        setCart(cart.filter(item => 
            !(item.id === productId && item.selectedColor.name === colorName)
        ));
    };

    // Calculate total
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Toggle product expansion with horizontal animation
    const toggleExpand = async (productId) => {
        if (isExpanding) return;
        
        setIsExpanding(true);
        
        if (expandedProduct === productId) {
            // Collapse
            await collapseProduct();
            setExpandedProduct(null);
        } else {
            // Expand
            setExpandedProduct(productId);
            await expandProduct(productId);
        }
        
        setIsExpanding(false);
    };

    // Expand product horizontally
    const expandProduct = (productId) => {
        return new Promise((resolve) => {
            const card = document.querySelector(`.product-card[data-product="${productId}"]`);
            const overlay = overlayRef.current;
            const grid = document.querySelector('.products-grid');
            
            if (!card || !overlay || !grid) return resolve();
            
            // Get card position and dimensions
            const cardRect = card.getBoundingClientRect();
            const gridRect = grid.getBoundingClientRect();
            
            // Store original card position and size
            const originalStyle = {
                position: card.style.position,
                left: card.style.left,
                top: card.style.top,
                width: card.style.width,
                height: card.style.height,
                zIndex: card.style.zIndex,
                margin: card.style.margin
            };
            
            card.dataset.originalStyle = JSON.stringify(originalStyle);
            
            // Set card as absolute positioned relative to grid
            card.style.position = 'fixed';
            card.style.left = `${cardRect.left}px`;
            card.style.top = `${cardRect.top}px`;
            card.style.width = `${cardRect.width}px`;
            card.style.height = `${cardRect.height}px`;
            card.style.zIndex = '1000';
            card.style.margin = '0';
            card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Show overlay
            overlay.style.display = 'block';
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Blur other cards
            const otherCards = document.querySelectorAll('.product-card:not([data-product="' + productId + '"])');
            gsap.to(otherCards, {
                filter: 'blur(8px)',
                opacity: 0.6,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            // Calculate expanded dimensions (98% of viewport width, 92% of viewport height)
            const expandedWidth = window.innerWidth * 0.98;
            const expandedHeight = window.innerHeight * 0.92;
            const targetLeft = (window.innerWidth - expandedWidth) / 2;
            const targetTop = (window.innerHeight - expandedHeight) / 2;
            
            // Animate to expanded position
            gsap.to(card, {
                left: targetLeft,
                top: targetTop,
                width: expandedWidth,
                height: expandedHeight,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    card.classList.add('expanded');
                    expandedCardRef.current = card;
                    resolve();
                }
            });
        });
    };

    // Collapse product
    const collapseProduct = () => {
        return new Promise((resolve) => {
            const card = expandedCardRef.current;
            const overlay = overlayRef.current;
            
            if (!card) return resolve();
            
            const originalStyle = JSON.parse(card.dataset.originalStyle || '{}');
            
            // Remove expanded class
            card.classList.remove('expanded');
            
            // Animate back to original position
            gsap.to(card, {
                left: originalStyle.left,
                top: originalStyle.top,
                width: originalStyle.width,
                height: originalStyle.height,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    // Restore original styles
                    Object.keys(originalStyle).forEach(key => {
                        card.style[key] = originalStyle[key];
                    });
                    
                    // Remove blur from other cards
                    const otherCards = document.querySelectorAll('.product-card');
                    gsap.to(otherCards, {
                        filter: 'blur(0px)',
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    // Hide overlay
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            overlay.style.display = 'none';
                            expandedCardRef.current = null;
                            resolve();
                        }
                    });
                }
            });
        });
    };

    // Generate WhatsApp message
    const generateWhatsAppMessage = () => {
        const itemsText = cart.map(item => 
            `• ${item.name} (${item.selectedColor.name}) - ${item.quantity}x - LKR ${(item.price * item.quantity).toLocaleString()}`
        ).join('%0A');
        
        const totalText = `Total: LKR ${calculateTotal().toLocaleString()}`;
        const message = `Hello! I'd like to order:%0A%0A${itemsText}%0A%0A${totalText}%0A%0APlease confirm availability and payment details.`;
        
        return `https://wa.me/94700000000?text=${message}`; // Replace with your WhatsApp number
    };

    // Handle checkout
    const handleCheckout = () => {
        setShowWhatsAppModal(true);
    };

    // Confirm order and open WhatsApp
    const confirmOrder = () => {
        window.open(generateWhatsAppMessage(), '_blank');
        setCart([]);
        setShowWhatsAppModal(false);
    };

    // Close expanded view on overlay click
    const handleOverlayClick = () => {
        if (expandedProduct) {
            toggleExpand(expandedProduct);
        }
    };

    // Get current image for product based on selected color
    const getProductImage = (product) => {
        return product.images[product.selectedColor.name] || 
               (typeof product.image === 'string' ? product.image : product.image || product.images[Object.keys(product.images)[0]]);
    };

    return (
        <div ref={containerRef} className="shop-page">
            <Nav />
            
            {/* Blur Overlay */}
            <div 
                ref={overlayRef}
                className="expansion-overlay"
                onClick={handleOverlayClick}
                style={{ display: 'none' }}
            />
            
            <div className="shop-layout">
                {/* Hero Section */}
                <section className="shop-hero">
                    <h1 className="shop-title">Shop</h1>
                    <p className="shop-description">
                        Discover our collection of digital products, designs, and creative solutions.
                        All items are crafted with attention to detail and quality.
                    </p>
                </section>

                {/* Filters */}
                <section className="shop-filters">
                    <div className="filter-tabs">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </section>

                {/* Products Grid */}
                <section className="shop-products">
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                data-product={product.id}
                                className={`product-card ${expandedProduct === product.id ? 'expanded' : ''}`}
                            >
                                {/* Close Button for Expanded View */}
                                {expandedProduct === product.id && (
                                    <button 
                                        className="close-expanded-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpand(product.id);
                                        }}
                                    >
                                        <span className="close-icon">×</span>
                                    </button>
                                )}

                                {/* Product Image */}
                                <div className="product-image-container">
                                    <img 
                                        src={getProductImage(product)} 
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    {product.badge && (
                                        <span className="product-badge">{product.badge}</span>
                                    )}
                                </div>

                                {/* Product Content */}
                                <div className="product-content">
                                    <div className="product-header">
                                        <div className="product-category">{product.category}</div>
                                        <h3 className="product-title">{product.name}</h3>
                                        <div className="product-price">
                                            LKR {product.price.toLocaleString()}
                                            {product.originalPrice && (
                                                <span className="original-price">
                                                    LKR {product.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Details (Expanded) */}
                                    <div className="product-details">
                                        <div className="details-grid">
                                            {/* Left Column - Product Info */}
                                            <div className="details-left">
                                                <div className="product-info-section">
                                                    <div className="product-header-expanded">
                                                        <div className="product-meta-expanded">
                                                            <span className="product-category-expanded">{product.category}</span>
                                                            {product.badge && (
                                                                <span className="product-badge-expanded">{product.badge}</span>
                                                            )}
                                                        </div>
                                                        <h3 className="product-title-expanded">{product.name}</h3>
                                                        <div className="product-price-expanded">
                                                            <span className="current-price">LKR {product.price.toLocaleString()}</span>
                                                            {product.originalPrice && (
                                                                <span className="original-price-expanded">
                                                                    LKR {product.originalPrice.toLocaleString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="product-description-expanded">{product.description}</p>
                                                    
                                                    {/* Product Specifications */}
                                                    <div className="product-specs">
                                                        <h4>What's Included</h4>
                                                        <ul className="specs-list">
                                                            <li><span>✓</span> High Resolution Files</li>
                                                            <li><span>✓</span> Commercial License</li>
                                                            <li><span>✓</span> Lifetime Updates</li>
                                                            <li><span>✓</span> 24/7 Support</li>
                                                            {product.category === 'Print Design' && <li><span>✓</span> Physical Delivery Option</li>}
                                                            <li><span>✓</span> Money Back Guarantee</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column - Customization Options */}
                                            <div className="details-right">
                                                <div className="customization-section">
                                                    {/* Color Options */}
                                                    {product.colors && product.colors.length > 0 && (
                                                        <div className="color-options-expanded">
                                                            <h4>Color Options</h4>
                                                            <div className="colors-grid-expanded">
                                                                {product.colors.map((color, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        className={`color-option-expanded ${product.selectedColor.name === color.name ? 'selected' : ''}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleColorSelect(product.id, color);
                                                                        }}
                                                                        title={color.name}
                                                                    >
                                                                        <div 
                                                                            className="color-swatch" 
                                                                            style={{ backgroundColor: color.value }}
                                                                        />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Size Options */}
                                                    {product.sizes && product.sizes.length > 0 && (
                                                        <div className="size-options-expanded">
                                                            <h4>Select Size</h4>
                                                            <div className="sizes-grid-expanded">
                                                                {product.sizes.map((size, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        className={`size-option-expanded ${product.selectedSize === size ? 'selected' : ''}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setProducts(products.map(p => 
                                                                                p.id === product.id ? { ...p, selectedSize: size } : p
                                                                            ));
                                                                        }}
                                                                    >
                                                                        {size}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Quantity Selector */}
                                                    <div className="quantity-selector-expanded">
                                                        <h4>Quantity</h4>
                                                        <div className="quantity-controls-expanded">
                                                            <button 
                                                                className="quantity-btn-expanded minus"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleQuantityChange(product.id, -1);
                                                                }}
                                                            >
                                                                −
                                                            </button>
                                                            <div className="quantity-display">
                                                                <span className="quantity-value-expanded">{product.quantity}</span>
                                                                <span className="quantity-label">items</span>
                                                            </div>
                                                            <button 
                                                                className="quantity-btn-expanded plus"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleQuantityChange(product.id, 1);
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="quantity-total">
                                                            <span>Total:</span>
                                                            <span className="total-price">LKR {(product.price * product.quantity).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sticky Add to Cart Button for Expanded View */}
                                        <div className="expanded-cart-actions">
                                            <button 
                                                className="add-to-cart-expanded"
                                                data-product={product.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                            >
                                                <span className="cart-text">Add to Cart</span>
                                                <span className="cart-price">LKR {(product.price * product.quantity).toLocaleString()}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Actions (for non-expanded view) */}
                                    <div className="product-actions">
                                        <button 
                                            className="add-to-cart-btn"
                                            data-product={product.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                        <button 
                                            className="expand-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleExpand(product.id);
                                            }}
                                            disabled={isExpanding}
                                        >
                                            <span className="expand-icon">
                                                {expandedProduct === product.id ? '▲' : '▼'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">🛒</div>
                            <p>No products found matching your search.</p>
                            <button 
                                className="filter-tab"
                                onClick={() => {
                                    setActiveFilter('all');
                                    setSearchQuery('');
                                }}
                            >
                                Show All Products
                            </button>
                        </div>
                    )}
                </section>
            </div>

            {/* Cart Summary */}
            <div className={`cart-summary ${showCartSummary ? 'visible' : ''}`}>
                <div className="cart-info">
                    <span className="cart-count">{cart.length} items in cart</span>
                    <span className="cart-total">Total: LKR {calculateTotal().toLocaleString()}</span>
                </div>
                <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                >
                    Proceed to WhatsApp Order
                </button>
            </div>

            {/* WhatsApp Modal */}
            <div className={`whatsapp-modal ${showWhatsAppModal ? 'active' : ''}`}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3 className="modal-title">Confirm Your Order</h3>
                        <p className="modal-subtitle">Review your items before sending via WhatsApp</p>
                    </div>
                    
                    <div className="order-items">
                        {cart.map((item, index) => (
                            <div key={index} className="order-item">
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p className="item-details">
                                        {item.selectedColor.name} • {item.quantity}x
                                    </p>
                                </div>
                                <div className="item-total">
                                    LKR {(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>LKR {calculateTotal().toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Calculated after order</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total Amount</span>
                            <span>LKR {calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div className="modal-actions">
                        <button 
                            className="cancel-btn"
                            onClick={() => setShowWhatsAppModal(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            className="confirm-btn"
                            onClick={confirmOrder}
                        >
                            Send via WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Shop;