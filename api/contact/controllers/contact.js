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
      entity = await strapi.services.contact.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.contact.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.contact });
  },

  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.contact.search({
        ...ctx.query,
        "user.id": ctx.state.user.id,
      });
    } else {
      // entities = await strapi.services.contact.find(ctx.query);
      entities = await strapi.services.contact.find({
        ...ctx.query,
        "user.id": ctx.state.user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.contact })
    );
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const [contact] = await strapi.services.contact.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!contact) {
      return handleErrors(ctx, undefined, "forbidden");
    }

    return sanitizeEntity(contact, { model: strapi.models.contact });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [contact] = await strapi.services.contact.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!contact) {
      return handleErrors(ctx, undefined, "forbidden");
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.contact.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.contact.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.contact });
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [contact] = await strapi.services.contact.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!contact) {
      return handleErrors(ctx, undefined, "forbidden");
    }
    entity = await strapi.services.contact.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.contact });
  },

  /**
   * Set Record Primary.
   *
   * @return {Object}
   */

  async setPrimary(ctx) {
    const { id } = ctx.params;

    let entity;
    const [contact] = await strapi.services.contact.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });
    if (!contact) {
      return handleErrors(ctx, undefined, "forbidden");
    } else {
      const [contactWithTruePrimary] = await strapi.services.contact.find({
        isPrimary: true,
        "user.id": ctx.state.user.id,
      });
      if (contactWithTruePrimary) {
        await strapi.services.contact.update(
          { id: contactWithTruePrimary.id },
          { isPrimary: false }
        );
      }

      entity = await strapi.services.contact.update(
        { id },
        { isPrimary: true }
      );
    }
    return sanitizeEntity(entity, { model: strapi.models.contact });
  },
};
