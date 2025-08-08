import { Scene, Scenes } from "lunanore";
import { ActorPlayer } from "./actors/actor-player";
import { ActorFish } from "./actors/actor-fish";
import { GameUI } from "./game-ui";

export class GameController {
    private static _timer: number = 100;

    public static paused: boolean = false;
    public static score: number = 0;

    public static async reset() {
        const scene = Scenes.scene;
        scene.clear();

        const player = new ActorPlayer();
        scene.add(player);

        this._timer = 100;
        this.score = 0;
    }

    public static async update(dt: number) {
        if (this.paused) {
            GameUI.showStatus("[Paused]");
            return;
        } else {
            GameUI.hideStatus();
        }

        const scene = Scenes.scene;

        await this.updateSpawns(scene);
        await this.updateScore();
    }

    private static async updateScore() {
        GameUI.showScore(`Score: ${this.score}`);
    }

    private static async updateSpawns(scene: Scene) {
        if (this._timer < 50) {
            this._timer++;
            return;
        }

        const fish = new ActorFish();
        scene.add(fish);

        this._timer = 0;
    }
}