'use strict';

/**
 * repost service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::repost.repost');
