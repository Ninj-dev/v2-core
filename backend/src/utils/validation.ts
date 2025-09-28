import Joi from 'joi';

export const validateRegistration = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(1).max(50).optional(),
    lastName: Joi.string().min(1).max(50).optional()
  });

  return schema.validate(data);
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

export const validateProject = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional().allow(''),
    framework: Joi.string().valid('react', 'vue', 'angular', 'vanilla').optional(),
    template: Joi.string().optional(),
    isPublic: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  });

  return schema.validate(data);
};

export const validateFile = (data: any) => {
  const schema = Joi.object({
    path: Joi.string().required(),
    content: Joi.string().required(),
    type: Joi.string().valid('component', 'page', 'style', 'config', 'other').optional(),
    language: Joi.string().optional()
  });

  return schema.validate(data);
};

export const validateAIGeneration = (data: any) => {
  const schema = Joi.object({
    prompt: Joi.string().min(10).max(1000).required(),
    framework: Joi.string().valid('react', 'vue', 'angular', 'vanilla').optional(),
    style: Joi.string().valid('tailwind', 'css', 'styled-components', 'scss').optional(),
    complexity: Joi.string().valid('simple', 'medium', 'complex').optional()
  });

  return schema.validate(data);
};