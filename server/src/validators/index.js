import { body, param } from 'express-validator';

export const idParam = (name = 'id') => param(name).isMongoId().withMessage('Invalid identifier');

export const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 60 }),
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];
export const loginRules = [
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];
export const profileRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim(),
];
export const passwordRules = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];
export const roleRules = [body('role').isIn(['user', 'admin']).withMessage('Role must be user or admin')];

export const perfumeRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('season').isIn(['spring', 'summer', 'autumn', 'winter']).withMessage('Season must be spring, summer, autumn or winter'),
  body('tagline').trim().notEmpty().withMessage('Tagline is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be zero or more'),
];
export const perfumeUpdateRules = [
  body('season').optional().isIn(['spring', 'summer', 'autumn', 'winter']),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
];
export const reviewRules = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Write a few words about the fragrance').isLength({ max: 800 }),
];
export const cartAddRules = [
  body('perfumeId').isMongoId().withMessage('Invalid perfume'),
  body('qty').optional().isInt({ min: 1, max: 10 }).withMessage('Quantity must be between 1 and 10'),
];
export const cartUpdateRules = [body('qty').isInt({ min: 1, max: 10 }).withMessage('Quantity must be between 1 and 10')];
export const orderRules = [
  body('shipping.fullName').trim().notEmpty().withMessage('Full name is required'),
  body('shipping.address').trim().notEmpty().withMessage('Address is required'),
  body('shipping.city').trim().notEmpty().withMessage('City is required'),
  body('shipping.postalCode').trim().notEmpty().withMessage('Postal code is required'),
  body('shipping.country').trim().notEmpty().withMessage('Country is required'),
  body('shipping.phone').trim().notEmpty().withMessage('Phone is required'),
  body('paymentMethod').optional().isIn(['cod', 'card']).withMessage('Unsupported payment method'),
];
export const orderStatusRules = [
  body('status').isIn(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
];
export const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10 to 2000 characters'),
];
export const emailRules = [body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail()];
