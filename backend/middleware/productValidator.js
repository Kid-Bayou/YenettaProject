const Joi = require("joi");
const productValidator = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
      });
    
      const { error, value } = schema.validate(req.body);
      if (error) {
        res.status(400).json({ errors: error.details.map((err) => err.message) });
      }
    
    next();
}

module.exports = {
    productValidator,
}