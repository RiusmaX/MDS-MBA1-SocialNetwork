'use strict';

/**
 * friendship service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::friendship.friendship');
