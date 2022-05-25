const express = require('express');
const router = express.Router();
express().set('view engine', 'hbs');
let Handlebars = require('hbs');
let moment = require('moment');


const readTableByName = require('../db/snippet').readTableByName;
const editSimpleByName = require('../db/snippet').editSimpleByName;
const selectSimpleByName = require('../db/snippet').selectSimpleByName;
const deleteSimpleByName = require('../db/snippet').deleteSimpleByName;

const USERS_TABLE = 'users';

const urlencodedParser = express.urlencoded({ extended: false });

// /* GET users listing. */
// router.get('/', async function(req, res, next) {
//   let nn = (await readTableS()).map(loc => loc.nameLocation);
//   res.render("index.hbs", {
//     title: "Мои контакты",
//     emailsVisible: true,
//     emails: nn,
//     phone: "+1234567890"
//   });
// });

// получение списка пользователей
router.get('/', async function(req, res) {
    let data = (await readTableByName(USERS_TABLE));
    // console.log(data);
    res.render('users/index.hbs', {
        title: "Список пользователей",
        users: data,
    });
    Handlebars.registerHelper('formatTime', function (date, format) {
        let mmnt = moment(date);
        return mmnt.format(format);
    });
});

// возвращаем форму для добавления данных
router.get('/create', function(req, res) {
    res.render('users/create.hbs', {
        title: "Добавление пользователя",
    });
});

// получаем отправленные данные и добавляем их в БД
router.post("/create", urlencodedParser, async function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const id_user = req.body.idUser;
  const id_pass = req.body.idPass;
  const id_gradebook = req.body.idGradebook;
  const id_employee = req.body.idEmployee;
  const passport = req.body.passport;
  const personality_data = req.body.personalityData;
  const fio = req.body.fio;
  const birth_date = req.body.birthDate;
  const gender = req.body.gender;

  //console.log(`${id_user}, ${id_pass}, ${id_gradebook}, ${id_employee}, "${passport}", "${personality_data}", "${fio}", Date(${birth_date}), "${gender}"`);

  try {
      await editSimpleByName(USERS_TABLE, `insert`,`${id_user}, ${id_pass}, ${id_gradebook}, ${id_employee}, "${passport}", "${personality_data}", "${fio}", Date("${birth_date}"), "${gender}"`);
      res.redirect("/users");
  }
  catch (err) {
      console.log("It is not possible to add data to the table: the primary key has already been used (Error 409)");
      res.status(409).send("Невозможно добавить данные в таблицу: первичный ключ уже был использован");
  }
});

// получаем id удаляемого пользователя и удаляем его из бд
router.post("/delete/:id", async function(req, res){

  const id = req.params.id;

    try {
        await deleteSimpleByName(USERS_TABLE, 'id_user', id);
        res.redirect("/users");
    }
    catch (err) {
        console.log(err);
    }

});

// возвращаем форму для добавления данных
router.get('/edit', function(req, res) {
    res.redirect(`/users`);
});

// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
router.get("/edit/:id", async function(req, res){
  const id = req.params.id;

  try {
      let data = (await selectSimpleByName(USERS_TABLE, 'id_user', id));
      console.log(data);
      res.render("users/edit.hbs", {
          title: "Редактирование пользователя",
          user: data[0]
      });
      Handlebars.registerHelper('formatTime', function (date, format) {
          let mmnt = moment(date);
          return mmnt.format(format);
      });
      Handlebars.registerHelper('isSelected', function (first, second) {
          return first === second ? 'selected' : '';
      });
  }
  catch (err) {
      console.log(err);
  }
});

router.post("/edit/:id", urlencodedParser, async function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const id_user = req.params.id;

    //const id_user = req.body.idUser;
    const id_pass = req.body.idPass;
    const id_gradebook = req.body.idGradebook;
    const id_employee = req.body.idEmployee;
    const passport = req.body.passport;
    const personality_data = req.body.personalityData;
    const fio = req.body.fio;
    const birth_date = req.body.birthDate;
    const gender = req.body.gender;

    //console.log(`${id_user}, ${id_pass}, ${id_gradebook}, ${id_employee}, "${passport}", "${personality_data}", "${fio}", Date(${birth_date}), "${gender}"`);

    try {
        await deleteSimpleByName(USERS_TABLE, 'id_user', id_user);
        await editSimpleByName(USERS_TABLE, `insert`,`${id_user}, ${id_pass}, ${id_gradebook}, ${id_employee}, "${passport}", "${personality_data}", "${fio}", Date("${birth_date}"), "${gender}"`);
        res.redirect(`/users`);
    }
    catch (err) {
        console.log(err);
        //res.status(409).send("Невозможно добавить данные в таблицу: первичный ключ уже был использован");
    }
});

module.exports = router;

// // получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
// router.get("/edit/:id", function(req, res){
//   const id = req.params.id;
//   pool.query("SELECT * FROM users WHERE id=?", [id], function(err, data) {
//     if(err) return console.log(err);
//     res.render("edit.hbs", {
//       user: data[0]
//     });
//   });
// });
// // получаем отредактированные данные и отправляем их в БД
// router.post("/edit", urlencodedParser, function (req, res) {
//
//   if(!req.body) return res.sendStatus(400);
//   const name = req.body.name;
//   const age = req.body.age;
//   const id = req.body.id;
//
//   pool.query("UPDATE users SET name=?, age=? WHERE id=?", [name, age, id], function(err, data) {
//     if(err) return console.log(err);
//     res.redirect("/");
//   });
// });