# Assets Directory Structure

This directory contains all the static assets used in the e-commerce platform.

## Directory Structure

```
assets/
├── products/     # Product images
├── categories/   # Category images
└── avatars/      # User avatar images
```

## Usage Guidelines

1. Product Images
   - Store all product-related images in the `products/` directory
   - Use product ID as the filename prefix
   - Recommended format: JPG or PNG
   - Maximum file size: 2MB

2. Category Images
   - Store category banners and icons in the `categories/` directory
   - Use category slug as the filename prefix
   - Recommended format: PNG for icons, JPG for banners

3. User Avatars
   - Store user profile pictures in the `avatars/` directory
   - Use user ID as the filename prefix
   - Recommended format: JPG or PNG
   - Maximum file size: 1MB

## Image Naming Convention

- Products: `{productId}-{timestamp}.{extension}`
- Categories: `{categorySlug}-{type}.{extension}`
- Avatars: `{userId}-avatar.{extension}`

## Best Practices

1. Always optimize images before uploading
2. Maintain consistent aspect ratios within each category
3. Use appropriate image compression
4. Remove unused images regularly
5. Keep backup copies of original images