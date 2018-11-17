import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesFilter from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilters();
  }

  _initCatalog () {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._loadPhonesFromServer();

    this._catalog.subscribe('phoneSelected', (phoneId) => {
      PhoneService.getPhone(phoneId)
        .then((phoneDetails) => {
          this._catalog.hide();
          this._viewer.show(phoneDetails);
        });
    });

    this._catalog.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });
  }

  _loadPhonesFromServer() {
    PhoneService.getPhones()
      .then((phones) => {
        this._catalog.show(phones);
      });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._loadPhonesFromServer();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilters() {
    this._filter = new PhonesFilter({
      element: this._element.querySelector('[data-component="phones-filter"]'),
    });

    this._filter.on('search', (ev) => {
        this._catalog.emit('search', ev.detail);
      }
    );

    this._filter.on('sort', (ev) => {
        this._catalog.emit('sort', ev.detail);
        this._catalog.update();
        this._catalog.emit('search', this._filter.getInputText());
      }
    );
  }

  _render() {
    this._element.innerHTML = `
      <div class="container-fluid">
        <div class="row">
      
          <!--Sidebar-->
          <div class="toolbar fixed-on-top">
            <section>
              <div data-component="phones-filter"></div>
            </section>
      
            <section>
              <div data-component="shopping-cart"></div>
            </section>
          </div>
      
          <!--Main content-->
          <div class="content">
            <div data-component="phone-catalog" class="js-hidden"></div>
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
    `;
  }
}
