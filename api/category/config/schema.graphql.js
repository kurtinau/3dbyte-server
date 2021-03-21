module.exports = {
    query: `
    categoriesTree(sort: String, limit: Int, start: Int, where: JSON, publicationState: PublicationState): [Category]
    `,
    resolver: {
      Query: {
        categoriesTree: {
          description: 'Return the category tree',
          resolver: 'application::category.category.find',
          // resolver: async (obj, options, { context }) => {
          //   // ctx is the context of the Koa request.
          //   // console.log('ctx: ', context);
          //   console.log('obj: ', obj);
          //   console.log('options: ', options);
          //   const start = options.start ? options.start : 0;
          //   const where = context.params;
          //   const data = context.request.body;
          //   console.log('where: ', where);
          //   console.log('body: ', data);
          //   const result = await strapi.controllers.category.find(context);
          //   // const count = await strapi.api.product.services.product.count({ published_at_null: false });
          //   // console.log('count: ', count);
          //   // console.log('result: ', result.length);
          //   return result;
          // }
        }
      }
    }
  }