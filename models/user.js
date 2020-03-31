'use strict';

const bcrypt = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Name cannot be null'
        }
      }
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        },
        isExist: (value => {
          return User.count({ where: { email_address: value}})
          .then(count => {
            if (count != 0){
              throw new Error('Email already exist.')
            }
          })
        })
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = bcrypt.hashPass(instance.password)
        instance.status = false
      },
      beforeUpdate: (instance, options) => {
        console.log(instance.password, 'before')
        instance.password = bcrypt.hashPass(instance.password)
      }
    },
    sequelize
  });

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};