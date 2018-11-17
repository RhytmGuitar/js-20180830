import Component from '../../component.js';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._render();
    this.filterInput = document.querySelector('input[data-element="search"]');
    this._initEvents();
  }

  _initEvents() {
    let searchHandler = this._funcHandler(this._search, 200);

    this._on('input', 'search', searchHandler);
    this._on('keyup', 'search', searchHandler);

    this._on('change', 'sort', this._sortHandler.bind(this));
  }

  _funcHandler(func, delay) {
    let timer = null;

    return (ev) => {
      if(timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(func.bind(this), delay, ev);
    }
  }

  _sortHandler(ev) {
    this.emit('sort', ev.target.value);
  }

  _search(ev) {
    this.emit('search', ev.target.value);
  }

  getInputText() {
    return this.filterInput.value;
  }

  _render() {
    this._element.innerHTML = `
      <h3>Tools</h3>
      <div class="search">
        Search:
        <input
          type="text"
          data-element="search"
        >
      </div>

      <div class="sort">
        Sort by:
        <select
          data-element="sort"
        >
          <option value="name">Alphabetical</option>
          <option value="age" selected>Newest</option>
        </select>
      </div>
    `;
  }
}
