import SimpleRouter from "./SimpleRouter";

export function defineRenderMethod<C>(
  renderMethod: SimpleRouter<C>["render"]
): SimpleRouter<C>["render"] {
  return renderMethod;
}
