import { Assets, Model, Scene, Scenes } from "lunanore";
import { GameUI } from "../game-ui";

export class SceneInit extends Scene {
    private _timer = 0;
    private _step = 0;

    public async init() {
        GameUI.showStatus("Loading, please wait.");
    }

    public async update(dt: number) {
        if (this._step < 1) {
            const pct = this._step / 1 * 100;

            GameUI.showStatus(`Loading ${Math.ceil(pct)} %`);
        } else {
            GameUI.hideStatus();
            Scenes.navigate("main");
        }

        if (this._timer < 1) {
            this._timer++;
            return;
        }

        if (this._step == 0) {
            Assets.addModel("fish", Model.box(1, 0.5, 0.5));
        }

        this._step++;
        this._timer = 0;
    }
}