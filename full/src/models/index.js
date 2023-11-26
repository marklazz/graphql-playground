import Sequelize from 'sequelize';
import userModel from './user'
import messageModel from './message'

const url = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`;
const sequelize = new Sequelize(url);

const models = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Message: messageModel(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
