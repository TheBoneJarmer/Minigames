import * as THREE from "three";
import { Actor, Assets, Keyboard, Scenes } from "lunanore";
import { Keys } from "lunanore/enums";
import { MeshStandardMaterial } from "three";
import { ActorFish } from "./actor-fish";

export class ActorPlayer extends Actor {
    public size: number;
    public velocity: THREE.Vector2;

    constructor() {
        const model = Assets.getModel("fish").clone(true);
        model.material = new MeshStandardMaterial({ color: "#00ff00" });

        super("player", model);

        this.size = 3;
        this.velocity = new THREE.Vector2();
    }

    public async update(dt: number) {
        await this.updateInput(dt);
        await this.updateMovement(dt);
        await this.updateSize();
    }

    private async updateSize() {
        const scene = Scenes.scene;
        const fishes = scene.actors.filter(x => x.tag == "fish") as ActorFish[];

        for (let fish of fishes) {
            const dist = fish.position.distanceTo(this.position);
            const distMin = fish.size / 2 + this.size / 2;

            if (dist > distMin) {
                continue;
            }

            if (fish.size < this.size) {
                scene.remove(fish);
                this.size++;
            } else {
                scene.remove(this);
            }
        }

        this.model.scale.set(this.size, this.size, this.size);
    }

    private async updateInput(dt: number) {
        if (Keyboard.keyDown(Keys.Left)) {
            this.velocity.x -= dt;
        }

        if (Keyboard.keyDown(Keys.Right)) {
            this.velocity.x += dt;
        }

        if (Keyboard.keyDown(Keys.Up)) {
            this.velocity.y += dt;
        }

        if (Keyboard.keyDown(Keys.Down)) {
            this.velocity.y -= dt;
        }
    }

    private async updateMovement(dt: number) {
        const minVelocity = new THREE.Vector2(-30 * dt, -30 * dt);
        const maxVelocity = new THREE.Vector2(30 * dt, 30 * dt);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity = this.velocity.clamp(minVelocity, maxVelocity);
    }
}