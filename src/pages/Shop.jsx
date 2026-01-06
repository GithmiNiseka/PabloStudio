import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Shop.css';

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [showCartSummary, setShowCartSummary] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const containerRef = useRef();
    const expandedCardRef = useRef();
    const overlayRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const filterRef = useRef();

    // Sample product data with shop1.jpeg for all products
    const productData = [
        {
            id: 1,
            name: 'Minimalist Wall Art',
            category: 'Digital Art',
            description: 'High-quality digital wall art print with minimalist design. Perfect for modern interiors.',
            price: 2990,
            originalPrice: 3990,
            images: {
                'Black & White': '/assets/shop1.jpeg',
                'Ocean Blue': '/assets/shop1.jpeg',
                'Forest Green': '/assets/shop1.jpeg',
                'Sunset Orange': '/assets/shop1.jpeg'
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
                'Monochrome': '/assets/shop1.jpeg',
                'Color Version': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Monochrome', value: '#333333' },
                { name: 'Color Version', value: '#FF6B6B' }
            ]
        },
        {
            id: 3,
            name: 'Business Card Set',
            category: 'Print Design',
            description: 'Premium business card design with spot UV coating and rounded corners.',
            price: 4990,
            originalPrice: 5990,
            images: {
                'Matte Black': '/assets/shop1.jpeg',
                'White Pearl': '/assets/shop1.jpeg',
                'Navy Blue': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Matte Black', value: '#1a1a1a' },
                { name: 'White Pearl', value: '#f8f8f8' },
                { name: 'Navy Blue', value: '#0a2342' }
            ],
            sizes: ['Standard', 'Square', 'Rounded']
        },
        {
            id: 4,
            name: 'Social Media Pack',
            category: 'Digital',
            description: 'Complete social media branding pack including posts, stories, and cover designs.',
            price: 8990,
            originalPrice: 11990,
            images: {
                'Brand Colors': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Brand Colors', value: '#4ECDC4' }
            ]
        },
        {
            id: 5,
            name: '3D Product Render',
            category: '3D Design',
            description: 'High-quality 3D product rendering for e-commerce and marketing.',
            price: 17990,
            originalPrice: 21990,
            images: {
                'Custom Colors': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Custom Colors', value: '#FFD166' }
            ]
        },
        {
            id: 6,
            name: 'Website Template',
            category: 'Web Design',
            description: 'Modern responsive website template with CMS integration.',
            price: 24990,
            originalPrice: 29990,
            images: {
                'Light Theme': '/assets/shop1.jpeg',
                'Dark Theme': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Light Theme', value: '#ffffff' },
                { name: 'Dark Theme', value: '#1a1a1a' }
            ]
        },
        {
            id: 7,
            name: 'Brand Identity Guide',
            category: 'Branding',
            description: 'Comprehensive brand identity guide with color palettes and typography.',
            price: 14990,
            originalPrice: 18990,
            images: {
                'Brand Colors': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Custom Colors', value: '#FF6B6B' }
            ]
        },
        {
            id: 8,
            name: 'Mobile App UI Kit',
            category: 'UI/UX',
            description: 'Complete mobile app UI kit with components and screens.',
            price: 18990,
            originalPrice: 22990,
            images: {
                'Modern Design': '/assets/shop1.jpeg'
            },
            colors: [
                { name: 'Dark Theme', value: '#1a1a1a' },
                { name: 'Light Theme', value: '#ffffff' }
            ]
        }
    ];

    const filters = [
        { id: 'all', label: 'All Products' },
        { id: 'Digital Art', label: 'Digital Art' },
        { id: 'Branding', label: 'Branding' },
        { id: 'Print Design', label: 'Print Design' },
        { id: '3D Design', label: '3D Design' },
        { id: 'Web Design', label: 'Web Design' },
        { id: 'UI/UX', label: 'UI/UX' }
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
        
        // Initialize animations - FIXED: Added immediate opacity for visibility
        const ctx = gsap.context(() => {
            // Immediately show title and subtitle to fix visibility issue
            gsap.set([titleRef.current, descriptionRef.current, filterRef.current], {
                opacity: 1,
                y: 0
            });

            // Title animation
            gsap.fromTo(titleRef.current,
                { y: 30 },
                {
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power2.out'
                }
            );

            // Description animation
            gsap.fromTo(descriptionRef.current,
                { y: 20 },
                {
                    y: 0,
                    duration: 0.8,
                    delay: 0.6,
                    ease: 'power2.out'
                }
            );

            // Filter tabs animation
            gsap.fromTo(filterRef.current,
                { y: 20 },
                {
                    y: 0,
                    duration: 0.8,
                    delay: 0.9,
                    ease: 'power2.out'
                }
            );

            // Cards animation on load
            gsap.from('.product-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 1.2,
                ease: 'power2.out'
            });

        }, containerRef);

        return () => ctx.revert();
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
        return matchesFilter;
    });

    // Handle filter change
    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
        // Animate cards
        gsap.to('.product-card', {
            opacity: 0,
            y: 50,
            duration: 0.4,
            stagger: 0.05,
            onComplete: () => {
                setTimeout(() => {
                    gsap.fromTo('.product-card',
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: 'power2.out'
                        }
                    );
                }, 100);
            }
        });
    };

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
            button.classList.add('added');
            gsap.to(button, {
                backgroundColor: '#4CAF50',
                duration: 0.3,
                onComplete: () => {
                    setTimeout(() => {
                        button.classList.remove('added');
                        gsap.to(button, {
                            backgroundColor: '#dc2626',
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
        
        return `https://wa.me/94700000000?text=${message}`;
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
                {/* Hero Section - FIXED: Removed opacity transform from elements */}
                <section className="shop-hero">
                    <h1 ref={titleRef} className="shop-title" style={{ opacity: 1 }}>Shop</h1>
                    <p ref={descriptionRef} className="shop-description" style={{ opacity: 1 }}>
                        Discover our collection of digital products, designs, and creative solutions.
                        All items are crafted with attention to detail and quality.
                    </p>
                </section>

                {/* Filters */}
                <section ref={filterRef} className="shop-filters" style={{ opacity: 1 }}>
                    <div className="filter-tabs">
                        {filters.map((filter, index) => (
                            <React.Fragment key={filter.id}>
                                <button
                                    data-filter={filter.id}
                                    className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => handleFilterChange(filter.id)}
                                >
                                    {filter.label}
                                </button>
                                {index < filters.length - 1 && (
                                    <span className="filter-separator">|</span>
                                )}
                            </React.Fragment>
                        ))}
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
                                {/* Product Image */}
                                <div className="product-image-container">
                                    <img 
                                        src={getProductImage(product)} 
                                        alt={product.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            // Fallback to a placeholder if shop1.jpeg doesn't exist
                                            e.target.src = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                        }}
                                    />
                                    
                                    {/* Updated Expand Icon - "⤢" positioned below image on right side */}
                                    <button 
                                        className="expand-icon-bottom-right"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpand(product.id);
                                        }}
                                        disabled={isExpanding}
                                        title={expandedProduct === product.id ? "Collapse" : "Expand details"}
                                    >
                                        <span className="expand-icon">⤢</span>
                                    </button>
                                </div>

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
                                                <span className="cart-icon">🛒</span>
                                                <span className="cart-text">Add to Cart</span>
                                                <span className="cart-price">LKR {(product.price * product.quantity).toLocaleString()}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Actions (for non-expanded view) - Just Add to Cart Button with Cart Icon */}
                                    <div className="product-actions">
                                        <button 
                                            className="add-to-cart-btn"
                                            data-product={product.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                        >
                                            <span className="cart-icon">🛒</span>
                                            ADD TO CART
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
                            <p>No products found matching your selection.</p>
                            <button 
                                className="filter-tab"
                                onClick={() => setActiveFilter('all')}
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
                    <span className="whatsapp-icon">📱</span>
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
                            <span>✕</span> Cancel
                        </button>
                        <button 
                            className="confirm-btn"
                            onClick={confirmOrder}
                        >
                            <span>📱</span> Send via WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Shop;