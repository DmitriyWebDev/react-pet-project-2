### Условия задачи
```
Задача: ​Написать web-приложение, используя React.js, Redux

- Таблица с пользователями. Данные получит Get-запросом. JSON доступен по
адресу:

https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json

- Панель с фильтрами.

Таблица ​​должна показывать следующие столбцы:
- Имя
- Возраст
- Пол
- Департамент
- Адрес в формате “Город, Улица”

Должна быть возможность отсортировать таблицу по любому столбцу
(убывание/возрастание).

Панель фильтров ​должна показывать опции, разделённые по группам:
- Пол
- Департамент
- Город

Опции должны генерироваться на основании данных. Т.е. в фильтре “пол”, например,
две опции: “female” и “male”. В поле город -- все возможные города и т. д. Опции
представляют собой “Checkbox [Значение Фильтра] (4)”. Цифра в скобках показывает
сколько раз этот фильтр встречается в отфильтрованной коллекции.
При нажатии на checkbox таблица должна фильтроваться по соответствующему
значению. При этом, все остальные фильтры должны пересчитаться. Нулевые
фильтры (те, которые не применимы к коллекции) не показываются на экране.

Например: при нажатии на фильтр “Пол” - “female” в таблице отфильтровываются все
женщины. При этом фильтр “male” показываться не должен.

Требования к вёрстке:
● Страница должна быть сверстана вручную (без использования Bootstrap, Foundation
и тп).
● При разрешении экрана:
    ○ >= 900px фильтры должны располагаться горизонтально (один за
    другим). Таблица с фильтрами имеет максимальную ширину 1200px
    ○ < 900px фильтры должны располагаться вертикально (в один столбец).
    А также должен скрываться столбец “Адрес”. Таблица растягивается на всю
    возможную ширину.


## Create-react-app infomation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
