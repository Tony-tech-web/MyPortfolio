const { OpenAPIRegistry, OpenApiGeneratorV3 } = require('@asteasolutions/zod-to-openapi');
const { extendZodWithOpenApi } = require('@asteasolutions/zod-to-openapi');
const { z } = require('zod');

// Extend Zod with OpenAPI capabilities
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// Add Bearer Auth security scheme
const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

function generateOpenApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Portfolio API',
      description: 'Single source of truth API documentation generated from Zod schemas.',
    },
    servers: [{ url: '/api' }]
  });
}

module.exports = {
  registry,
  generateOpenApiSpec,
  bearerAuth
};
