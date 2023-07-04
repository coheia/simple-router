/**
 * Represents a route in a Single Page Application (SPA).
 * @template C - The type of the component associated with the route.
 */
export interface Route<C> {
  /**
   * The path of the route.
   */
  path: string;
  /**
   * The component associated with the route.
   */
  component: C;
}

/**
 * A simple router for handling routing in a Single Page Application (SPA).
 * @template C - The type of the component associated with the route.
 */
export default class SimpleRouter<C> {
  /**
   * An array of registered routes.
   */
  public routes: Array<Route<C>>;

  /**
   * Renders the specified route.
   * @param {Route<C> | undefined} matchingRoute - The route to render.
   */
  public render: (matchingRoute: Route<C> | undefined) => void;

  /**
   * Creates an instance of SimpleRouter.
   * @param {SimpleRouter<C>['render']} renderMethod - The render method used by SPA.
   */
  constructor(renderMethod: SimpleRouter<C>['render']) {
    this.routes = [];
    this.render = renderMethod;
  }

  /**
   * Adds a new route to the router.
   * @param {string} path - The path of the route.
   * @param {C} component - The component associated with the route.
   */
  public addRoute(path: string, component: C): void {
    this.routes.push({ path, component });
  }

  /**
   * Navigates to the specified path.
   * @param {string} path - The path to navigatet o.
   */
  public to(path: string): void {
    window.history.pushState(null, "", path);
    this.loadRoute(path);
  }

  /**
   * Loads and renders the route associated with the specified path.
   * @private
   * @param {string} path - The path of the route to load.
   */
  private loadRoute(path: string): void {
    const matchingRoute = this.routes.find((route) => route.path === path);
    this.render(matchingRoute);
  }

  /**
   * Starts the router by initializing event listeners and loading the initial route.
   */
  public start(): void {
    window.addEventListener("popstate", () => {
      const path = window.location.pathname;
      this.loadRoute(path);
    });

    const path = window.location.pathname;
    this.loadRoute(path);

    window.router = this;
  }
}
