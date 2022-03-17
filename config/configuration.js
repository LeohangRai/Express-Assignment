module.exports= {
    weatherAPI: "a95c1c3c9756546f58a6cbbff2028750",
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message')
        res.locals.error_message = req.flash('error-message')
        next();
    }
}