import Component from "./components/root/Component.js";
import Menu from "./components/Menu.js";
import ProductAdd from "./components/product_add/ProductAdd.js";
import ChargeManage from "./components/charge_manage/ChargeManage.js";
import ProductPurchase from "./components/product_purchase/ProductPurchase.js";

import Api from "./libs/api.js";

export default class App extends Component {
  setup() {
    console.log("App");
    this.$state = {
      currentTabId: "product-add-menu",
    };
    this.callAPI = new Api();
    this.initCallAPI();
  }

  initCallAPI() {
    this.callAPI.setup();
  }

  template() {
    return `
        <div id="header">
            <h1>🥤 자판기 🥤</h1>
            <div id="menu"></div>
        </div>
        <div id="contents"></div>
    `;
  }

  mounted() {
    const {
      $state: { currentTabId },
      changeTab,
    } = this;
    const $menu = document.querySelector("#menu");
    const $contents = document.querySelector("#contents");

    new Menu($menu, { changeTab: changeTab.bind(this) });
    this.selectedTabContent(currentTabId, $contents);
  }

  changeTab(newTabId) {
    this.setState({ currentTabId: newTabId });
  }

  selectedTabContent(currentTabId, container, props = {}) {
    switch (currentTabId) {
      case "product-add-menu":
        return new ProductAdd(container, props);
      case "vending-machine-manage-menu":
        return new ChargeManage(container, props);
      case "product-purchase-menu":
        return new ProductPurchase(container, props);
      default:
        return;
    }
  }
}
