import { Sequelize } from "sequelize";

const sequelize = new Sequelize("user_profile", "postgres", "jensi@2153", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Postgress Connected");
  })
  .catch((error) => {
    console.log(error);
  });

export default sequelize;
