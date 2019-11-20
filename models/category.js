module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      timestamps: false,
      underscored: true
    });
    Category.associate = models => {
      
      Category.belongsToMany(models.Photographer, {
        as: "Photographers",
        through: "category_photographer_relationship",
        timestamps: false
      })
      Category.hasMany(models.Package, {
        foreignKeyConstraint: false 
      })
    }
    return Category;
  };