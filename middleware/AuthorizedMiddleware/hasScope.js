function hasScope(scope) {
    return (req, res, next) => {
        const scopes = req.scope.split(' ');
        console.log(scopes);
        if (!scopes.includes(scope)) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
}

module.exports = hasScope;
