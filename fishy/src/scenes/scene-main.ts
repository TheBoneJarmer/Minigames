import * as THREE from "three";
import { Scene } from "lunanore";
import { ActorFish } from "../actors/actor-fish";
import { ActorPlayer } from "../actors/actor-player";

export class SceneMain extends Scene {
    private _timer: number = 100;

    public async init() {
        this.scene.background = new THREE.Color("#11143f");
        this.camera.position.z = 100;

        const player = new ActorPlayer();
        this.add(player);
    }

    public async update(dt: number) {
        await this.updateSpawns();
    }

    private async updateSpawns() {
        if (this._timer < 100) {
            this._timer++;
            return;
        }

        const fish = new ActorFish();
        this.add(fish);

        this._timer = 0;
    }
}