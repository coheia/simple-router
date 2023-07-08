/**
 * Factory function for creating components.
 * @template C - The type of the component.
 */
export type ComponentFactory<C> = (params?: Record<string, string>) => C;

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
   * The component factory function associated with the route.
   */
  component: ComponentFactory<C>;
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
   * The component to render when a route is not found.
   */
  public NotFound: C;
  /**
   * The render method used by the SPA.
   */
  public render: (matchingRoute: Route<C>) => Promise<void>;

  /**
   * Creates an instance of SimpleRouter.
   * @param {SimpleRouter<C>['render']} renderMethod - The render method used by the SPA.
   * @param {C} notFound - The component to render when a route is not found.
   */
  constructor(renderMethod: SimpleRouter<C>["render"], notFound: C) {
    this.routes = [];
    this.NotFound = notFound;
    this.render = renderMethod;
  }

  /**
   * Adds a new route to the router.
   * @param {string} path - The path of the route.
   * @param {ComponentFactory<C>} component - The component factory function associated with the route.
   */
  public addRoute(path: string, component: ComponentFactory<C>): void {
    this.routes.push({ path, component });
  }

  /**
   * Navigates to the specified path.
   * @param {string} path - The path to navigate to.
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
    const matchingRoute = this.routes.find((route) =>
      this.isRouteMatch(route.path, path)
    );
    if (matchingRoute) {
      const params = this.extractParams(matchingRoute.path, path);
      const component = matchingRoute.component(params);
      void this.render({ path, component: () => component });
    } else {
      void this.render({ path, component: () => this.NotFound });
    }
  }

  /**
   * Checks if a route matches a given path.
   * @private
   * @param {string} routePath - The path of the route.
   * @param {string} currentPath - The current path.
   * @returns {boolean} True if the route matches the current path, false otherwise.
   */
  private isRouteMatch(routePath: string, currentPath: string): boolean {
    const routeSegments = routePath.split("/");
    const currentSegments = currentPath.split("/");

    if (routeSegments.length !== currentSegments.length) {
      return false;
    }

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const currentSegment = currentSegments[i];

      if (
        !this.isParamSegment(routeSegment) &&
        routeSegment !== currentSegment
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if a route segment is a parameter segment (e.g., [slug]).
   * @private
   * @param {string} segment - The route segment.
   * @returns {boolean} True if the segment is a parameter segment, false otherwise.
   */
  private isParamSegment(segment: string): boolean {
    return segment.startsWith("[") && segment.endsWith("]");
  }

  /**
   * Extracts the parameter name from a parameter segment (e.g., [slug]).
   * @private
   * @param {string} segment - The parameter segment.
   * @returns {string} The parameter name.
   */
  private extractParamName(segment: string): string {
    return segment.slice(1, -1);
  }

  /**
   * Extracts the parameter values from the current path.
   * @private
   * @param {string} routePath - The path of the route.
   * @param {string} currentPath - The current path.
   * @returns {Record<string, string>} An object containing the parameter names and values.
   */
  private extractParams(
    routePath: string,
    currentPath: string
  ): Record<string, string> {
    const routeSegments = routePath.split("/");
    const currentSegments = currentPath.split("/");
    const params: Record<string, string> = {};

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSegment = routeSegments[i];
      const currentSegment = currentSegments[i];

      if (this.isParamSegment(routeSegment)) {
        const paramName = this.extractParamName(routeSegment);
        const paramValue = decodeURIComponent(currentSegment);
        params[paramName] = paramValue;
      }
    }

    return params;
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
