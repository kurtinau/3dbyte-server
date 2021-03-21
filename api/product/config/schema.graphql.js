module.exports = {
  definition: `
    type productsLzayLoad {
      items: [Product]
      hasMore: Boolean
    }
  `,
  query: `
    productsWithHasMore(sort: String, limit: Int, start: Int, where: JSON, publicationState: PublicationState): productsLzayLoad!
    productByUID(where: JSON!): Product
  `,
  resolver: {
    Query: {
      productsWithHasMore: {
        description: 'Return the lazy load of products',
        resolverOf: 'application::product.product.find',
        resolver: async (obj, options, { context }) => {
          // ctx is the context of the Koa request.
          // console.log('ctx: ', context);
          // console.log('obj: ', obj);
          // console.log('options: ', options);
          const start = options.start ? options.start : 0;
          const where = context.params;
          const data = context.request.body;
          console.log('where: ', where);
          // console.log('body: ', data);
          const result = await strapi.controllers.product.find(context);
          // const count = await strapi.api.product.services.product.count({ published_at_null: false, "categories.slug": "3-d-printers" });
          let countParams;
          if (where._where) {
            if (where._where.categories) {
              if (where._where.categories.slug)
              countParams = { "categories.slug": where._where.categories.slug };
            }else{
              countParams = {...where._where}
            }
          }
          const count = await strapi.api.product.services.product.count({ published_at_null: false, ...countParams });
          console.log('count: ', count);
          console.log('result: ', result.length);
          return {
            items: result,
            hasMore: (start + result.length) < count
          };
        }
      },
      productByUID:{
        description: 'Return a product by UID',
        resolverOf: 'application::product.product.findOne',
        resolver: async (obj, options, { context }) =>{
          console.log('BYUID-context: ',context.params);
          const result = await strapi.api.product.services.product.findOne(context.params);
          console.log('BYUID-result: ',result);
          return result;
        }
      }
    }
  }
}