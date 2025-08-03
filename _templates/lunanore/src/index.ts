import { Lunanore, Scenes } from "lunanore";
import { SceneMain } from "./scenes/scene-main";
import { SceneInit } from "./scenes/scene-init";

window.addEventListener("load", () => {
    const cnv = document.querySelector("canvas") as HTMLCanvasElement;

    Lunanore.init(cnv);

    Scenes.add("init", new SceneInit());
    Scenes.add("main", new SceneMain());
    Scenes.navigate("main");

    Lunanore.run();
});

window.addEventListener("resize", () => {
    Lunanore.resize(innerWidth, innerHeight);
});