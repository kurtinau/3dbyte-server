module.exports = {
    handleErrors(ctx, err = undefined, type) {
        throw strapi.errors[type](err);
    }
}