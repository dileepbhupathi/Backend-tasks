const { Op, Sequelize } = require('sequelize');
const User = require('./models/index').user;
const Collection = require('./models/index').collection;
const Recommendation = require('./models/index').recommendation;
const jwt = require('jsonwebtoken');

const sampleData = require('./sample.json')

const SECRET_KEY = process.env.SECRET_KEY;

class Controller {

    login = async (req, res) => {
        const { userid: id } = req.body

        try {
            const user = await User.findOne({ where: { id } })

            if (user) {
                const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' })
                res.status(200).json({ token })
            } else res.status(404).json({
                message: "USER_NOT_FOUND"
            })

        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }
    }

    createUser = async (req, res) => {
        try {

            let data = await User.create(req.body, {
                include: [{
                    model: Collection,
                    as: 'collections',
                    include: [{ model: Recommendation, as: 'recommendations' }]
                }]
            });
            res.status(200).json({
                message: 'Collection created successfully',
                data
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.message || 'server error',
            });
        }
    }

    getUser = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await User.findOne({
                where: { id },
                include: [
                    {
                        model: Collection,
                        as: 'collections',
                        include: [
                            {
                                model: Recommendation,
                                as: "recommendations"
                            }
                        ]
                    }
                ]
            })
            if (result) res.status(200).json(result)
            else res.status(404).json({
                message: "USER_NOT_FOUND"
            })

        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }

    }

    createCollection = async (req, res) => {
        const collection = req.body;
        const { id } = req.user

        try {
            const user = await User.findOne({ where: { id } })

            if (user) {
                const data = await user.createCollection({
                    name: collection.name,
                    description: collection.description
                })
                res.status(200).json({
                    message: 'Collection created successfully',
                    data
                })
            } else {
                res.status(404).json({
                    message: "USER_NOT_FOUND"
                })
            }

        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }
    }

    getCollections = async (req, res) => {
        const { id: user_id } = req.user
        let { page, limit } = req.query
        page = parseInt(page || 1);
        limit = parseInt(limit || 10);
        const offset = (page - 1) * limit;


        try {
            const collections = await Collection.findAll({
                where: { user_id },
                include: [
                    {
                        model: Recommendation,
                        as: "recommendations"
                    }
                ],
                limit,
                offset,
            });

            if (collections.length) {
                const totalCollections = await Collection.count({ where: { user_id } });
                const totalPages = Math.ceil(totalCollections / limit);

                res.status(200).json({
                    collections,
                    pagination: {
                        totalItems: totalCollections,
                        totalPages,
                        currentPage: page,
                        pageSize: limit
                    }
                });
            } else {
                res.status(400).json({
                    message: "No collections found"
                })
            }
        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }

    }

    deleteCollection = async (req, res) => {
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const collection = await Collection.findOne({ where: { id, user_id } })

            if (collection) {
                await collection.destroy()
                res.status(200).json({
                    message: 'Collection removed successfully'
                })
            } else {
                res.status(404).json({
                    message: "COLLECTION_NOT_FOUND"
                })
            }

        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }

    }

    createRecommendation = async (req, res) => {
        const recommendation = req.body
        const { collectionid: id } = req.query
        const { id: user_id } = req.user

        try {
            const collection = await Collection.findOne({
                where: { id, user_id }
            })

            if (collection) {
                const data = await collection.createRecommendation({
                    title: recommendation.title,
                    caption: recommendation.caption,
                    category: recommendation.category
                })
                res.status(200).json({
                    message: 'Recommendation created successfully',
                    data
                })
            } else {
                res.status(404).json({
                    message: "COLLECTION_NOT_FOUND"
                })
            }

        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }

    }

    removeRecommendation = async (req, res) => {
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const recommendation = await Recommendation.findOne({
                where: {
                    id,
                    collection_id: {
                        [Op.in]: Sequelize.literal(`(SELECT id FROM collection WHERE user_id = ${user_id})`),
                    }
                }
            })

            if (recommendation) {
                await recommendation.destroy()
                res.status(200).json({
                    message: 'Recommendation removed successfully'
                })
            } else {
                res.status(404).json({
                    message: "RECOMMENDATION_NOT_FOUND"
                })
            }

        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message || 'server error'
            })
        }
    }

    importSampleData = async (req, res) => {
        try {

            let data = await User.bulkCreate(sampleData, {
                include: [{
                  model: Collection,
                  as: 'collections',
                  include: [{
                    model: Recommendation,
                    as: 'recommendations'
                  }]
                }]
              });
            res.status(200).json({
                message: 'Collection created successfully',
                data
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.message || 'server error',
            });
        }
    }

}

module.exports = new Controller()