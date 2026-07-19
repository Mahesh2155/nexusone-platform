const allowPermissions = (...permissions) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }


        const userPermissions = req.user.permissions || [];


        const hasPermission = permissions.some(
            (permission) =>
                userPermissions.includes(permission)
        );


        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: "Permission denied"
            });
        }


        next();
    };

};


module.exports = allowPermissions;