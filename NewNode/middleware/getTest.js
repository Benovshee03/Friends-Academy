const Test = require('../models/test');

async function getTest(req, res, next) {
    let test;
    try {
        test = await Test.findById(req.params.id)
        if (test == null) {
            return res.status(404) // not bulundu
                .json({ message: 'Category not found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.test = test;
    next();  
}

module.exports = getTest;



// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)