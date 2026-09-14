# Watch E-Commerce Website - Specifications

## Overview
A premium, visually stunning e-commerce website for selling watches (men, women, couples). Must be fully mobile-responsive with a "WOW" factor design that impresses visitors on every device.

---

## Tech Stack (Recommended)
- **Frontend:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **Database:** MongoDB (with Mongoose) or PostgreSQL
- **Auth:** NextAuth.js
- **Image Storage:** Cloudinary or AWS S3
- **Payment:** Stripe / JazzCash / EasyPaisa (for Pakistan)
- **Deployment:** Vercel (frontend) + Railway/Render (backend)

---

## Site Structure

### Pages
1. **Homepage** — Hero slideshow, category cards, featured products, best sellers, new arrivals, trust badges
2. **Collection Pages** — Men, Women, Couples, Smart Watches, Sale, Best Sellers, New Arrivals
3. **Product Detail Page** — Image gallery, variant selector, description, reviews, related products
4. **Cart** — Slide-out drawer (desktop) / full page (mobile), order notes, delivery estimate
5. **Checkout** — Multi-step or single page, payment integration, order summary
6. **Track Order** — Order tracking by ID/email
7. **About Us** — Brand story, mission
8. **Contact Us** — Form, store locations, map
9. **Exchange & Return Policy**
10. **Privacy Policy**
11. **Terms & Conditions**
12. **Blogs** — Blog listing + individual blog posts
13. **Search Results** — Product search with autocomplete
14. **Account** — Login, register, order history, profile

### Admin Panel (Separate Routes: /admin/*)
1. **Dashboard** — Revenue, orders, products count, recent activity charts
2. **Products** — CRUD (Create, Read, Update, Delete), image upload with drag-to-reorder, variants management, publish/draft
3. **Categories** — Manage categories & subcategories with images
4. **Orders** — View all orders, update status (pending, processing, shipped, delivered, cancelled), print invoice
5. **Customers** — View customer list, order history
6. **Inventory** — Stock tracking, low stock alerts
7. **Discounts/Coupons** — Create percentage or flat discounts, expiry dates, usage limits
8. **Banners/Promotions** — Manage homepage banners, announcement bar text
9. **Blogs** — Create/edit/delete blog posts
10. **Settings** — Store name, logo, contact info, shipping rates, payment methods
11. **Media Library** — Organize uploaded images

---

## Design Specifications

### Color Theme (Dark Luxury)
- **Primary Background:** #0A0A0A (near black)
- **Secondary Background:** #1A1A1A (dark grey)
- **Card Background:** #1E1E1E
- **Primary Accent:** #C9A96E (gold) or #D4AF37
- **Secondary Accent:** #C0C0C0 (silver)
- **Text Primary:** #FFFFFF
- **Text Secondary:** #A0A0A0
- **Sale Badge:** #E63946 (red)
- **NEW Badge:** #2D6A4F (green)
- **Success:** #2D6A4F
- **Error:** #E63946

### Typography
- **Headings:** Playfair Display or Cormorant Garamond (luxury serif)
- **Body:** Inter or Poppins (clean sans-serif)
- **Accent/Price:** Montserrat (bold, modern)

---

## Navigation

### Desktop
- Sticky top navbar with logo left, nav links center, icons (search, account, cart) right
- Mega menu with category thumbnail images on hover
- Announcement bar above navbar (scrolling text: "Free Shipping | Sale Live | 1 Year Warranty")

### Mobile
- Hamburger menu → Full-screen slide-in menu with smooth animation
- Bottom navigation bar (app-like): Home, Categories, Cart, Account
- Sticky header with search icon and cart icon with badge count

---

## Homepage Sections

1. **Announcement Bar** — Scrolling/marquee text with promotions
2. **Hero Slideshow** — Full-screen, auto-rotating banners with text overlays and CTA buttons (3-5 slides)
3. **Category Cards** — Grid of visual category links (Men Formal, Men Sports, Women, Couples, Smart Watches) with hover zoom effect
4. **Flash Sale Timer** — Countdown timer with animated digits
5. **Featured Products** — Horizontal scrollable product carousel
6. **Best Sellers** — Grid of top-selling products with badges
7. **New Arrivals** — Grid of newest products
8. **Trust Badges** — Icons with text: Free Shipping, 7-Day Returns, 1 Year Warranty, Secure Payment
9. **Brand Story Section** — Short about section with image
10. **Instagram/Social Feed** — Grid of social media posts
11. **Newsletter Signup** — Email subscription form
12. **Footer** — Multi-column: About, Products, Quick Links, Contact Info, Social Media Icons

---

## Collection Page

### Filters (Sidebar on desktop, bottom sheet on mobile)
- Category (checkboxes)
- Price Range (slider)
- Availability (In stock / Out of stock toggle)
- Product Type (Leather, Stainless Steel, Sports, Formal, Bracelet)
- Color (swatch circles)

### Sort Options
- Featured, Best Selling, Price (Low to High), Price (High to Low), Newest, Oldest

### Product Grid
- Desktop: 3-4 columns
- Tablet: 2-3 columns
- Mobile: 2 columns
- Pagination: "Load More" button or infinite scroll

---

## Product Card Design

- **Image:** 2 images (swap on hover on desktop)
- **Badges:** Sale (% OFF), NEW, Best Seller
- **Color Swatches:** Clickable circles below image
- **Title:** Product name
- **Subtitle:** Category/type (e.g., "Men's Leather")
- **Price:** Sale price (bold) + Regular price (strikethrough)
- **Star Rating:** ★★★★★ (4.5)
- **Quick Buy Button:** Appears on hover (desktop) / always visible (mobile)

---

## Product Detail Page

### Image Section
- Main large image with zoom on hover/click
- Thumbnail gallery below/beside (click to switch)
- Swipeable on mobile
- Optional: 360° view or video

### Info Section
- Product name + NEW/Badge
- Star rating + review count
- Price (sale + regular)
- Color/variant selector (swatches)
- Size selector (if applicable)
- Quantity selector
- Add to Cart button (sticky on mobile)
- Wishlist heart icon
- Share icon
- Description (accordion/collapsible)
- Specifications table (accordion)
- Shipping info ("Free shipping on orders over Rs. X")
- Estimated delivery time

### Below Fold
- Customer Reviews section with rating breakdown
- Related Products carousel
- Recently Viewed carousel

---

## Cart

### Desktop
- Slide-out drawer from right
- Product image, name, variant, quantity +/-, price
- Remove item
- Order note textarea
- Subtotal + shipping estimate
- "Checkout" CTA button
- Upsell recommendation ("You may also like")

### Mobile
- Full page cart
- Same as desktop but vertically stacked
- Sticky checkout button at bottom
- Estimated delivery: "Expected delivery in 3-5 days"

---

## Checkout
- Progress indicator (Cart → Shipping → Payment → Confirmation)
- Shipping form (name, email, phone, address, city, province)
- Payment options: COD, JazzCash, EasyPaisa, Stripe/Card
- Order summary sidebar
- Place Order CTA
- Order confirmation page with order ID + details

---

## Animations & Micro-Interactions

### Global
- Page load: Smooth fade-in
- Scroll: Products fade-in and slide-up on scroll (staggered)
- Page transitions: Smooth slide/fade between pages

### Desktop
- Product card hover: Image zoom, shadow lift, Quick Buy button appears
- Button hover: Scale + color shift
- Navigation: Mega menu slide-down

### Mobile
- Bottom nav: Active indicator animation
- Pull-to-refresh on collection pages
- Swipe gestures on product images
- Sticky add-to-cart bar slides up on scroll
- Haptic-like visual feedback on tap

### Loading States
- Skeleton loaders (shimmer effect) instead of spinners
- Image lazy loading with blur-up effect

### Cart
- Add to cart: Product image flies to cart icon
- Cart badge: Bounce animation on count change

---

## Admin Panel Design

### Layout
- Sidebar navigation (collapsible)
- Top bar with admin name, notifications, logout
- Clean, minimal dashboard with cards and charts

### Dashboard Widgets
- Total Revenue (with chart: daily/weekly/monthly)
- Total Orders (with status breakdown)
- Total Products
- Total Customers
- Recent Orders table
- Low Stock Alerts
- Sales Graph (line chart)

### Product Management
- Table view with search, filter, pagination
- Bulk actions (delete, publish, unpublish)
- Add Product form:
  - Title, Description (rich text editor)
  - Multiple image upload with drag-to-reorder
  - Category selector (multi-level)
  - Price (regular + sale)
  - Variants (add color/size with individual price, SKU, stock)
  - SEO fields (meta title, description)
  - Status (draft/published)
  - Tags

### Order Management
- Table with status color coding
- Filter by status, date range
- Order detail view with customer info, items, timeline
- Update status with notification trigger
- Print invoice (PDF)

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, bottom nav, stacked layouts |
| Tablet | 640px - 1024px | 2-column grid, collapsible sidebar |
| Desktop | > 1024px | Full sidebar, 3-4 column grid, mega menu |
| Large Desktop | > 1280px | Wider container, more spacing |

---

## Performance Targets
- Lighthouse Score: 90+ (Performance, Accessibility, SEO)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Image optimization: WebP/AVIF, responsive sizes
- Code splitting: Lazy load below-fold sections

---

## SEO
- Server-side rendering (SSR) / Static generation (SSG) for all pages
- Meta tags (title, description, OG image) per page
- Structured data (JSON-LD) for products
- XML sitemap
- robots.txt
- Canonical URLs
- Alt text for all images
- Clean URL structure

---

## Security
- CSRF protection
- Input validation/sanitization
- Rate limiting on API
- Secure authentication (JWT/SESSION)
- Admin route protection
- Image upload validation (file type, size)
- Environment variables for secrets

---

## Future Enhancements (Phase 2)
- Wishlist functionality
- User reviews with image upload
- Size guide
- Live chat support
- Multi-currency support
- Email notifications (order confirmation, shipping updates)
- SMS notifications
- Loyalty/rewards program
- Refer a friend program
- Social login (Google, Facebook)
- PWA (Progressive Web App) for mobile install
