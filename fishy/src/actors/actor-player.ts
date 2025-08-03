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
            let collide = false;

            const v1 = new THREE.Vector2(this.position.x, 0);
            const v2 = new THREE.Vector2(0, this.position.y);
            const v3 = new THREE.Vector2(fish.position.x, 0);
            const v4 = new THREE.Vector2(0, fish.position.y);

            const check1 = v1.distanceTo(v3) < this.size / 2 + fish.size / 2;
            const check2 = v2.distanceTo(v4) < this.size / 4 + fish.size / 4;

            if (check1 && check2) {
                collide = true;
            }

            if (collide) {
                if (fish.size < this.size) {
                    scene.remove(fish);
                    this.size += 0.1;
                } else {
                    scene.remove(this);
                }
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

        if (this.position.x < -90) {
            this.position.x = -90;
            this.velocity.x = 0;
        }

        if (this.position.x > 90) {
            this.position.x = 90;
            this.velocity.x = 0;
        }

        if (this.position.y < -40) {
            this.position.y = -40;
            this.velocity.y = 0;
        }

        if (this.position.y > 40) {
            this.position.y = 40;
            this.velocity.y = 0;
        }
    }
}