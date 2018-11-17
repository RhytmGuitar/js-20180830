import Component from '../../component.js'

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._items = {};

    this._render();

    this._on('click', 'button-remove', (event) => {
      this.removeItem(event.target.dataset.item);
    });
  }

  addItem(item) {
    if (!this._items[item]) {
      this._items[item] = 0;
    }

    this._items[item]++;

    this._render();
  }

  removeItem(item) {
    if (this._items[item]) {
      this._items[item]--;
    }

    if (this._items[item] === 0) {
      delete this._items[item];
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <h3>Shopping Cart</h3>
      <ul class="cart">
        ${ Object.keys(this._items).map(item => `
        
          <li>
            ${ item } (${ this._items[item] })
            <button
              data-element="button-remove"
              data-item="${ item }"
            >
              x
            </button>
          </li>

        `).join('')}
      </ul>
    `;
  }
}
