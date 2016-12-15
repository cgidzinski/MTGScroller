//
module.exports = function(app, request) {
    app.get('/image/:name', function(req, res) {
        request({
            url: 'https://api.magicthegathering.io/v1/cards', //URL to hit
            method: 'GET',
            json: {
                name: '"' + req.params.name + '"'
            },
            headers: {
                'xCount': '1'
            }
        }, function(error, response, body) {
            if (error || body.cards.length == 0) {
                res.send({
                    success: false
                });
                return
            } else {
                for (card of body.cards) {
                    if (card.imageUrl != undefined) {
                        console.log(card.imageUrl)
                            // res.send({
                            //     success: false,
                            //     img: card.imageUrl
                            // });
                        res.render('image.ejs', {
                            card : card
                        });
                        return
                    }
                }
            }
        });
    });
    app.all('/api/*', function(req, res) {
        res.status(404).send({
            success: false,
            message: "404"
        });
        return;
    });
}
