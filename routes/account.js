const express = require('express');
const Account = require('../models/account');
const PAGE_LIMIT = 4

var router = express.Router();


router.get('/', (req, res, next) => {

    if (req.query.page) {
        var page = parseInt(req.query.page);
        page = page < 1 ? 1 : page

        Account.find({})
            .skip((page - 1) * PAGE_LIMIT)
            .limit(PAGE_LIMIT)
            .then(data => {

                Account.countDocuments({})
                    .then(total => {
                        res.json(
                            {
                                totalPage: Math.ceil(total / PAGE_LIMIT),
                                data: data
                            }
                        )
                    })
            })
            .catch(err => {
                res.status(500).json('Lỗi')
            })
    }
    else {
        Account.find({})
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('Lỗi')
            })
    }
})


module.exports = router

