# DigitalCampus

### Описание

Бакалаврская дипломная работа, которую я защитил в 2022 году в первом ВУЗе Юга России - ЮРГПУ(НПИ) им. М.И. Платова

Более подробную информацию о настройках можно найти в [этой папке](https://github.com/eCoolGe/digitalcampus/tree/master/secrets/information)

Презентация с дипломной защиты [находится тут](https://github.com/eCoolGe/digitalcampus/blob/master/secrets/information/%D0%92%D0%9A%D0%A0_090302-%D0%98%D0%A1%D0%A2%D0%B0-%D0%BE18_%D0%9A%D0%BE%D0%BD%D0%BE%D0%B2%D0%B0%D0%BB%D0%BE%D0%B2%20%D0%9D.%D0%90..pdf)
___

### Запуск программы
`npm run start`

___

### Соединение с базой данных
Чтобы соединиться с базой данных, введите в `Application Parameters` строку:
```
--connection-string "grpcs://ydb.serverless.yandexcloud.net:2135/?database=/ru-central1/b1g55tsdmlpugj1rcn8h/etn4opalg0nl3lir7fv6" --service-account-key-file "./secrets/key.json"
```
, где:

* Эндпоинт — `grpcs://ydb.serverless.yandexcloud.net:2135` 
* Размещение базы данных — `/ru-central1/b1g55tsdmlpugj1rcn8h/etn4opalg0nl3lir7fv6`
* Путь до файла сервисного ключа — `./secrets/key.json`

