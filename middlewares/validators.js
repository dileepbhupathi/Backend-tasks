const Joi = require('joi');

const destructure = error => error.details.map(item => item.message.replaceAll('\"', "")).join(',')

class Validators {

    login = (req, res, next) => {
        const schema = Joi.object({
            userid: Joi.number().integer().positive().required()
        });

        const { error } = schema.validate(req.body);

        if (error) res.status(400).json({
            message: destructure(error)
        })
        else next()
    }

    user = (req, res, next) => {
        const recommendationSchema = Joi.object({
            title: Joi.string().min(2).max(50).required(),
            caption: Joi.string().min(3).max(100).required(),
            category: Joi.string().min(3).max(50).required(),
        });

        const collectionSchema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(5).max(255).required(),
            recommendations: Joi.array().items(recommendationSchema).optional()
        });

        const schema = Joi.object({
            fname: Joi.string().min(3).max(100).required(),
            sname: Joi.string().min(3).max(100).required(),
            profile_picture: Joi.string().uri().required(),
            bio: Joi.string().optional().max(500),
            collections: Joi.array().items(collectionSchema).optional()
        });

        const { error } = schema.validate(req.body);

        if (error) res.status(400).json({
            message: destructure(error)
        })
        else next()
    }

    id = (req, res, next) => {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required()
        });

        const { error } = schema.validate(req.params);

        if (error) res.status(400).json({
            message: destructure(error)
        })
        else next()
    }

    collection = (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(5).max(255).required()
        })

        const { error } = schema.validate(req.body);

        if (error) res.status(400).json({
            message: destructure(error)
        })
        else next()
    }

    recommendation = (req, res, next) => {
        const schema = Joi.object({
            title: Joi.string().min(2).max(50).required(),
            caption: Joi.string().min(3).max(100).required(),
            category: Joi.string().min(3).max(50).required(),
        })

        const { error } = schema.validate(req.body);

        if (error) res.status(400).json({
            message: destructure(error)
        })
        else next()
    }


}

module.exports = new Validators