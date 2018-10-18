import Component from '../../component.js'

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this._phones = phones;

    this._render();


    this._on('click', 'phone-details-link', (event) => {
      this._onPhoneDetailLinkClick(event);
    });

    this._on('click', 'add-button', (event) => {
      this._onAddClick(event);
    });
  }


  _onPhoneDetailLinkClick (event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    this.emit('phoneSelected', phoneElement.dataset.phoneId);
  }

  _onAddClick (event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    this.emit('add', phoneElement.dataset.phoneId);
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
