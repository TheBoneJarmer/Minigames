import * as THREE from "three";
import { Scene } from "lunanore";
import { GameController } from "../game-controller";

export class SceneMain extends Scene {
    public async init() {
        this.scene.background = new THREE.Color("#11143f");
        this.camera.position.z = 100;

        await GameController.reset();
    }

    public async update(dt: number) {
        await GameController.update(dt);
    }
}