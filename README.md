# Designing a Cake Selling System for Bimi Cake Shop
🔗 Live App: bimicakes.vercel.app

An interactive web application that allows users to design and customize cakes, preview them in real-time, and place orders easily.
Built with React.js, Material-UI, and a Node.js/Express API (MongoDB), this app provides a seamless experience for both guests and registered users.

# Features
# Home Page
    Browse categories, featured cakes and select favorite cakes.

# Custom Cake Builder:
    Select:

    Shape ✅ (mandatory)

    Flavor ✅ (mandatory)

    Topping ✅ (mandatory)

    Pick a custom color for your cake (optional).

    Add a custom message or special instructions (optional).

    Real-time Cake Preview with merged image.

# Authentication Flow
    Guests can customize cakes but must log in before checkout.

    Secure Login process.

    If the user signs up instead of logging in, the customization will be cleared for security.

# Cart & Order Management
    Add custom cakes to cart.

    Submit order details to backend with final merged image (Shape + Flavor + Topping + Color).

    Order Cancellation:

    Users can cancel pending orders only if less than 24 hours have passed since placement.

    View order history and reorder previous cakes.

# Admin Dashboard
    Manage Collections:
        Add, activate/inactivate collections (control visibility on home page).

    Manage Cakes:
        Add new cakes to specific collections.
        Activate/inactivate cakes (control availability).

    Manage Shapes, Flavors, Toppings:
        Add new options.
        Activate/inactivate items.

    Manage Users:
        Activate/inactivate accounts.

    Order Management:
        View, accept, reject, or ship orders.

# Order Status Flow
    Each order goes through multiple states:

    Pending (initial case after user places an order)

    Accepted (admin approves order)

    Rejected (admin rejects order)

    Shipped (admin marks as shipped)

    Canceled (user cancels the order if still pending and within 24 hours)

# Tech Stack
    React.js

    Material-UI (MUI)

    React Router DOM

    React Toastify

    Canvas API (for merging preview images)


# How It Works (Flow)
    Guest visits the site → Browses cakes → Clicks Customize Cake.

    Custom Cake Builder → Select shape, flavor, topping → Preview updates in real-time.

    Add to Cart → If not logged in → Redirect to Login page.

    Login → Redirect back → Add to cart and proceed.

    If user chooses Sign Up, the customization resets.

    Place Order → Backend stores merged image and details.

    Admin updates status (Pending → Accepted/Rejected → Shipped).

    User can cancel only if order is Pending and within 24 hours.

# Installation & Run
    # Install dependencies
    npm install

    # Start development server
    npm run dev

# Future Enhancements
    Activate Translation Service
        Enable multi-language support for users worldwide.

    3D Image View
        Provide an interactive 3D cake preview for a realistic customization experience.

    Social Media Login Support
        Allow users to log in with Google, Facebook, and other social platforms for quick access.

    Online Payment Methods
        Integrate secure payment gateways (Visa, MasterCard, PayPal) for seamless checkout.

    On-Site Chat Functionality
        Add live chat support to assist customers in real-time.
