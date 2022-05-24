# DigitalCampus


### Чтобы соединиться с базой данных, введите в `Application Parameters` строку:
`--connection-string "grpcs://ydb.serverless.yandexcloud.net:2135/?database=/ru-central1/b1g55tsdmlpugj1rcn8h/etn4opalg0nl3lir7fv6" --service-account-key-file "./secrets/key.json"`

### Где:

`grpcs://ydb.serverless.yandexcloud.net:2135` *- Эндпоинт*

`/ru-central1/b1g55tsdmlpugj1rcn8h/etn4opalg0nl3lir7fv6` *- Размещение базы данных*

`./secrets/key.json` *- путь до файла сервисного ключа*

### Или же используйте в консоли строку:
`npm run start`