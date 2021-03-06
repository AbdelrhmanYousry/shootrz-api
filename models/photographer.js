module.exports = (sequelize, DataTypes) => {
  const Photographer = sequelize.define("photographer", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    business: DataTypes.ARRAY(DataTypes.RANGE(DataTypes.DATE)),
    work_done: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    acceptance_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    decline_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    birthday: DataTypes.DATE,
    gear: DataTypes.STRING,
    portfolio: DataTypes.STRING,
    years_experience: DataTypes.REAL,
    level_experience: {
      type: DataTypes.ENUM,
      values: ["beginner", "intermediate", "advanced"],
      defaultValue: "beginner"
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female", "other"],
    }
  }, {
    timestamps: false,
    underscored: true
  });
  Photographer.associate = models => {
    Photographer.hasMany(models.Event, {
      as: "Events",
      foreignKey: "photographer_id",
      foreignKeyConstraint: false
    })
    Photographer.belongsTo(models.Location, {
      as: "City",
      foreignKey: "location_id",     
      foreignKeyConstraint: false 

    })
    Photographer.belongsToMany(models.Category, {
      as: "Categories",
      foreignKey: "photographer_id",
      through: "category_photographer_relationship",
      foreignKeyConstraint: false,
      timestamps: false

      
    })
    Photographer.belongsToMany(models.Event, {
      as: "UpcomingEvents",
      through: "events_potential_photographers",
      foreignKey: "photographer_id",
      foreignKeyConstraint: false
    })
    Photographer.hasOne(models.PhotographerActivation, {
      as: "Code",
      foreignKey: "photographer_id",
      foreignKeyConstraint: false 
    })
  }
  
  return Photographer;
};
