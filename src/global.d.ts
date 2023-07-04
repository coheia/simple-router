import type SimpleRouter from "./SimpleRouter";

declare global {
    interface Window {
        router: SimpleRouter
    }
}