import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import AdminsRoute from '@/routes/admins.route';
import validateEnv from '@utils/validateEnv';
import ElementsRoute from '@/routes/elements.route';
import AtomicPropsRoute from '@/routes/atomicProps.route';
import ElementPropsRoute from '@/routes/elementProps.route';
import ImagesRoute from './routes/images.route';
import ElectromagneticPropsRoute from '@routes/electromagneticProps.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AdminsRoute(),
  new AuthRoute(),
  new ElementsRoute(),
  new AtomicPropsRoute(),
  new ElementPropsRoute(),
  new ElectromagneticPropsRoute(),
  new ImagesRoute(),
]);

app.listen();
