"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { handleErrors } = require("../../../utils/common");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.address.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.address.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.address });
  },

  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.address.search({
        ...ctx.query,
        "user.id": ctx.state.user.id,
      });
    } else {
      // entities = await strapi.services.address.find(ctx.query);
      entities = await strapi.services.address.find({
        ...ctx.query,
        "user.id": ctx.state.user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.address })
    );
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const [address] = await strapi.services.address.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!address) {
      return handleErrors(ctx, undefined, "forbidden");
    }

    return sanitizeEntity(address, { model: strapi.models.address });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [address] = await strapi.services.address.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!address) {
      return handleErrors(ctx, undefined, "forbidden");
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.address.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.address.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.address });
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [address] = await strapi.services.address.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!address) {
      return handleErrors(ctx, undefined, "forbidden");
    }

    entity = await strapi.services.address.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.address });
  },

  /**
   * Set Record Primary.
   *
   * @return {Object}
   */

  async setPrimary(ctx) {
    const { id } = ctx.params;

    let entity;
    const [address] = await strapi.services.address.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!address) {
      return handleErrors(ctx, undefined, "forbidden");
    } else {
      const [addressWithTruePrimary] = await strapi.services.address.find({
        isPrimary: true,
        "user.id": ctx.state.user.id,
      });
      if (addressWithTruePrimary) {
        await strapi.services.address.update(
          { id: addressWithTruePrimary.id },
          { isPrimary: false }
        );
      }

      entity = await strapi.services.address.update(
        { id },
        { isPrimary: true }
      );
    }
    return sanitizeEntity(entity, { model: strapi.models.address });
  },
};
