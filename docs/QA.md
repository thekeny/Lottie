GATE: OPEN 22 (rounds used up)

# Проверка сайта Лотти

## Проверено в настоящем Chromium

- Один небольшой импульс колеса переводит ровно на следующий экран.
- Серия больших импульсов во время перехода не проскакивает через слайд.
- Все пять слайдов имеют высоту viewport; нет горизонтального переполнения и обрезанных заголовков / кнопок при 1440×900, 1024×768, 768×1024, 390×844, 320×640 и 844×390.
- Неверный ответ позволяет повторить попытку; 32 показывает объяснение.
- Все 12 центральных голов сменяются, затем появляется вращающийся круг.
- Пауза замораживает вращение и случайные замены; продолжение возобновляет оба действия.
- Эмуляция вертикального свайпа переключает один слайд.
- Клавиатурные стрелки переключают экраны; неактивные слайды исключены из Tab-порядка.
- `prefers-reduced-motion`: статичная орбита, мгновенные переходы.
- Без JavaScript сохраняются прокрутка, содержимое и статичный круг эмоций.
- В функциональном прогоне исключений JavaScript не зарегистрировано.
- `node --check script.js` проходит; все локальные ссылки на ресурсы существуют.

## Дизайн

Использованы frontend-design и make-interfaces-feel-better. Основа — #00402E, белый, #87FAA5, #3CDCF5 и #FF785F; Inter Regular / Bold; исходная пиксельная графика. Один главный motion-момент — орбита эмоций. Другие экраны оставлены спокойными. Шейдеры, WebGL, стоковые изображения, дополнительные библиотеки и серверные API не используются.

Просмотрены композиция, типографика, обводки и фокус, активные состояния кнопок, переходы, пауза и уменьшенная анимация. Поворот головы компенсирует вращение орбиты, поэтому выражения остаются вертикальными. Движение останавливается вне активного слайда и в скрытой вкладке.

Строгое переключение слайдов, запуск последовательности при входе и постоянная орбита сделаны по последнему запросу пользователя: эти требования имеют приоритет над общими рекомендациями design-taste-frontend о свободной прокрутке.

## Ограничения проверки

Свайпы проверены эмуляцией Chrome; физические iOS/Safari и Android-устройства не проверялись. thekeny.ru не удалось открыть, его код и переходы не копировались. Публикация и домен не настроены. Все изображения — из проекта; заменителей нет. Автопроверка шаблонных правил design-taste-frontend приведена ниже отдельно от функционального прогона.

## Результат шаблонного валидатора

Валидатор не выдал PASS: остались 22 замечания. Они сохранены открытыми, без waivers. Часть правил рассчитана на страницы из набора навыка: фиксированный контроллер слайдов распознан как отдельная секция, собственная анимация не распознана как kit-moment, минимальная композиция отмечена как пустая. Полноэкранность, реальное переключение, отсутствие переполнения и состояния орбиты отдельно проверены сценариями выше. Автоматическое замечание к фокусу относится к программно фокусируемым заголовкам; ссылки и кнопки имеют видимую обводку. Ниже приведён полный список, а не утверждение об успешном прохождении проверки.

- **no-visual** — `section#puzzle "Есть мысль?"`: pictures, effects and mocks cover 2% of this section; a feature section needs a visual (about 25% or more)
- **cta** — `section#hello`: the hero has no button (the nav's does not count)
- **cta** — `section#curiosity "А что, если попробовать?"`: the last section before the footer ends with no button
- **copy-fact** — `h1#hello-title "Привет. Я Лотти."`: the first screen holds no number, price, date, place, platform or genre
- **heading-scale** — `h2#puzzle-title "Есть мысль?"`: h2 headings in 3 sizes, 93.6px ("Маленький. С характером.") to 144px (x1.54)
- **empty-area** — `section#moods "Чувствовать. Всё."`: 88% of the section is empty: 304px above its first content, 144px of empty rows between its content, 80px under its last (button#motion-toggle), 30% beside content that covers under half the container, in its 900px of rows (WARN over 35%, FAIL over 50%)
- **focus-ring** — `h1[tabindex="-1"]:focus, h2[tabindex="-1"]:focus`: "h1[tabindex="-1"]:focus, h2[tabindex="-1"]:focus" in style.css removes the focus outline and sets nothing in its place
- **moment-none** — `(the page)`: a software page (--type) deals no moment: every kind carries one, two on a long page (moments.md)
- **hero-screen** — `footer.deck-footer "Листай вниз ↓0105↑↓"`: 68px of the next section shows on the first screen (from 832px on a 900px screen): nothing below the hero shows at load (SR-1)
- **section-height** — `footer.deck-footer "Листай вниз ↓0105↑↓"`: the section is 44px tall (0 screens), 856px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
- **one-section** — `footer.deck-footer "Листай вниз ↓0105↑↓"`: the screen at scroll 0px (stride 0) shows 44px of section 2 and the content of 2 sections, over 24px each beside section 1: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- **container-edges** — `a.skip-link "К содержанию"`: a <a> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- **container-edges** — `header.site-header "лотти. Весь спектр эмоций ↗"`: a <header> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- **container-edges** — `nav.chapter-nav "Слайды"`: a <nav> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (and 22 more like it: "Листай вниз ↓0105↑↓", div.deck-progress, "Привет.Я Лотти.Аксолотль") (SR-6)
- **container-edges** — `p#puzzle-feedback "Доверься своей смекалке."`: 1 text block starts on a left line at x 634, 562px from the container's left: text starts on the container's left, or on one split line (x 622, 732, 842) (SR-6)
- **container-edges** — `section#character > div.character-cast > div.cast-member:nth-of-type(1) > span "Весёлый"`: 1 text block starts on a left line at x 472, 400px from the container's left: text starts on the container's left, or on one split line (x 622, 732, 842) (SR-6)
- **container-edges** — `footer.deck-footer > span.scroll-hint > span "↓"`: 1 text block starts on a left line at x 165, 93px from the container's left: text starts on the container's left, or on one split line (x 622, 732, 842) (SR-6)
- **row-lines** — `section#character > div.character-cast "Весёлый Добрый Смекалистый"`: a row of 3 items: its first item starts at 360px, the container's left line at 72px; its last item ends at 1296px, the container's right line at 1368px (2px either way) (SR-7)
- **no-visual** — `section#character "Маленький. С характером."`: no picture, effect or mock in this section; a feature section needs a visual
- **section-gaps** — `section#puzzle / section#moods`: 624px between these sections (never on one screen), +122% against the median 281px
- **container** — `page`: no .wrap
- **copy-two-fragment** — `copy x3: "Привет. Я Лотти.", "Маленький. С характером.", "Чувствовать. Всё."`: two-fragment headings "X. Y.": 3, budget 1 (a tic, not a device)

### Предупреждения валидатора

Сохранены как результаты проверки. Размеры и позиции рассмотрены на скриншотах и в функциональном прогоне; рекомендации по плотности текста и коммерческой структуре не применялись к короткой истории маскота. Числовой ряд является задачкой, а не статистикой. Lighthouse и отдельный perf.mjs не запускались; оценка производительности ими не заявляется.

- **no-visual** — `section#moods "Чувствовать. Всё."`: pictures, effects and mocks cover 17% of this section; a feature section needs a visual (about 25% or more)
- **no-visual** — `section#curiosity "А что, если попробовать?"`: pictures, effects and mocks cover 20% of this section; a feature section needs a visual (about 25% or more)
- **copy-headline** — `h1#hello-title "Привет. Я Лотти."`: "Привет. Я Лотти.": no category known to check it against (pass --category, or write the <title> as "Name: what it is for whom")
- **copy-buttons** — `section#puzzle > div.puzzle-game > div.answers > button:nth-of-type(1) "24"`: "24" does not start with a verb (book, buy, try, start, get, see...) (and 2 more like it: "32", "36")
- **copy-actions** — `(the page)`: the main action "Познакомиться" does not read word for word the same in the closing section
- **section-gaps** — `section#hello / section#character`: 239px between these sections (never on one screen), -26% against the median 324px
- **section-gaps** — `section#puzzle / section#moods`: 492px between these sections (never on one screen), +52% against the median 324px
- **photo-set** — `img#emotion-central "emoji_01.png"`: 7 photographs in more than one look: saturation from 0.50 to 0.82; the odd one out is emoji_01.png
- **progress-bar** — `div.deck-progress "К содержанию лотти. Весь спектр эмоций ↗"`: a progress or meter bar on the page (fixed to the screen), like the one in "К содержанию лотти. Весь спект": the house rules have no drag or progress bars
- **photo-repeat** — `section#curiosity > div.finale-art > img.sprite:nth-of-type(1) "lotti_04.png"`: the photograph lotti_04.png is shown 2 times on the page: a picture the visitor has already seen
- **visual-caption** — `section#character > div.character-cast > div.cast-member:nth-of-type(1) > span "Весёлый"`: a muted 13px line of 1 row sits 24px under the picture lotti_03.png: it reads as a caption: "Весёлый"; no caption or description under any image, render or visual (house rule)
- **visual-caption** — `section#character > div.character-cast > div.cast-member:nth-of-type(2) > span "Добрый"`: a muted 13px line of 1 row sits 24px under the picture lotti_01.png: it reads as a caption: "Добрый"; no caption or description under any image, render or visual (house rule)
- **visual-caption** — `section#character > div.character-cast > div.cast-member:nth-of-type(3) > span "Смекалистый"`: a muted 13px line of 1 row sits 24px under the picture lotti_04.png: it reads as a caption: "Смекалистый"; no caption or description under any image, render or visual (house rule)
- **visual-caption** — `div#emotion-universe > div.emotion-title > p "У каждого настроения есть свой Лотти."`: a small 12px line is laid over the lower half of the picture emoji_01.png: "У каждого настроения есть свой Лотти."; no caption or description under any image, render or visual (house rule)
- **visual-empty** — `section#hello > div.hero-art > img.sprite "picture lotti_02.png"`: the picture lotti_02.png is nearly empty at 1440px: 4 colours in its 533x585px, 63% one colour (a thin line drawing or a logo can be this plain: look at it)
- **visual-empty** — `section#character > div.character-cast > div.cast-member:nth-of-type(2) > img.sprite "picture lotti_01.png"`: the picture lotti_01.png is nearly empty at 1440px: 3 colours in its 281x354px, 60.2% one colour (a thin line drawing or a logo can be this plain: look at it)
- **visual-empty** — `section#character > div.character-cast > div.cast-member:nth-of-type(3) > img.sprite "picture lotti_04.png"`: the picture lotti_04.png is nearly empty at 1440px: 4 colours in its 281x374px, 60.7% one colour (a thin line drawing or a logo can be this plain: look at it)
- **visual-empty** — `img#puzzle-mascot "picture emoji_03.png"`: the picture emoji_03.png is nearly empty at 1440px: 2 colours in its 140x100px, 55% one colour (a thin line drawing or a logo can be this plain: look at it)
- **empty-area** — `section#puzzle "Есть мысль?"`: 40% of the section is empty: 48px above its first content, 16px of empty rows between its content, 48px under its last (img#puzzle-mascot), 24% beside content that covers under half the container, in its 692px of rows (WARN over 35%, FAIL over 50%)
- **skip-link** — `a.skip-link "К содержанию"`: the first Tab stop is "К содержанию", not a skip link: a keyboard user tabs through the whole nav on every visit
- **share-meta** — `head`: the head lacks twitter:card: a shared link shows no picture or title of its own
- **section-air** — `section#puzzle / section#moods`: 492px of air between the content of these two sections: 128-480px (64-600px WARN) (every gap out of the band at 1440px, top to bottom: 122px after "Листай вниз ↓0105↑↓", 492px after "Естьмысль?Продолжи р") (SR-3)
- **section-air** — `footer.deck-footer / section#character`: 122px of air between the content of these two sections: 128-480px (64-600px WARN) (SR-3)
- **section-air** — `section#moods "Чувствовать.Всё.У каждого настроения ест"`: the content fills 52.1% of the section's height (470 of 900px): 55% or more (40% WARN) (SR-3)
- **tap-size** — `nav.chapter-nav > a:nth-of-type(1)`: a 32x32px tap target (and 4 more like it on this screen): under the 44px a phone needs
- **hole** — `section#moods "Чувствовать. Всё."`: an empty hole 296x232px inside the section (27% of the screen's height), with content above and below it
- **visual-empty** — `img#emotion-central "picture emoji_01.png"`: the picture emoji_01.png is nearly empty at 390px: 5 colours in its 226x117px, 59.8% one colour (a thin line drawing or a logo can be this plain: look at it)
- **copy-stat-strip** — `copy x1: "2 / 4 / 8 / 16 / 24 /..."`: stat strip x1
