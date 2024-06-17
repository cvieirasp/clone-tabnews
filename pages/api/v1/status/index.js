import database from "infra/database.js";

const status = (request, response) => {
  response.status(200).json({
    status: "OK",
  });
};

export default status;
