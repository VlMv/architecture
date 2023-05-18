# GULP сборка
VIMv

---
## Установка/запуск
**Скачать репозиторий в папку проекта**

**Установка модулей:** npm i

**Запуск в режиме разработки:** npm run dev</br>
**Запуск релизной сборки:** npm run build</br>
**Создание архива релизной сборки:** npm run zip</br>

---
## Состав сборки
1. [Fonts](#Fonts)
2. [HTML](#HTML)
3. [IMG](#IMG)
4. [SVG](#SVG)
5. [JS](#JS)
6. [Reset](#Reset)
7. [SCSS](#SCSS)
8. [Server](#Server)
9. [ZIP](#ZIP)
10. [StyleLint](#StyleLint)

---

Требуется расширение **Path autocomplete** для VS Code для оптимизации указания путей до изображения. 

Настройка **Path autocomplete** в JSON settings:</br>
```JSON
   "path-autocomplete.pathMappings": {
      "@img": "${folder}/src/img",
      "@scss": "${folder}/src/scss",
      "@js": "${folder}/src/js",
      }
```

Расширенение в сочетании с gulp-replace позволяет унифицировать пути в коде:</br>
   `src="@img/content-test.png"` и `background-image: url(@img/background/bg-test.png);` в источнике преобразуется в `src="img/content-test.png"` и `background-image: url(../img/background/bg-test.png);` в сборке.

---
### Fonts
* Конвертация загруженных .ttf шрифтов в .woff и .woff2.
* Создание fonts.scss файла в src/scss с подключенными шрифтами @font-face.
Иногда требуется корректировка кода, когда таск не может определить font-style/font-weight через название шрифта. Для обновления файла, требуется удалить существующий.

### HTML
* Сборка html файла из html-модулей.
* Оборачивание тега `<img>` в `<picture>`. Подстановка в `<picture>` изображений WEBP и "х2 ретины" с пропиской суффиксов. Если требуются "media выражения" для замены изображения на разных расширениях, придется прописывать руками `<picture>` в исходном html коде (нет готовых решений для автоматизации "media выражений" + "ретина").
* Добавление версий css и js файлов для build версии.

### IMG
   **Необходимо экспортировать х2 изображения с макета для корректной работы таска.**
   **Для формирования фавикон экспортировать один svg файл в src/img/favicon**

* Формирование "x1" изображений из "х2 ретины".
* Подстановка суффикса для ретины.
* Создание webp изображений.
* Оптимизация изображений.
* Создание фавикон в форматах .ico 32x32, .png 192x192, .png 512x512, .png 180x180 (для apple устройств) с подстановкой суффиксов в build версии. Выгрузка в dist .webmanifest и favicon.svg. 

  Подключение фавикон в html:</br>
   ```HTML 
   <link rel="icon" href="favicon-32.ico">
   <link rel="icon" href="img/favicon/favicon.svg" type="image/svg+xml">
   <link rel="apple-touch-icon" href="img/favicon/favicon-apple-180.png">
   <link rel="manifest" href="img/favicon/manifest.webmanifest">
   ```

### SVG
* Создание svg-спрайта.

### JS
* Сборка js-модулей через WebPack.

### Reset
* Удаление файлов в dist перед запуском dev или build сборки.

### SCSS
* Автопрефиксы для свойств стилей.
* Группировка media выражений
* Минификация css.

### Server
* Запуск live сервера

Для просмотра сайта с смартфона (при подключении компьютера и смартфона к одной и той же сети):</br>
**http:// IPv4-адрес канала :номер порта**.</br>
  IPv4-адрес канала - в свойствах сети.</br>
  Номер порта прописан в таске.</br>
  Пример: http://111.222.0.333:3000.

В Брандмауэре Windows - Разрешить работу с приложениями через брандмауэр - Node.js добавить галочку на "частную" сеть.

### ZIP
* Создание архива build версии.

### StyleLint
* Автоматическая коррекция и сортировка css свойств в порядок по типу свойств.

Требуется расширение **StyleLint** для VS code.

Настройка **StyleLint** в JSON settings:</br>
   ```JSON
   "editor.codeActionsOnSave": {
      "source.fixAll.stylelint": true
   },
   "[scss]": {
      "editor.defaultFormatter": "vscode.css-language-features"
   },
   "stylelint.snippet": [
      "css",
      "less",
      "postcss",
      "scss"
   ],
   "css.validate": false,
   "less.validate": false,
   "scss.validate": false,
   "stylelint.validate": [
      "css",
      "less",
      "postcss",
      "scss"
   ],
   "stylelint.config": null,
   "editor.formatOnSave": true,
   ```

Коррекция и сортировка свойств происходит автоматически при сохранении scss файлов источника.</br>Ручное исправление командой: npx stylelint "**/*.{css,scss}" --fix




