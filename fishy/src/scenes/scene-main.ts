import * as THREE from "three";
import { Keyboard, Scene } from "lunanore";
import { GameController } from "../game-controller";
import { Keys } from "lunanore/enums";

export class SceneMain extends Scene {
    public async init() {
        this.scene.background = new THREE.Color("#11143f");
        this.camera.position.z = 100;

        await GameController.reset();
    }

    public async update(dt: number) {
        if (Keyboard.keyPressed(Keys.P)) {
            GameController.paused = !GameController.paused;
        }

        await GameController.update(dt);
    }
}