const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dbConfig = require("./db.config.js");
const fileUpload = require("express-fileupload");
const path = require("path");
const uniqueFilename = require("unique-filename");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const app = express();
const port = process.env.PORT || 8085;
// Загрузка файлов
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Парсинг json
app.use(bodyParser.json());

app.use(history());

// Обработка статических файлов
app.use("/", serveStatic(path.join(__dirname, "../dist/project")));

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Создание соединения с базой данных
let connection;
if (process.env.NODE_ENV === "production") {
  connection = mysql.createPool({
    host: dbConfig.PROD.HOST,
    user: dbConfig.PROD.USER,
    password: dbConfig.PROD.PASSWORD,
    database: dbConfig.PROD.DB,
    charset: "utf8_general_ci",
    connectionLimit: 10,
  });
} else {
  connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    charset: "utf8_general_ci",
    connectionLimit: 10,
  });
}

connection.getConnection((err, connect) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  } else {
    connect.query('SET NAMES "utf8"');
    connect.query('SET CHARACTER SET "utf8"');
    connect.query('SET SESSION collation_connection = "utf8_general_ci"');
    console.log("Успешно соединено с БД");
  }
  if (connect) connect.release();
});

//Обработка входа владельца недвижимости
app.post("/api/login-owner", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для входа:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM owner WHERE (login="${req.body.login}") AND (password="${req.body.password}")`,
    function (err, results) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при получении пользователя по логину");
        console.log(err);
      }
      console.log("Результаты проверки существования пользователя:");
      if (results !== undefined) {
        // console.log(results[0]);
        if (results[0] === undefined) {
          res.json("not exist");
        } else {
          res.json(results);
        }
      }
    }
  );
});

//Обработка входа риелтора
app.post("/api/login-realtor", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для входа:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM realtors WHERE (login="${req.body.login}") AND (password="${req.body.password}")`,
    function (err, results) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при получении пользователя по логину");
        console.log(err);
      }
      console.log("Результаты проверки существования пользователя:");
      if (results !== undefined) {
        // console.log(results[0]);
        if (results[0] === undefined) {
          res.json("not exist");
        } else {
          res.json(results);
        }
      }
    }
  );
});

//Обработка входа покупателя
app.post("/api/login-customer", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для входа:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM customer WHERE (login="${req.body.login}") AND (password="${req.body.password}")`,
    function (err, results) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при получении пользователя по логину");
        console.log(err);
      }
      console.log("Результаты проверки существования пользователя:");
      if (results !== undefined) {
        // console.log(results[0]);
        if (results[0] === undefined) {
          res.json("not exist");
        } else {
          res.json(results);
        }
      }
    }
  );
});

//Обработка входа администратора
app.post("/api/login-admin", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для входа:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM admins WHERE (login="${req.body.login}") AND (password="${req.body.password}")`,
    function (err, results) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при получении пользователя по логину");
        console.log(err);
      }
      console.log("Результаты проверки существования пользователя:");
      if (results !== undefined) {
        // console.log(results[0]);
        if (results[0] === undefined) {
          res.json("not exist");
        } else {
          res.json(results);
        }
      }
    }
  );
});

// Регистрация владельца недвижимости
app.post("/api/registrationOwner", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для пользователей:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM owner WHERE login='${req.body.login}'`,
    function (error, results) {
      if (error) {
        res
          .status(500)
          .send(
            "Ошибка сервера при получении пользователей с таким же логином"
          );
        console.log(error);
      }
      console.log("Результаты проверки существования логина:");
      console.log(results[0]);
      if (results[0] === undefined) {
        connection.query(
          "INSERT INTO `owner` (`name`, `phone`, `email`, `login`, `password`) VALUES (?, ?, ?, ?, ?)",
          [
            req.body.name,
            req.body.phone,
            req.body.email,
            req.body.login,
            req.body.password,
          ],
          function () {
            console.log(
              "Запрос на проверку существования созданной записи в БД"
            );
            connection.query(
              `SELECT * FROM owner WHERE login="${req.body.login}"`,
              function (err, result) {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Ошибка сервера при получении пользователя по логину"
                    );
                  console.log(err);
                } else {
                  console.log(result);
                  res.json(result);
                }
              }
            );
          }
        );
      } else {
        res.json("exist");
      }
    }
  );
});

// Регистрация покупатель
app.post("/api/registrationCustomer", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для пользователей:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM customer WHERE login='${req.body.login}'`,
    function (error, results) {
      if (error) {
        res
          .status(500)
          .send(
            "Ошибка сервера при получении пользователей с таким же логином"
          );
        console.log(error);
      }
      console.log("Результаты проверки существования логина:");
      console.log(results[0]);
      if (results[0] === undefined) {
        connection.query(
          "INSERT INTO `customer` (`name`, `phone`, `email`, `login`, `password`) VALUES (?, ?, ?, ?, ?)",
          [
            req.body.name,
            req.body.phone,
            req.body.email,
            req.body.login,
            req.body.password,
          ],
          function () {
            console.log(
              "Запрос на проверку существования созданной записи в БД"
            );
            connection.query(
              `SELECT * FROM customer WHERE login="${req.body.login}"`,
              function (err, result) {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Ошибка сервера при получении пользователя по логину"
                    );
                  console.log(err);
                } else {
                  console.log(result);
                  res.json(result);
                }
              }
            );
          }
        );
      } else {
        res.json("exist");
      }
    }
  );
});

// Регистрация риэлтора
app.post("/api/registrationRealtor", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для пользователей:");
  console.log(req.body);
  connection.query(
    `SELECT * FROM realtors WHERE login='${req.body.login}'`,
    function (error, results) {
      if (error) {
        res
          .status(500)
          .send(
            "Ошибка сервера при получении пользователей с таким же логином"
          );
        console.log(error);
      }
      console.log("Результаты проверки существования логина:");
      console.log(results[0]);
      if (results[0] === undefined) {
        connection.query(
          "INSERT INTO `realtors` (`name`, `phone`, `id_agency`, `login`, `password`) VALUES (?, ?, ?, ?, ?)",
          [
            req.body.name,
            req.body.phone,
            req.body.id_agency,
            req.body.login,
            req.body.password,
          ],
          function () {
            console.log(
              "Запрос на проверку существования созданной записи в БД"
            );
            connection.query(
              `SELECT * FROM realtors WHERE login="${req.body.login}"`,
              function (err, result) {
                if (err) {
                  res
                    .status(500)
                    .send(
                      "Ошибка сервера при получении пользователя по логину"
                    );
                  console.log(err);
                } else {
                  console.log(result);
                  res.json(result);
                }
              }
            );
          }
        );
      } else {
        res.json("exist");
      }
    }
  );
});

// Получение файла и загрузка его в папку uploads
app.post("/upload-photo/", async (req, res) => {
  console.log("Пришёл POST запрос для загрузки файла:");
  console.log("Файл: ", req.files);
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let photo = req.files.file0;
      let name = uniqueFilename("") + "." + photo.name.split(".")[1];
      photo.mv("./server/uploads/" + name);
      res.send({
        status: true,
        message: "File is uploaded",
        filename: name,
      });
    }
  } catch (err) {
    console.log("Ошибка ", err);
    res.status(500).send(err);
  }
});

//Получение полного пути файла
app.get("/api/photo/:filename", (req, res) => {
  console.log(path.join(__dirname, "uploads", req.params.filename));
  res.sendFile(path.join(__dirname, "uploads", req.params.filename));
});

// Получение риэлторских агенств, чей рейтинг = 5
app.get("/api/getAgencyFive", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `agency_realtors` WHERE rating=5 LIMIT 5",
      function (error, results) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении агенств");
          console.log(error);
        }
        console.log("Результаты получения агенств");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Добавление заявки на покупку (покупатель)
app.post("/api/addRequestPurchase", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания заявки на покупку:");
  console.log(req.body);
  connection.query(
    `INSERT INTO request_purchase (status, id_customer, id_realty) VALUES (?, ?, ?);`,
    [req.body.status, req.body.id_customer, req.body.id_realty],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании заявки");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});

//Обработка получения списка заявок на покупку
app.get("/api/getRequestsPurchase", function (req, res) {
  try {
    connection.query("SELECT * FROM `requests`", function (error, results) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении заявок на покупку");
        console.log(error);
      }
      console.log("Результаты получения заявок на покупку");
      console.log(results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

//Обработка получения списка покупателей
app.get("/api/getCustomers", function (req, res) {
  try {
    connection.query("SELECT * FROM `customer`", function (error, results) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении заявок на покупку");
        console.log(error);
      }
      console.log("Результаты получения заявок на покупку");
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

// Удаление покупателя
app.delete("/api/deleteCustomer/:id_customer", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл DELETE запрос для удаления покупателя по id:");
  console.log(req.body);
  connection.query(
    `DELETE FROM customer WHERE id_customer=${req.params.id_customer}`,
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при удалении покупателя по id");
        console.log(err);
      }
      console.log("Удаление прошло успешно");
      res.json("delete");
    }
  );
});

// Удаление риэлтора
app.delete("/api/deleteRealtor/:id_realtor", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл DELETE запрос для удаления по id:");
  console.log(req.body);
  connection.query(
    `DELETE FROM realtors WHERE id_realtor=${req.params.id_realtor}`,
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при удалении по id");
        console.log(err);
      }
      console.log("Удаление прошло успешно");
      res.json("delete");
    }
  );
});


// Добавление покупателя
app.post("/api/addCustomer", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания аккаунта:");
  console.log(req.body);
  connection.query(
    `INSERT INTO customer (name, phone, email, login, password) VALUES (?, ?, ?, ?, ?);`,
    [
      req.body.name,
      req.body.phone,
      req.body.email,
      req.body.login,
      req.body.password,
    ],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании аккаунта");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});


// Добавление заявки на риэлторские услуги (владелец)
app.post("/api/addContractService", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания заявки на услуги:");
  console.log(req.body);
  connection.query(
    `INSERT INTO contract_services (title, id_owner, id_service, id_realtor) VALUES (?, ?, ?, ?);`,
    [
      req.body.title,
      req.body.id_owner,
      req.body.id_service,
      req.body.id_realtor,
    ],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании заявки");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});

//Обработка получения списка заявок на риэлторские услуги
app.get("/api/getContractService", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `contract_services`",
      function (error, results) {
        if (error) {
          res
            .status(500)
            .send("Ошибка сервера при получении заявок на покупку");
          console.log(error);
        }
        console.log("Результаты получения заявок на покупку");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Добавление недвижимости (владелец)
app.post("/api/addRealty", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания услуги риэлтора:");
  console.log(req.body);
  connection.query(
    `INSERT INTO realty (image, address, price, id_type_realty, id_owner) VALUES (?, ?, ?, ?,?);`,
    [
      req.body.image,
      req.body.address,
      req.body.price,
      req.body.id_type_realty,
      req.body.id_owner,
    ],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании услуги риэлтора");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});

//Обработка получения списка недвижимости (всего)
app.get("/api/getRealty", function (req, res) {
  try {
    connection.query("SELECT * FROM `realty`", function (error, results) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении заявок на покупку");
        console.log(error);
      }
      console.log("Результаты получения заявок на покупку");
      console.log(results);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

//Обработка получения трех последний объявлений о продаже недвижимости
app.get("/api/getRealtyThree", function (req, res) {
  try {
    connection.query(
      `SELECT * FROM realty ORDER BY id_realty DESC LIMIT 3`,
      function (error, results) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении списка");
          console.log(error);
        }
        console.log("Результаты получения списка");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Получение списка недвижимости по владельцу
app.post("/api/getOwnerRealty", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для загрузки мастера:");
  console.log(req.body);
  try {
    connection.query(
      "SELECT * FROM realty WHERE id_owner=?;",
      [req.body.id_owner],
      function (err, results) {
        if (err) {
          res.status(500).send("Ошибка сервера при поиске мастера по id ");
          console.log(err);
        }
        console.log("Мастер найден успешно");
        console.log("Результаты:");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Удаление недвижимости (владелец)
app.delete("/api/deleteRealty/:id_realty", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл DELETE запрос для удаления недвижимости по id:");
  console.log(req.body);
  connection.query(
    `DELETE FROM realty WHERE id_realty=${req.params.id_realty}`,
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при удалении недвижимости по id");
        console.log(err);
      }
      console.log("Удаление прошло успешно");
      res.json("delete");
    }
  );
});

// Добавление риелторской услуги
app.post("/api/addRealtorService", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания услуги риэлтора:");
  console.log(req.body);
  connection.query(
    `INSERT INTO realtor_services (title, price, id_realtor) VALUES (?, ?, ?);`,
    [req.body.title, req.body.price, req.body.id_realtor],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании услуги риэлтора");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});

// Обработка удаления риэлторской услуги
app.delete("/api/deleteRealtorService/:id_service", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл DELETE запрос для удаления карточки:");
  console.log(req.body);
  connection.query(
    `DELETE FROM realtor_services WHERE id_service=${req.params.id_service}`,
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при удалении карточки по id");
        console.log(err);
      }
      console.log("Удаление прошло успешно");
      res.json("delete");
    }
  );
});

//Обработка получения списка риэлторских услуг (всего)
app.get("/api/getRealtorService", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `realtor_services`",
      function (error, results) {
        if (error) {
          res
            .status(500)
            .send("Ошибка сервера при получении заявок на покупку");
          console.log(error);
        }
        console.log("Результаты получения заявок на покупку");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Обработка получения списка риэлторских услуг (по риэлтору)
app.post("/api/getOneRealtorService", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для загрузки:");
  console.log(req.body);
  try {
    connection.query(
      "SELECT * FROM realtor_services WHERE id_realtor=?",
      [req.body.id],
      function (err, results) {
        if (err) {
          res.status(500).send("Ошибка сервера при поиске по id ");
          console.log(err);
        }
        console.log("Мастер найден успешно");
        console.log("Результаты:");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Обработка получения списка риэлторов
app.get("/api/getRealtors", function (req, res) {
  try {
    connection.query("SELECT * FROM `realtors`", function (error, results) {
      if (error) {
        res.status(500).send("Ошибка сервера при получении списка");
        console.log(error);
      }
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

// Добавление риэлторского агентства (админ)
app.post("/api/addAgencyRealtors", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для создания риэлторского агенства:");
  console.log(req.body);
  connection.query(
    `INSERT INTO agency_realtors (name, rating, year_foundation) VALUES (?, ?, ?);`,
    [req.body.name, req.body.rating, req.body.year_foundation],
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при cоздании агенства");
        console.log(err);
      }
      console.log("Создание прошло успешно");
      res.json("create");
    }
  );
});

//Обработка получения списка риэлторских агентств
app.get("/api/getAgencyRealtors", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `agency_realtors`",
      function (error, results) {
        if (error) {
          res
            .status(500)
            .send("Ошибка сервера при получении списка риэлторских агентств");
          console.log(error);
        }
        console.log("Результаты получения заявок на покупку");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Обработка удаления риэлторского агентства
app.delete("/api/deleteAgencyRealtors/:id_agency", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл DELETE запрос для удаления:");
  console.log(req.body);
  connection.query(
    `DELETE FROM agency_realtors WHERE id_agency=${req.params.id_agency}`,
    function (err) {
      if (err) {
        res.status(500).send("Ошибка сервера при удалении по id");
        console.log(err);
      }
      console.log("Удаление прошло успешно");
      res.json("delete");
    }
  );
});

// Обработка добавления заявки на обратный звонок
app.post("/api/addRequestCall", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для добавления заявки на обратный звонок:");
  console.log(req.body);
  connection.query(
    `INSERT INTO request_call (fio, phone, status) VALUES (?, ?, ?);`,
    [req.body.fio, req.body.phone, "принят в работу"],
    function (err) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при добавлении заявки на обратный звонок");
        console.log(err);
      }
      console.log("Добавление заявки прошло успешно");
      res.json("create");
    }
  );
});

// Обработка обновления заявки на обратный звонок
app.put("/api/updateRequestCall/:id_call", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для добавления заявки на обратный звонок:");
  console.log(req.body);
  connection.query(
    `UPDATE request_call SET status=? WHERE id_call=?`,
    [req.body.status, req.params.id_call],
    function (err) {
      if (err) {
        res
          .status(500)
          .send("Ошибка сервера при добавлении заявки на обратный звонок");
        console.log(err);
      }
      console.log("Добавление заявки прошло успешно");
      res.json("create");
    }
  );
});

// Получение списка всех заявок на обратный звонок
app.get("/api/getRequestCalls", function (req, res) {
  try {
    connection.query(
      "SELECT * FROM `request_call` ORDER BY id_call DESC",
      function (error, results) {
        if (error) {
          res.status(500).send("Ошибка сервера при получении списка заявок");
          console.log(error);
        }
        console.log("Результаты получения списка заявок на обратный звонок");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// Получение заявки на обратный звонок по id
app.post("/api/getOneRequestCall", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log("Пришёл POST запрос для загрузки заявки:");
  console.log(req.body);
  try {
    connection.query(
      "SELECT * FROM request_call WHERE id_call=?;",
      [req.body.id_call],
      function (err, results) {
        if (err) {
          res.status(500).send("Ошибка сервера при поиске заявки по id ");
          console.log(err);
        }
        console.log("Заяка найдена успешно");
        console.log("Результаты:");
        console.log(results);
        res.json(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV === "production") {
  // Информирование о запуске сервера и его порте
  app.listen(port, "0.0.0.0", () => {
    console.log("Сервер запущен на http://0.0.0.0:" + port);
  });
} else {
  // Информирование о запуске сервера и его порте
  app.listen(port, () => {
    console.log("Сервер запущен на http://localhost:" + port);
  });
}
