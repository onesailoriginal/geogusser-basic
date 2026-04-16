const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('kopocsy_bence_probavizsga', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const userTable = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    timestamps: true
})

const cityTable = sequelize.define('City', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
        
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

const gameAttemptTable = sequelize.define('gameAttempt', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    guessLat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    guessLng: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true
})

userTable.hasMany(gameAttemptTable, { foreignKey: 'userId' });
gameAttemptTable.belongsTo(userTable, { foreignKey: 'userId' });

cityTable.hasMany(gameAttemptTable, { foreignKey: 'cityId' });
gameAttemptTable.belongsTo(cityTable, { foreignKey: 'cityId' });

module.exports = { sequelize, userTable, cityTable, gameAttemptTable };