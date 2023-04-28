'use strict';

/**
 * liker service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::liker.liker');
