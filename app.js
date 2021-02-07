"use strict";

const ticTakToe = {
  gameDivElement: document.getElementById("game"),
  buttonPlay: document.getElementById("playGame"),
  textPhaser: document.querySelector(".controlPanel").querySelector(".player"),
  status: "play",
  isInitialButton: true,
  phaser: "X",
  mapValues: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],

  /**
   * инициализация игры
   */
  init() {
    // выводим все ячейки
    this.renderMap();

    // для инициализации кнопок единоразово
    if (this.isInitialButton) {
      this.initEventHandler();
      this.initEventNewGame();
      this.isInitialButton = false;
    }
  },

  /**
   * формирование и вывод ячеек игрового поля
   */
  renderMap() {
    for (let row = 0; row < 3; row++) {
      const divRow = document.createElement("div");
      divRow.classList.add("gameDivRow");
      this.gameDivElement.appendChild(divRow);
      for (let col = 0; col < 3; col++) {
        const divCol = document.createElement("div");
        divCol.classList.add("gameDivCol");
        divCol.dataset.row = row.toString();
        divCol.dataset.col = col.toString();
        divRow.appendChild(divCol);
      }
    }
  },

  /**
   * инициализация обработчика события
   */
  initEventHandler() {
    // Ставим обработчик, при клике на игровое поле вызывает функцию cellClickHandler();
    this.gameDivElement.addEventListener("click", (event) =>
      this.cellClickHandler(event)
    );
  },

  /**
   * Перезагрузка игры
   */
  initEventNewGame() {
    // рестарт
    this.buttonPlay.addEventListener("click", () => this.resetGame());
  },

  /**
   * Обработка событий клика
   * @param {MouseEvent} event
   */
  cellClickHandler(event) {
    // Если клик не нужно обрабатывать, уходим из функции
    if (!this.isCorrectClick(event)) {
      return;
    }

    // Заполнить ячейку
    this.fillCell(event);

    // Проверка выиграша
    if (this.hasWon()) {
      // Стамим статус в "остановленно"
      this.setStatusStopped();
      // Сообщаем о победе
      this.sayWonPhrase();
      return;
    }

    // Меняем фигуру (игрока) X на О
    this.togglePhase();

    // Вывод тексто о том кто ходит
    this.checkControlPanel();
  },

  /**
   * Проверка был ли корректный клик, в event
   * @param {event} event
   * @returns {boolean} Вернет true в случае если статус игры "играем", клик по верному
   * div и ячейка была пустой
   */
  isCorrectClick(event) {
    return (
      this.isStatusPlaying() &&
      this.isClickByCell(event) &&
      this.isCellEmpty(event)
    );
  },

  /**
   * проверяем что мы "играем", что игра не закончена
   * @returns {Boolean} Вернет true, статус игры играем, иначе false
   */
  isStatusPlaying() {
    return this.status === "play";
  },

  /**
   * Проверка что клики были по ячейке
   * @param {Event} event
   * @returns {boolean} Вернет true, если клик был по ячейке, иначе false
   */
  isClickByCell(event) {
    return event.target.classList[0] === "gameDivCol";
  },

  /**
   * Проверка что в ячейке не ставилс значение (X O)
   * @param {event} event
   * @returns {boolean} Вернет true, если ячейка пуста, иначе false
   */
  isCellEmpty(event) {
    // получаем строку и колонку куда кликнули
    let row = +event.target.dataset.row;
    let col = +event.target.dataset.col;
    console.log(row, "x", col);
    return this.mapValues[row][col] === "";
  },

  /**
   * Заполняет чейку в которую кликнул пользователь в событии event
   * @param {event} event
   */
  fillCell(event) {
    // получаем строку и колонку куда кликнули
    let row = +event.target.dataset.row;
    let col = +event.target.dataset.col;

    // Заполняем ячейку и ставим значения в массив mapValue
    this.mapValues[row][col] = this.phaser;
    // Помещаем значение в ячейку на странице
    event.target.textContent = this.phaser;
  },

  /**
   * Проверка выигрышной ситуации
   * @returns {boolean} Вернет true если роизошел выигрыш
   */
  hasWon() {
    return (
      this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
      this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
      this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
      this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
      this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 })
    );
  },

  /**
   * Проверка есть ли выигрышная ситуация на линии
   * @param {{x:int, y:int}} a
   * @param {{x:int, y:int}} b
   * @param {{x:int, y:int}} c
   * @returns {boolean} Вернет true если линия выигрнаиниче false
   */
  isLineWon(a, b, c) {
    let value =
      this.mapValues[a.y][a.x] +
      this.mapValues[b.y][b.x] +
      this.mapValues[c.y][c.x];
    return value === "XXX" || value === "OOO";
  },

  /**
   * Остановка игры
   */
  setStatusStopped() {
    this.status = "stopped";
  },

  /**
   * Сообщение о победе
   */
  sayWonPhrase() {
    let figure = this.phaser === "X" ? "Крестики" : "Нолики";
    this.textPhaser.parentNode.firstChild.textContent = `${figure} выиграли!`;
    this.textPhaser.textContent = "";
    this.gameDivElement.style.opacity = "0.3";
    this.buttonPlay.style.display = "flex";
  },

  /**
   * Смена игрока X - O
   */
  togglePhase() {
    this.phaser = this.phaser === "X" ? "O" : "X";
  },

  /**
   * Показывает чей следующий шаг
   */
  checkControlPanel() {
    if (this.phaser === "X") {
      this.textPhaser.textContent = "Крестики";
    } else {
      this.textPhaser.textContent = "Нолики";
    }
  },

  /**
   *
   */
  resetGame() {
    (this.status = "play"),
      (this.phaser = "X"),
      (this.mapValues = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]),
      (this.gameDivElement.innerHTML = "");
    debugger;
    this.textPhaser.parentNode.firstChild.textContent = `Ходят:`;
    this.textPhaser.textContent = `Крестики`;
    this.gameDivElement.style.opacity = "1";
    this.buttonPlay.style.display = "none";
    this.init();
  },
};

// запускаем игру при полной загрузки страницы
window.addEventListener("load", ticTakToe.init.bind(ticTakToe));
