module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        mid: {
            type: DataTypes.STRING,
         
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    }, {
        freezeTableName: true,
        timestamps: false,
        
        underscored: true,
        tableName: 'movies',
        schema: 'public'
    });

    
    return Movie;
}