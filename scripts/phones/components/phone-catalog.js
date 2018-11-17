import Component from '../../component.js'

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this._on('click', 'phone-details-link', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phoneSelected', phoneElement.dataset.phoneId);
    });

    this._on('click', 'add-button', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('add', phoneElement.dataset.phoneId);
    });

    this.on('search', (event) => {
      this._search(event);
    });

    this.on('sort', (event) => {
      this._sort(event);
    });

    this.items = null;
  }

  show(phones) {
    this._phones = phones;
    this._render();

    super.show();

    this.items = document.querySelectorAll('[data-element="phone"]');
  }

  update() {
    this._render();
  }

  _search(event) {
    if(!this.items) return;

    if(!event.detail) {
      this.items.forEach((el, key) => {
        el.style.display = '';
      });

      return;
    }

    this.items.forEach((el, key) => {
      if(el.textContent.toLocaleLowerCase().includes(event.detail.toLocaleLowerCase())) {
        el.style.display = '';
      }
      else {
        el.style.display = 'none';
      }
    });
  }

  _sort(ev) {
    if(!this._phones) return;

    if(ev.detail === 'name'){
      this._phones = this._phones.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
      return;
    }
    
    if(ev.detail === 'age'){
      this._phones = this._phones.sort((a, b) => (a.age > b.age) ? 1 : -1);
      return;
    }
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
          <li
            class="thumbnail"
            data-element="phone"
            data-phone-id="${ phone.id }"
          >
            <a
              href="#!/phones/${ phone.id }"
              class="thumb"
              data-element="phone-details-link"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="add-button">
                Add
              </a>
            </div>
  
            <a
              href="#!/phones/${ phone.id }"
              data-element="phone-details-link"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
    `;
  }
}
