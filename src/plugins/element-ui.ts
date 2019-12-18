import Vue from "vue";
import {
  Container,
  Aside,
  MenuItemGroup,
  Main,
  Avatar,
  Button,
  Header,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Pagination,
  Radio,
  RadioGroup,
  Dialog,
  Upload,
  Tooltip,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Tabs,
  TabPane,
  Loading,
  Popover,
  Slider,
  Progress,
  Form,
  FormItem,
  Input,
  Autocomplete,
  Cascader,
  Collapse,
  CollapseItem,
  RadioButton,
  Alert,
  Switch,
  Menu,
  MenuItem,
  Submenu,
  Link,
  Badge,
  Row,
  Col,
  Card,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Steps,
  Step,
  Message,
  MessageBox,
  InfiniteScroll,
  InputNumber
} from "element-ui";

Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(MenuItemGroup);
Vue.use(Avatar);

Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Tooltip);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Loading);
Vue.use(Popover);
Vue.use(Slider);
Vue.use(Progress);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(Cascader);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Alert);
Vue.use(Switch);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Link);
Vue.use(Badge);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(InfiniteScroll);
Vue.use(InputNumber);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;