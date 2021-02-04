"use strict";

const ticTakToe = {
  gameDivElement: document.getElementById("game"),

  /**
   * инициализация игры
   */
  init() {
    // выводим все ячейки
    this.renderMap();
    this.initEventHandler();
  },

  /**
   * формирование и вывод ячеек игрового поля
   */ 
  renderMap() {
    for (let row = 0; row < 3; row++) {
      const divRow = document.createElement('div');
      divRow.classList.add('gameDivRow');
      this.gameDivElement.appendChild(divRow);
      for (let col = 0; col < 3; col++) {
        const divCol = document.createElement('div');
        divCol.classList.add('gameDivCol');
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
    this.gameDivElement.addEventListener('click', event => this.cellClickHandler(event))
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
  }
};

// запускаем игру при полной загрузки страницы
window.addEventListener("load", ticTakToe.init());
