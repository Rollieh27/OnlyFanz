const sequelize = require('../config/connection');
const { User, Product } = require('../models');

const userData = require('./userData.json');
const fansData = require('./fansData.json');

const seedDatabase = async () => {
   await sequelize.sync({ force: true });

const users = await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

for (const product of fansData) {
    await Product.create({
       ...product,
       user_id: users[Math.floor(Math.random() * users.length)].id,
  });
}

process.exit(0);
};

seedDatabase();
