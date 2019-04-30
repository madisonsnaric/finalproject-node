const express = require('express');
const bodyParser = require('body-parser');
const Scent = require('./models/scent');
const Flower = require('./models/flower');
const Bloomingperiod = require('./models/bloomingperiod');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const app = express();

app.use(bodyParser.json());

Scent.hasMany(Flower, {
  foreignKey: 'ScentId'
});

Flower.belongsTo(Scent, {
  foreignKey: 'ScentId'
});

Bloomingperiod.hasMany(Flower, {
  foreignKey: 'BloomingPeriodId'
});

Flower.belongsTo(Bloomingperiod, {
  foreignKey: 'BloomingPeriodId'
});

app.delete('/api/bloomingperiods/:id', function(request, response) {
    let { id } = request.params;

    Bloomingperiod
      .findByPk(id)
      .then((bloomingperiod) => {
        if (bloomingperiod) {
          return bloomingperiod.setFlowers([]).then(() => {
            return bloomingperiod.destroy();
          });
        } else {
          return Promise.reject();
        }
      })
      .then(() => {
        response.status(204).send();
      }, () => {
        response.status(404).send();
      });
  });

app.post('/api/bloomingperiods', function(request, response) {
    Bloomingperiod.create({
      bloomingperiod: request.body.bloomingperiod
    }).then((bloomingperiod) => {
      response.json(bloomingperiod);
    }, (validation) => {
      response.status(422).json({
        errors: validation.errors.map((error) => {
          return {
            attribute: error.path,
            message: error.message
          };
        })
      });
    });
  });

app.patch('/api/scents/:id', function(request, response) {
	let { id } = request.params;

	Scent
		.findByPk(id)
		.then((scent) => {
			return scent.update({
				scent: request.body.scent,
			});
		}).then((scent) => {
		response.json(scent);
	}, (validation) => {
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message
				};
			})
		});
	});
});

app.post('/api/scents', function(request, response) {
  Scent.create({
    scent: request.body.scent
  }).then((scent) => {
    response.json(scent);
  }, (validation) => {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        };
      })
    });
  });
});

app.get('/api/scents', function(request, response) {
  let filter = {};
  let { q } = request.query;

  if (request.query.q) {
    filter = {
      where: {
        scent: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Scent.findAll(filter).then((scents) => {
    response.json(scents);
  });
});

app.get('/api/scents/:id', function(request, response) {
  let { id } = request.params;

  Scent.findByPk(id, {
    include: [Flower]
  }).then((scent) => {
    if (scent) {
      response.json(scent);
    } else {
      response.status(404).send();
    }
  });
});

app.get('/api/flowers', function(request, response) {
  let filter = {};
  let { q } = request.query;

  if (request.query.q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Flower.findAll(filter).then((flowers) => {
    response.json(flowers);
  });
});

app.get('/api/flowers/:id', function(request, response) {
  let { id } = request.params;

  Flower.findByPk(id, {
    include: [Scent]
  }).then((flower) => {
    if (flower) {
      response.json(flower);
    } else {
      response.status(404).send();
    }
  });
});

app.get('/api/bloomingperiods', function(request, response) {
  let filter = {};
  let { q } = request.query;

  if (request.query.q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Bloomingperiod.findAll(filter).then((bloomingperiods) => {
    response.json(bloomingperiods);
  });
});

app.get('/api/bloomingperiods/:id', function(request, response) {
  let { id } = request.params;

  Bloomingperiod.findByPk(id, {
    include: [Flower]
  }).then((bloomingperiod) => {
    if (bloomingperiod) {
      response.json(scent);
    } else {
      response.status(404).send();
    }
  });
});

app.listen(8000);
