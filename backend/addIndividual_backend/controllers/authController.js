// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.full_name
        },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
        { expiresIn: '24h' }
    );
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findByEmail(email);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (user.status !== 'Active') {
            return res.status(401).json({
                success: false,
                message: 'Account is inactive. Please contact administrator.'
            });
        }

        // Verify password
        const isValidPassword = await User.verifyPassword(password, user.password_hash);
        
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user);

        // Prepare user data to send back
        const userData = {
            id: user.id,
            email: user.email,
            name: user.full_name,
            role: user.role,
            permissions: getPermissionsByRole(user.role)
        };

        res.json({
            success: true,
            token,
            user: userData,
            redirectTo: getDashboardPathByRole(user.role)
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.getById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.full_name,
                role: user.role,
                permissions: getPermissionsByRole(user.role)
            }
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.logout = (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

// Helper functions
const getPermissionsByRole = (role) => {
    const permissions = {
        'Administrator': {
            canEditSettings: true,
            canManageUsers: true,
            canAddCitizens: true,
            canEditCitizens: true,
            canDeleteCitizens: true,
            canIssueIDCards: true,
            canViewReports: true,
            canExportData: true,
            canViewAuditLogs: true,
        },
        'Data Entry Clerk': {
            canEditSettings: false,
            canManageUsers: false,
            canAddCitizens: true,
            canEditCitizens: true,
            canDeleteCitizens: false,
            canIssueIDCards: true,
            canViewReports: true,
            canExportData: false,
            canViewAuditLogs: false,
        },
        'View Only': {
            canEditSettings: false,
            canManageUsers: false,
            canAddCitizens: false,
            canEditCitizens: false,
            canDeleteCitizens: false,
            canIssueIDCards: false,
            canViewReports: true,
            canExportData: false,
            canViewAuditLogs: false,
        }
    };

    return permissions[role] || permissions['View Only'];
};

const getDashboardPathByRole = (role) => {
    const paths = {
        'Administrator': '/',
        'Data Entry Clerk': '/',
        'View Only': '/'
    };
    return paths[role] || '/';
};