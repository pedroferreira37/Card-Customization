const cardMainContainer = document.querySelector('.card-main-container');
const colorBackground = document.querySelector('#color');
const maskColorContainer = document.querySelector('.mask');
const flagSelect = document.querySelector('#flag');
const flagImage = document.querySelector('#flag_image');
const inputsThatAreWritteninRealTime = document.querySelectorAll('#name ,#number, #modality, #valid, #color ');

const nameField = document.querySelector('#name-field');
const validyField = document.querySelector('#validaty-field');
const numberField = document.querySelector('#number-field');

cardMainContainer.addEventListener('click', () => {
  cardMainContainer.style.animation = 'gotit 0.8s';
  cardMainContainer.style.animationFillMode = 'forwards';
}, false);

function Observer() {
  this.observers = [];
}

Observer.prototype = {
  subscribe(f) {
    this.observers.push(f);
  },

  notifyAll() {
    this.observers.forEach((observer) => observer.call());
  },

};

const subject = new Observer();

const forChangeValuesInRealTime = {
  element: [nameField, numberField, validyField],
  name(value) {
    this.element[0].innerHTML = value;
  },
  number(value) {
    const newValue = `${value.slice(0, 4)} ${value.slice(4, 8)} ${value.slice(8, 12)} ${value.slice(12, 16)}`;
    this.element[1].innerHTML = newValue;
  },
  valid(value) {
    const newValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;

    this.element[2].innerHTML = newValue;
  },

};

function changeCardValuesInRealTime({ target }) {
  const { value, id } = target;
  forChangeValuesInRealTime[id](value);
}

function changeColorInRealTime({ target }) {
  const color = target.value;
  maskColorContainer.style.backgroundColor = color;
}

subject.subscribe(changeCardValuesInRealTime);
subject.subscribe(changeColorInRealTime);

function changeFlag({ target }) {
  const flag = target.value;
  const srcChanger = {
    element: flagImage,
    mastercard() {
      this.element.src = 'assets/Group.svg ';
      this.element.style.width = '50px';
    },
    visa() {
      this.element.src = 'assets/VISA Logo.svg';
    },
  };

  srcChanger[flag]();
}

flagSelect.addEventListener('input', changeFlag);

inputsThatAreWritteninRealTime.forEach((item) => {
  item.addEventListener('keyup', changeCardValuesInRealTime);
});

colorBackground.addEventListener('input', changeColorInRealTime);
