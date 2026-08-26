# Рекомендации по улучшению проекта SkyFitnessPro

Данный документ содержит структурированный список рекомендаций по оптимизации и улучшению кодовой базы, ассетов, доступности и архитектуры проекта.

---

## 1. Оптимизация изображений и статических ассетов
**Ветка:** `feature/optimize-images-and-assets`

### 1.1. Переход на компонент `next/image` (`<Image />`)
* **Где:** [`Card.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Card/Card.tsx), [`Header.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Header/Header.tsx), [`ProfileContent.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ProfileContent/ProfileContent.tsx), [`courses/[courseId]/page.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/app/(public)/courses/[courseId]/page.tsx).
* **Почему так лучше:**
  1. **Автоматическое сжатие:** Next.js на лету оптимизирует растровые `.png` (например, `new-way.png` весит 274 КБ, `bodyflex-course.png` — 156 КБ) в современные форматы **WebP** и **AVIF**, уменьшая объем передаваемых данных в 3–5 раз.
  2. **Устранение сдвигов верстки (CLS):** Компонент `<Image />` резервирует место под картинку, предотвращая дергание макета при рендере.
  3. **Lazy-loading из коробки:** Изображения за пределами экрана загружаются только по мере скролла страницы.
  4. **Приоритетная загрузка (LCP):** Для главного баннера курса можно указать проп `priority`.

### 1.2. Очистка неиспользуемых ассетов (Dead Assets)
* **Где:** Папка [`public/images/`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/public/images) (`Mask group.png`, `polygon-1.svg`).
* **Почему так лучше:** Эти файлы отсутствуют в импортах. Удаление снижает размер репозитория и продакшн-сборки.

### 1.3. Унификация формата логотипа (SVG)
* **Где:** В [`Auth.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Auth/Auth.tsx) используется `logo.png`, а в [`Header.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Header/Header.tsx) — `logo.svg`.
* **Почему так лучше:** Векторный SVG идеально отображается на экранах любого разрешения (HiDPI/Retina), весит меньше и исключает дублирование ассета.

### 1.4. Стандартизация именования файлов (kebab-case)
* **Где:** `Mask group.png` (пробел в имени), `Check-in-Circle_big.svg`, `direction-Icon.svg`, `new-way_mobile.png`.
* **Почему так лучше:** Пробелы в путях приводят к проблемам кодирования URL (`%20`). Единый строчный стиль `kebab-case` (`check-in-circle-big.svg`, `direction-icon.svg`, `new-way-mobile.png`) — принятый стандарт веб-разработки.

---

## 2. Аутентификация, Next.js и React-паттерны
**Ветка:** `feature/auth-loading-and-react-patterns`

### 2.1. Добавление состояния `isLoading` в `AuthProvider`
* **Где:** [`AuthProvider.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/context/AuthProvider.tsx) и [`(private)/layout.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/app/(private)/layout.tsx).
* **Почему так лучше:** При перезагрузке страницы `/profile` состояние `user` изначально `null`, из-за чего приватный layout мгновенно показывает заглушку *"Для доступа к данной странице необходимо авторизоваться"*, пока не завершится запрос к API. Флаг `isLoading` позволяет показывать прелоадер и исключает мигание неавторизованного экрана (Auth Flicker).

### 2.2. Мемоизация функции `logout` через `useCallback`
* **Где:** [`AuthProvider.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/context/AuthProvider.tsx).
* **Почему так лучше:** Функция `logout` без `useCallback` создает новую ссылку на каждый рендер, вызывая повторное срабатывание хука `useEffect(() => setLogoutHandler(logout), [logout])` на каждый рендер провайдера.

### 2.3. Иммутабельная сортировка массивов при рендере
* **Где:** [`ProfileContent.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ProfileContent/ProfileContent.tsx).
* **Почему так лучше:** `addedCourses.sort(...)` мутирует массив по месту. В React безопаснее использовать `[...addedCourses].sort(...)` или `addedCourses.toSorted(...)`.

### 2.4. Соглашение об именовании страниц по PascalCase
* **Где:** [`src/app/(public)/courses/[courseId]/page.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/app/(public)/courses/[courseId]/page.tsx) (`const coursePage` $\rightarrow$ `CoursePage`).
* **Почему так лучше:** Стандарт именования React-компонентов с заглавной буквы обеспечивает корректное отображение в стеках ошибок и DevTools.

---

## 3. Исправление багов верстки и стилей Tailwind CSS
**Ветка:** `feature/fix-tailwind-styles-and-card-bugs`

### 3.1. Опечатка в классах теней Tailwind (`shadow=[...]`)
* **Где:**
  * [`WorkoutList.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/WorkoutList/WorkoutList.tsx)
  * [`ExerciseModal.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ExerciseModal/ExerciseModal.tsx)
* **Почему так лучше:** Запись `shadow=[0_4px_...` содержит знак `=` вместо дефиса `-`. Из-за этого класс игнорируется компилятором Tailwind, и тень модального окна отсутствует.

### 3.2. Дублирование id в SVG-масках `Card.tsx`
* **Где:** [`Card.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Card/Card.tsx) (`id="clip0_47_2965"`).
* **Почему так лучше:** При рендере нескольких карточек на странице создаются одинаковые ID для `<clipPath>`, что нарушает спецификацию HTML/SVG и может вызывать графические баги в Safari и Chrome.

### 3.3. Устранение дублирования JSX в `Card.tsx` (DRY)
* **Где:** [`Card.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Card/Card.tsx).
* **Почему так лучше:** В тернарном операторе дублируется весь тег `<article>` и кнопка добавления/удаления с подсказкой. Разница лишь в обертке карточки (`<Link>` против `<div>`). Вынесение общей структуры сократит код и упростит поддержку.

### 3.4. Опечатка в названии функции
* **Где:** [`Auth.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Auth/Auth.tsx) (`hanldeChangeAuthMode` $\rightarrow$ `handleChangeAuthMode`).

---

## 4. Доступность (a11y), семантика и UX
**Ветка:** `feature/a11y-semantics-and-navigation`

### 4.1. Семантический тег `<form>` для авторизации
* **Где:** [`Auth.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Auth/Auth.tsx).
* **Почему так лучше:** Форма на `<div>` не позволяет отправлять данные по нажатию клавиши Enter и хуже обрабатывается экранными дикторами.

### 4.2. Навигация по логотипу через `<Link>` вместо `<img> + onClick`
* **Где:** [`Header.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Header/Header.tsx).
* **Почему так лучше:** Обеспечивает поддержку клавиатурной навигации (фокус через Tab), открытие ссылки в новой вкладке по клику колесиком и предварительную загрузку страницы через Next.js prefetching.

### 4.3. Семантичная кнопка профиля с ARIA-атрибутами
* **Где:** [`Header.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Header/Header.tsx).
* **Почему так лучше:** Замена `<div onClick=...>` на `<button type="button" aria-haspopup="menu" aria-expanded={isUserPopUpShown}>` делает выпадающее меню доступным для пользователей со скринридерами.

### 4.4. Обязательные атрибуты доступности (ARIA & a11y)
* **Где:**
  * [`WorkoutContent.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/WorkoutContent/WorkoutContent.tsx): тегу `<iframe>` необходим атрибут `title` для описания содержимого.
  * [`ProgressBar.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ProgressBar/ProgressBar.tsx): нужны атрибуты `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`.
  * [`WorkoutList.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/WorkoutList/WorkoutList.tsx), [`Card.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Card/Card.tsx): добавление атрибутов `alt` для иконок статуса и действий.

### 4.5. Иерархия заголовков `<h1>` - `<h6>`
* **Где:** [`WorkoutList.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/WorkoutList/WorkoutList.tsx), [`ExerciseModal.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ExerciseModal/ExerciseModal.tsx), [`courses/[courseId]/page.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/app/(public)/courses/[courseId]/page.tsx).
* **Почему так лучше:** На странице должен быть только один основной `<h1>`. В модальных окнах следует использовать `<h2>`/`<h3>`. На странице курса заголовок `<h1>` не должен скрываться на мобильных экранах (`hidden md:block`), иначе страница лишается главного заголовка в мобильной выдаче.

---

## 5. Архитектура компонентов, кастомные хуки и TypeScript
**Ветка:** `feature/refactor-components-and-hooks`

### 5.1. Расширение типизации и поддержка `type` в `Button.tsx`
* **Где:** [`Button.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Button/Button.tsx).
* **Почему так лучше:** Жестко заданный `type="button"` не позволяет использовать кнопку как `type="submit"` в формах. Наследование от `React.ButtonHTMLAttributes<HTMLButtonElement>` делает UI-компонент универсальным.

### 5.2. Кастомный хук `useClickOutside`
* **Где:** [`Header.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/Header/Header.tsx).
* **Почему так лучше:** Инкапсуляция логики отслеживания клика вне элемента в отдельный хук `useClickOutside(ref, callback)` делает код компонентов чище и позволяет переиспользовать его в любых попапах и модалках.

### 5.3. Улучшение блокировки скролла и закрытие по Escape в `ModalWrapper`
* **Где:** [`ModalWrapper.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ModalWrapper/ModalWrapper.tsx).
* **Почему так лучше:** Сохранение исходного стиля `document.body.style.overflow` предотвращает сброс стилей страницы при размонтировании, а обработка нажатия клавиши `Escape` повышает удобство использования.

### 5.4. Защита диапазона и плавная анимация в `ProgressBar`
* **Где:** [`ProgressBar.tsx`](file:///f:/web/skypro/SkyFitnessPro/skyfitnesspro/src/components/ProgressBar/ProgressBar.tsx).
* **Почему так лучше:** Ограничение диапазона `Math.min(100, Math.max(0, progress))` защищает от отрицательных и некорректных значений, а класс `transition-all duration-300` обеспечивает плавное заполнение шкалы.

---

## 6. Расширение тестового покрытия (Jest & RTL)
**Ветка:** `feature/expand-component-tests`

### 6.1. Юнит- и интеграционные тесты компонентов
* **Где:** Папка `src/` (тесты компонентов и хуков).
* **Почему так лучше:** В проекте уже настроены `jest`, `ts-jest` и `@testing-library/react`. Покрытие тестами компонентов (`Button`, `ProgressBar`, `Card`, валидации `Auth`) закрепит навыки тестирования React-приложений и предотвратит регрессионные ошибки при рефакторинге.
