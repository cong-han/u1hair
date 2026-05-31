import { addRoute, startRouter } from './router.js';
import { render as homeRender, afterRender as homeAfter } from './pages/home.js';
import { render as aboutRender, afterRender as aboutAfter } from './pages/about.js';
import { render as productsRender, afterRender as productsAfter } from './pages/products.js';

addRoute('/', homeRender, homeAfter);
addRoute('/about', aboutRender, aboutAfter);
addRoute('/products', productsRender, productsAfter);

startRouter();
